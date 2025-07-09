import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-Contect";
import SocialMediaBar from "./SocialMediaBar";
import AuthApiController from "../Controller/auth-api-controller";
import { useDispatch } from "react-redux";
import { authAction } from "./redux/slice/auth-slice";

export const LoginTap = () => {
  // let auth = useContext(AuthContext);
  let Navigate = useNavigate();
  let dispatch = useDispatch();

  let authController = new AuthApiController();
  let emailRef = useRef();
  let PasswordRef = useRef();

  let cheackData = () => {
    if (emailRef.current.value !== "" && PasswordRef.current.value !== "") {
      return true;
    } else {
      return false;
    }
  };

  let Login = async () => {
    let result = await authController.performLogin(
      emailRef.current.value,
      PasswordRef.current.value
    );
    if (result.status) {
      console.log("Login successful", result.data);
      Navigate("/dashboard/task");

      dispatch(authAction.setLoggedIn(true));

      // auth.UpdateStatus(true);
    } else {
      // console.log("Login failed", result.data);
    }
  };
  let loginHandeller = async (event) => {
    event.preventDefault();
    if (cheackData()) {
      Login();
    }
  };

  return (
    <div
      className="tab-pane  fade show active"
      id="pills-login"
      role="tabpanel"
      aria-labelledby="tab-login"
    >
      <form onSubmit={loginHandeller}>
        <div className="text-center mb-3">
          <h4 className="mb-4 mt-5">Login To Brands System With</h4>
          <SocialMediaBar />
        </div>

        <h4 className="mb-5 mt-2 text-center">or</h4>

        <div className="form-outline mb-4">
          <input
            type="email"
            id="loginName"
            className="form-control"
            placeholder="Email or username"
            ref={emailRef}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="loginPassword"
            className="form-control"
            placeholder="Password"
            ref={PasswordRef}
          />
        </div>

        <div className="row mb-4">
          <div className="col-md-6 d-flex justify-content-center">
            <div className="form-check mb-3 mb-md-0">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="loginCheck"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="loginCheck">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button
          // onClick={submitHandeller}
          type="submit"
          className="btn btn-main btn-block mb-4"
        >
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member? <a href="#!">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};
