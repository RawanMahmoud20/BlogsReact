import React, { useState, createContext } from "react";
import TaskapiControler from "../Controller/Task-api-controller";

export const TaskContext = React.createContext({
  task: [],
  setTask: (task) => {},
  apiControler: null,
});

const TaskContextProvider = (props) => {
  let [task, setTask] = useState([]);
  const updateTaskStatus = (id, newStatus) => {
    setTask((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };
  return (
    <TaskContext.Provider
      value={{
        task: task,
        setTask: setTask,
        apiControler: new TaskapiControler(),
        updateTaskStatus: updateTaskStatus,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
export default TaskContextProvider;
