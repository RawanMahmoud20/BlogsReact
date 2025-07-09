import { useContext, useRef } from "react";
import SocialMediaBar from "./SocialMediaBar";
import { useNavigate } from "react-router-dom";
import AuthApiController from "../Controller/auth-api-controller";
import { AuthContext } from "../context/auth-Contect";

export const RegisterTap = () => {
  let auth = useContext(AuthContext);

  let Navigate = useNavigate();
  let authController = new AuthApiController();
  let nameRef = useRef();
  let emailRef = useRef();
  let PasswordRef = useRef();
  let passwordConfirmRef = useRef();

  let RegisterHandeller = async (event) => {
    event.preventDefault();
    if (checkData()) {
      await register();
    }
  };

  let checkData = () => {
    if (
      emailRef.current.value !== "" &&
      PasswordRef.current.value !== "" &&
      passwordConfirmRef.current.value !== ""
    ) {
      if (PasswordRef.current.value === passwordConfirmRef.current.value) {
        return true;
      } else {
        alert("Paswword confermation error ");
        return false; // عشان أمنع تكرار الخطا ويعمل لوب
      }
    }
    alert("Enter Registertion data ");
    return false;
  };
  let register = async () => {
    let result = await authController.preformRegister(
      nameRef.current.value,
      emailRef.current.value,
      PasswordRef.current.value,
      passwordConfirmRef
    );
    console.log(result);
    alert(result.message);
    if (result.status) {
      auth.UpdateStatus(true);
      clear();
      Navigate("/login");
    } else {
    }
  };
  let clear = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    PasswordRef.current.value = "";
    passwordConfirmRef.current.value = "";
  };
  return (
    <div
      className="tab-pane fade"
      id="pills-register"
      role="tabpanel"
      aria-labelledby="tab-register"
    >
      <form onSubmit={RegisterHandeller}>
        <div className="text-center mb-3">
          <h4 className="mb-4 mt-5">Register in Brands System with</h4>

          <SocialMediaBar />
        </div>

        <h4 className="mb-4 mt-5 text-center">or:</h4>

        <div className="form-outline mb-4">
          <input
            type="text"
            id="registerName"
            className="form-control"
            placeholder="Name"
            ref={nameRef}
          />
        </div>

        {/* <div className="form-outline mb-4">
          <input
            type="text"
            id="registerUserName"
            className="form-control"
            placeholder="UserName"
            ref={userNameRef}
          />
        </div> */}
        <div className="form-outline mb-4">
          <input
            type="email"
            id="registerEmail"
            className="form-control"
            placeholder="Email"
            ref={emailRef}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="registerPassword"
            className="form-control"
            placeholder="password"
            ref={PasswordRef}
          />
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="registerRepeatPassword"
            className="form-control"
            placeholder="password Confirm "
            ref={passwordConfirmRef}
          />
        </div>

        <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="registerCheck"
            defaultChecked
            aria-describedby="registerCheckHelpText"
          />
          <label className="form-check-label" htmlFor="registerCheck">
            I have read and agree to the terms
          </label>
        </div>

        <button type="submit" className="btn btn-main btn-block mb-3">
          Sign up
        </button>
      </form>
    </div>
  );
};
