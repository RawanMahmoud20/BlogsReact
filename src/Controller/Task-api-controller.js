import { data } from "react-router-dom";
import Task from "../Modules/Task";
import axios from "axios";

// const { default: axios } = require("axios");

class TaskapiControler {
  token;

  constructor(token) {
    this.token = localStorage.getItem("token");
    console.log("🛡️ Loaded token from localStorage:", this.token);
  }
  async FilteredTask() {
    axios.defaults.baseURL = "http://localhost:8000/api";
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get("/v1/brands");
      console.log(response);
      let tasks = [];
      for (let item of response.data.data) {
        let task = {
          name: item.name,
          slug: item.slug,
          image: item.image?.includes("http")
            ? item.image.replace(/\r?\n|\r/g, "")
            : `http://localhost:8000/${item.image.replace(/\r?\n|\r/g, "")}`,

          // image: item.image?.replace(/\r?\n|\r/g, ""), // 🔧 تنظيف الرابط
          id: item.id,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          status: item.status || "Waiting", // add default status if not available
        };
        tasks.push(task);
      }

      console.log("✅ Processed Tasks:", tasks);
      return { status: 200, tasks: tasks };
    } catch (error) {
      console.error("Error fetching brands:", error);
      return { status: error.response.status, tasks: [] };
    }
  }
  getTaskById = async (id) => {
    axios.defaults.baseURL = "http://localhost:8000/api";
    try {
      const response = await axios.get(`/v1/brands/${id}`);
      const item = response.data.data;
      let task = {
        name: item.name,
        slug: item.slug,
        image: item.image,
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        status: item.status || "Waiting",
      };
      return task;
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      return null;
    }
  };
  // createTask = async (task) => {
  //   try {
  //     axios.defaults.baseURL = "http://localhost:8000/api";
  //     axios.defaults.withCredentials = true;

  //     let response = await axios.post("/v1/brands", task, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${this.token}`,
  //       },
  //     });
  //     console.log("✅ Brand Created:", response.data);

  //     return { status: true, data: response.data };
  //   } catch (error) {
  //     console.error(
  //       "❌ Error creating brand:",
  //       error.response?.data || error.message
  //     );
  //     return {
  //       status: false,
  //       message: error.response?.data?.message || "Error occurred",
  //     };
  //   }
  // };
  createTask = async (task) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;

    axios.defaults.baseURL = "http://localhost:8000/api";
    axios.defaults.withCredentials = true;
    console.log("🔐 Sending token:", this.token);
    /////////////////
    let formData = new FormData();
    formData.append("name", task.name);
    formData.append("image", task.image);
    formData.append("slug", task.slug);
    formData.append("status", task.status);
    formData.append("Details", task.Details);
    formData.append("createdAt", task.createdAt);
    formData.append("updatedAt", task.updatedAt);
    formData.append("id", task.id);

    try {
      let response = await axios.post(
        "/v1/brands",
        formData,
        {
          name: task.name,
          slug: task.slug,
          image: task.image,
          status: task.status,
          Details: task.Details,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`, // ← هذا السطر مهم
          },
        }
      );

      console.log("✅ Brand Created:", response.data);

      // نرجّع البيانات اللي رجعت من السيرفر أو ندمجها مع البيانات الأصلية
      return {
        status: true,
        data: {
          name: response.data.data?.name || task.name,
          slug: response.data.data?.slug || task.slug,
          image: response.data.data?.image || task.image,
          id: response.data.data?.id || Date.now(),
          createdAt: response.data.data?.createdAt || new Date().toISOString(),
          updatedAt: response.data.data?.updatedAt || new Date().toISOString(),
          status: response.data.data?.status || task.status,
          Details: task.Details, // غالباً مش راح يرجع من السيرفر
        },
      };
    } catch (error) {
      console.error(
        "❌ Error creating brand:",
        error.response?.data || error.message
      );
      return {
        status: false,
        message: error.response?.data?.message || "Error occurred",
      };
    }
  };

  EditPhotoBrand = async (id, selectFile) => {
  console.log("Preparing to upload:", { id, selectFile, token: this.token });

  axios.defaults.baseURL = "http://localhost:8000/api";
  axios.defaults.withCredentials = true;

  const formData = new FormData();
  formData.append("image", selectFile); 
  try {
    const response = await axios.put(`/v1/brands/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${this.token}`,
      },
    });
    alert("Edit Is Done");
    return { status: true, data: response.data };
  } catch (err) {
    alert("No Edit");
    console.error("Error uploading image:", err);
    return { status: false, message: err.message };
  }
};

  // EditPhotoBrand = async (id, selectFile) => {
  //   axios.defaults.baseURL = "http://localhost:8000/api";
  //   axios.defaults.withCredentials = true;
  //   const formData = new FormData();
  //   formData.append("image", selectFile);

  //   try {
  //     const response = await axios.put(`/v1/brands/${id}`, formData, {
  //       headers: {
  //         // multipart/form-data لأنه في ملف.
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${this.token}`,
  //       },
  //     });
  //     alert("Edit Is Done");
  //     return { status: true, data: response.data };
  //   } catch (err) {
  //     alert("No Edit");
  //     console.error(err);
  //     return { status: false, message: err.message };
  //   }
  // };
  // delete Brand
  DeleteBrand = async (id) => {
    axios.defaults.baseURL = "http://localhost:8000/api";
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.delete(`/v1/brands/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      console.log("the brand is deleted", response.data);
      return { status: true, data: response.data };
    } catch (error) {
      console.error(
        "❌ فشل حذف البراند:",
        error.response?.data || error.message
      );
      return {
        status: false,
        message: error.response?.data?.message || "خطأ أثناء الحذف",
      };
    }
  };
  ReadTask = async () => {
    let response = await axios.post(
      "https://vp-react-app-default-rtdb.firebaseio.com/task.json",
      task,
      {
        headers: { "Content-Type": "application/json" },
        Authorization: this.token,
      }
    );
    let task = [];
    try {
      for (let obj in response.data) {
        console.log(obj);
        let item = response.data[obj];
        console.log(response.data[obj]);
        let taskItem = new Task().fromJSON(item);
        //  let taskItem = new Task(
        //     item.name,
        //     item.Category,
        //     item.Details,
        //     item.StartDat,
        //     item.EndDa,
        //     item.status
        //   );
        taskItem.id = obj;
        task.push(taskItem);
      }
      return true;
    } catch (error) {
      //
    }
  };
}
export default TaskapiControler;
