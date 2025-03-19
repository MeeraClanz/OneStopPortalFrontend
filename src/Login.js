import { Button } from "primereact/button";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import constants from "./components/constants/constants";

const Login = () => {
  const navigate = useNavigate();

  const googleLoginn = useGoogleLogin({
    scope: "openid profile email",
    onSuccess: async (response) => {
      try {
        const { access_token } = response;
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );

        const { email, name } = userInfo.data;

        console.log("email", email);
        console.log("access_token", access_token);
        console.log("name", name);
        console.log("Stored Token:", localStorage.getItem("googleToken"));

        // Store credentials locally
        localStorage.setItem("userEmail", email);
        localStorage.setItem("googleToken", access_token);
        localStorage.setItem("userName", name);

        // Send token to backend for verification

        axios
          .post(constants.URL.googleLogin, { googleToken: access_token })
          .then((res) => console.log("Backend Response:", res.data))
          .catch((err) => console.error("Backend Error:", err));
        console.log("Google Login Success:", response);
        navigate("/TopBar"); // Redirect to main page after login
      } catch (error) {
        console.error("Login Error:", error);
      }
    },
    onError: (error) => console.error("Google Login Error", error),
  });

  // useEffect(() => {
  //   // Auto-login if credentials exist
  //   const storedToken = localStorage.getItem("googleToken");
  //   if (storedToken) {
  //     navigate("/TopBar");
  //   }
  // }, [navigate]);

  return (
    <div className="container">
      <div className="box">
        <h1 className="title-head">One Stop Portal</h1>
        <div className="commonText">
          <form className="error_msg">
            <div className="login-button">
              <Button
                type="button"
                label="Sign In"
                className="loginButton"
                onClick={() => {
                  console.log("Google Login Clicked");
                  googleLoginn();
                }}
              />
            </div>
            <div className="end-line">
              <span className="endline-1">Already have an account?</span>
              <span className="endline-2">Login</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
