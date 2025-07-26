import axios from "axios";
import ApiResponse from "../Modules/ApiResponse";
import { Await } from "react-router-dom";
import Cookies from "js-cookie";

class AuthApiController {
  Api_key = "AIzaSyAFy_smZwukC7xw-f0ofdb_VsHM3DLuoLI";
  constructor(message, status, token = null, user = null) {
    this.message = message;
    this.status = status;
    this.token = token;
    this.user = user;
  }
  performLogin = async (email, password) => {
    axios.defaults.baseURL = "http://localhost:8000";
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (response.data && response.data.token) {
        const token = response.data.token;
        const user = response.data.data;
        // حفظ التوكن في localStorage
        localStorage.setItem("token", token);

        // إذا بدك تحفظي بيانات المستخدم بالكوكيز:
        document.cookie = `user=${JSON.stringify(
          user
        )}; path=/; max-age=604800`;
        return new ApiResponse("Login success!", true, token);
      } else {
        return new ApiResponse("Login failed: No token received", false);
      }
    } catch (error) {
      let errorMessage = "Something went wrong during login";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      return new ApiResponse(errorMessage, false);
    }
  };
  Login = async (email, password) => {
    try {
      axios.defaults.baseURL = "http://localhost:8000";
      axios.defaults.withCredentials = true;
      let response = await axios.post(
        `/api/v1/auth/login`,

        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return new ApiResponse("Logged in successfully", true);
    } catch (error) {
      console.log(error.response);
      return new ApiResponse(error.response.data.message, false);
    }
  };
  getUserById = async (id) => {
    axios.defaults.baseURL = "http://localhost:8000";
    axios.defaults.withCredentials = true;
    try {
      let token = localStorage.getItem("token");

      let response = await axios.get(`/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // مهم جداً
        },
        withCredentials: true, // لو السيرفر بيشتغل على الكوكي
      });
      if (response.data && response.data.data) {
        let response = new ApiResponse("Fetched user successfully!", true);
        response.user = response.data;
        return response;
      }
      return new ApiResponse("User not found", false);
    } catch (error) {
      return new ApiResponse(error.message, false);
    }
  };
  // logout = async () => {
  //   axios.defaults.baseURL = "http://localhost:8000";
  //   axios.defaults.withCredentials = true;
  //   try {
  //     let response = await axios.get("/api/auth/logout");
  //     if (response.status == 204) {
  //       return new ApiResponse("Logged out successfully", true);
  //     }
  //   } catch (error) {
  //     if (error.response.status == 401) {
  //       return new ApiResponse("Logged out successfully", true);
  //     }
  //     return new ApiResponse(error.response.data.message, false);
  //   }
  // };

  preformRegister = async (name, email, password, passwordConfirm) => {
    axios.defaults.baseURL = "http://localhost:8000";
    axios.defaults.withCredentials = true;

    try {
      const response = await axios.post("/api/v1/auth/signup", {
        name,
        email,
        password,
        passwordConfirm,
      });

      console.log("✅ Register response:", response.data);

      if (response.data && response.data.token) {
        const token = response.data.token;
        const user = response.data.data;

        // تخزين التوكن في localStorage
        localStorage.setItem("token", token);

        // حفظ بيانات المستخدم في الكوكيز
        Cookies.set("user", JSON.stringify(user), {
          expires: 7,
          secure: false,
          sameSite: "Lax",
        });

        return new ApiResponse("Registered successfully!", true, token, user);
      } else {
        return new ApiResponse("No token received", false);
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "❌ Register error - message:",
          error.response.data.message
        );
        console.error(
          "❌ Register error - validation errors:",
          error.response.data.errors
        );

        // عرض الأخطاء بشكل واضح في alert
        const validationErrors = error.response.data.errors;
        if (Array.isArray(validationErrors)) {
          const messages = validationErrors
            .map((err) => `• ${err.msg}`)
            .join("\n");
          alert("Validation Errors:\n" + messages);
        } else {
          alert(error.response.data.message || "Something went wrong!");
        }
      } else {
        alert(error.message || "Something went wrong!");
      }

      return new ApiResponse(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong!",
        false
      );
    }
  };

  register = async (name, email, password, passwordConfirm) => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "http://localhost:8000";

    try {
      const response = await axios.post(
        `/api/v1/auth/signup`,
        {
          name: name,
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        return new ApiResponse("Registered successfully", true, token);
      } else {
        return new ApiResponse("No token received", false);
      }
    } catch (error) {
      let errorMessage = "Something went wrong!";
      if (error.response && error.response.data) {
        errorMessage =
          error.response.data.message ||
          error.response.data.error?.message ||
          errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        console.error("Unknown error:", error);
      }

      return new ApiResponse(errorMessage, false);
    }
  };
}

export default AuthApiController;
