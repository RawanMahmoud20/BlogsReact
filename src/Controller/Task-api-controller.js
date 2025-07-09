import Task from "../Modules/Task";
import axios from "axios";

// const { default: axios } = require("axios");

class TaskapiControler {
  token;
  constructor(token) {
    this.token = localStorage.getItem("token");
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
          image: item.image,
          id: item.id,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          status: item.status || "Waiting", // add default status if not available
        };
        tasks.push(task);
      }

      console.log("✅ Processed Tasks:", tasks);
      return tasks;
    } catch (error) {
      console.error("Error fetching brands:", error);
      return [];
    }
  }

  createTask = async (task) => {
    try {
      let response = await axios.post(
        "https://vp-react-app-default-rtdb.firebaseio.com/task.json",
        task,
        {
          headers: { "Content-Type": "application/json" },
          Authorization: this.token,
        }
      );
      console.log("createTask function called with:", task);

      return { status: true, data: response.data };
    } catch (error) {
      console.error("Error in createTask:", error);
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
        let taskItem = new Task(
          item.name,
          item.Category,
          item.Details,
          item.StartDat,
          item.EndDa,
          item.status
        );
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
