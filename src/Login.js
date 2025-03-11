import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useStoreActions } from "easy-peasy";
import axios from "axios";
import constants from "./components/constants/constants";
import icon from "./images/email.png";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useStoreActions((actions) => actions.loginModel.setUser);

  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    setUser([]);
  }, [setUser]);

  const handleLogin = (payload) => {
    setIsLoading(true);
    axios
      .post(constants.URL.GOOGLESIGNIN, payload)
      .then((resp) => {
        setUser(resp.data.results);
        navigate("/TopBar");
      })
      .catch((e) => {
        toast.current?.show({
          severity: "error",
          summary: "Failure",
          detail: e?.response?.data?.message || "Login failed",
        });
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleLogin = (tokenResponse) => {
    console.log(tokenResponse, "tokenResponse"); // Debugging: Check the actual response
    const payload = {
      email_address: tokenResponse.email_address,
      googleToken: tokenResponse.access_token,
    };
    handleLogin(payload);
    console.log(payload, "payload");
  };
  const googlelogin = useGoogleLogin({
    scope: "openid profile email",
    onSuccess: handleGoogleLogin,
    onError: (error) => console.error(error),
    // ux_mode: "redirect", // Ensure it's set to redirect mode if necessary
    // redirect_uri: "http://localhost:3000/", // Update this based on your Google Cloud Console settings
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!data.userEmail) {
      return;
    }
    navigate("/TopBar");
  };

  return (
    <div className="container">
      <div className="box">
        <h1 className="title-head">One Stop Portal</h1>
        <div className="commonText">
          <form onSubmit={handleSubmit(onSubmit)} className="error_msg">
            <div className="textBox">
              <img
                className="mail-icon mr-2"
                height="24"
                width="24"
                src={icon}
                alt="email"
                style={{ position: "relative", left: "40px" }}
              />
              <InputText
                id="userEmail"
                type="text"
                placeholder="Email Address"
                className="underline-input"
                {...register("userEmail", { required: "Email is required" })}
              />
            </div>
            {errors?.userEmail && (
              <p className="p-error ml-5">{errors.userEmail.message}</p>
            )}

            <div className="login-button">
              <Button
                type="submit"
                label="Sign In"
                className="loginButton"
                disabled={isLoading}
              />
            </div>
            <div className="google-login-button">
              <Button
                label="Sign in with Google"
                onClick={() => googlelogin()}
                className="p-button-outlined"
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
