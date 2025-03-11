import axios from "axios";
import constants from "./constants";

const axiosInstance = axios.create({
  baseURL: constants.URL.BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");

    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Add the current request to the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["x-access-token"] = token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refresh_token = localStorage.getItem("refreshToken"); // Or retrieve from cookies
        if (refresh_token) {
          const { data } = await axios.post(
            `http://43.205.242.128:2001/api/auth/getNewAccessToken`,
            {
              refresh_token,
            }
          );
          console.log(data);

          const newAccessToken = data?.results?.access_token;

          // Update tokens in localStorage
          localStorage.setItem("access-token", newAccessToken);

          // Resolve the queued requests with the new token
          processQueue(null, newAccessToken);

          // Update the original request with the new token
          originalRequest.headers["x-access-token"] = newAccessToken;

          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        processQueue(refreshError, null);

        if (!localStorage.getItem("isSessionExpired")) {
          localStorage.setItem("isSessionExpired", "true");
          window.dispatchEvent(new Event("storage")); // Notify all tabs about session expiration
          return Promise.reject(refreshError);
        }
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
