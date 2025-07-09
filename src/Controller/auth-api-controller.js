import axios from "axios";
import ApiResponse from "../Modules/ApiResponse";
import { Await } from "react-router-dom";
import Cookies from "js-cookie";

class AuthApiController {
  Api_key = "AIzaSyAFy_smZwukC7xw-f0ofdb_VsHM3DLuoLI";
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

      let response =  await axios.get(`/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // مهم جداً
        },
        withCredentials: true, // لو السيرفر بيشتغل على الكوكي
      });
      if (response.data && response.data.data) {
        let response=new ApiResponse(
          "Fetched user successfully!",
          true,
        );
        response.user=response.data;
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

  preformRegister = async (name, email, password) => {
    axios.defaults.baseURL = "http://localhost:8000"; // without /api
    axios.defaults.withCredentials = true; // allow to use cookies
    try {
      // إرسال طلب تسجيل إلى API
      const response = await axios.post("/api/v1/auth/signup", {
        name,
        email,
        password,
        passwordConfirm: password,
      });

      // التحقق من نجاح العملية ووجود التوكن
      if (response.data && response.data.token) {
        const token = response.data.token;
        const user = response.data.data; // user data

        // تخزين التوكن مثلاً في localStorage أو state
        localStorage.setItem("token", token);
        // حفظ بيانات المستخدم في الكوكيز
        Cookies.set("user", JSON.stringify(user), {
          expires: 7, // الأيام التي يبقى فيها الكوكيز
          secure: false, // true لو كنت على https
          sameSite: "Lax",
        });

        // //✅ للوصول لبيانات المستخدم في أي مكان: {
        // const user = Cookies.get("user");
        // const userObj = user ? JSON.parse(user) : null;

        // console.log(userObj?.username); // Rawan مثلاً }

        return new ApiResponse("Registered successfully!", true, token);
      } else {
        return new ApiResponse("No token received", false);
      }
    } catch (error) {
      console.error("Register error:", error); // مهم: يساعدنا نعرف الخطأ الحقيقي

      let errorMessage = "Something went wrong!";
      if (error.response && error.response.data) {
        errorMessage =
          error.response.data.message ||
          error.response.data.error?.message ||
          errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return new ApiResponse(errorMessage, false);
    }
  };

  register = async (name, email, password, passwordConfirm) => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "http://localhost:8000/api/v1/auth/signup";

    try {
      let response = await axios.post(
        `/api/auth/register`,
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
      let apiResponse = new ApiResponse("Registered successfully", true);
      return apiResponse;
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
