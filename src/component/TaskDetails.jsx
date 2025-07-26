import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "./NavDash";
import { TaskContext } from "../context/TaskContext";
import { tasksAction } from "./redux/slice/task-slice.js"; // تأكدي من المسار الصحيح

import { useDispatch, useSelector } from "react-redux";
import TaskapiControler from "../Controller/Task-api-controller";
export const TaskDetails = () => {
  let dispatch = useDispatch();
  let api = new TaskapiControler();

  const tasks = useSelector((state) => state.taskReducer.task);
  let params = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchIfNeeded = async () => {
      if (tasks.length === 0) {
        const fetchedTasks = await api.FilteredTask();
        dispatch(tasksAction.setTask(fetchedTasks));
      }
    };
    fetchIfNeeded();
  }, []);

  useEffect(() => {
    const selectedTask = tasks.find((element) => element.id === params.id);
    setTask(selectedTask || null);
  }, [params.id, tasks]);

  let changeTaskStatus = (newStatus) => {
    let updateTask = task;
    updateTask.status = newStatus;
    setTask({ ...updateTask });
  };

  useEffect(() => {
    const fetchData = async () => {
      //  نجيبه من redux أولاً
      const found = tasks.find(
        (element) => element.id.toString() === params.id
      );
      if (found) {
        setTask(found);
      } else {
        // إذا مش موجود،  من API مباشرة
        const fetchedTask = await api.getTaskById(params.id);
        setTask(fetchedTask);
        dispatch(tasksAction.addNewTask(fetchedTask));
      }
    };
    fetchData();
  }, [params.id, tasks]);
  //  عرض loading إذا المهمة مش موجودة بعد
  if (!task) {
    return (
      <Fragment>
        <Nav />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <h3 className="mt-5">Loading task details...</h3>
        </main>
      </Fragment>
    );
  }

  //  إذا المهمة موجودة، نعرض التفاصيل

  return (
    <Fragment>
      <Nav />
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2"> Brand {params.id}</h1>

          <div className=" mb-2 mb-md-0">
            <div className="d-flex align-items-center ms-3 ms-lg-4"></div>
            <div className="d-flex align-items-center ms-3 ms-lg-4"></div>
          </div>

          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button
                type="button"
                className={` btn btn-sm btn-outline-secondary ${
                  task.status?.trim() === " In Progress" && "active"
                } `}
                onClick={() => changeTaskStatus("In Progress")}
              >
                In Progress
              </button>
              <button
                type="button"
                className={` btn btn-sm btn-outline-secondary ${
                  task.status?.trim() === " Complete" && "active"
                } `}
                onClick={() => changeTaskStatus("Complete")}
              >
                Complete
              </button>
              <button
                type="button"
                className={` btn btn-sm btn-outline-secondary ${
                  task.status?.trim() === " Waiting" && "active"
                } `}
                onClick={() => changeTaskStatus("Waiting")}
              >
                Waiting
              </button>
              <button
                type="button"
                className={` btn btn-sm btn-outline-secondary ${
                  task.status?.trim() === " Canceled" && "active"
                } `}
                onClick={() => changeTaskStatus("Canceled")}
              >
                Canceled
              </button>
            </div>
            <button type="button" className="btn btn-light-main btn">
              <span data-feather="edit-3"></span> Edit
            </button>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6">
            {task.image && (
              <img
                src={task.image}
                className="img-fluid rounded de-img"
                alt="task"
              />
            )}{" "}
          </div>
          <div className="col-md-6  mt-5">
            <div className=" mb-3">
              <span data-feather="bookmark" className="main-color"></span>{" "}
              <strong>Title:</strong> {task.name}
            </div>
            <div className="mb-3">
              <span data-feather="layers" className="main-color"></span>{" "}
              <strong>Category:</strong> {task.slug}
            </div>
            <div className="">
              <span data-feather="calendar" className="main-color"></span>{" "}
              <strong>Date:</strong>
              {task.createdAt} to{task.updatedAt}
            </div>
          </div>

          <div className="row mt-5">
            <div className="task-info">
              <p>{task.Details}</p>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};
