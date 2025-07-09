import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "./NavDash";
import { TaskContext } from "../context/TaskContext";
// import { First } from "../resourse/img/1.png";
export const TaskDetails = () => {
  let taskContext = useContext(TaskContext);
  let params = useParams();
  const [task, setTask] = useState([]);

  useEffect(() => {
    // لما يفتح الصفحة، جلب المهمة المناسبة حسب id
    setTask(
      taskContext.task.find((element) => element.id.toString() === params.id)
    );
  }, [params.id, taskContext.task]);

  let changeTaskStatus = (newStatus) => {
    let updateTask = task;
    updateTask.status = newStatus;
    setTask({ ...updateTask });
  };

  return (
    <Fragment>
      <Nav />
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2"> task {params.id}</h1>

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
            <img src="img/1.png" className="img-fluid rounded de-img" alt="" />
          </div>
          <div className="col-md-6  mt-5">
            <div className=" mb-3">
              <span data-feather="bookmark" className="main-color"></span>{" "}
              <strong>Title:</strong> {task.name}
            </div>
            <div className="mb-3">
              <span data-feather="layers" className="main-color"></span>{" "}
              <strong>Category:</strong> {task.Category}
            </div>
            <div className="">
              <span data-feather="calendar" className="main-color"></span>{" "}
              <strong>Date:</strong>
              {task.StartDat} to{task.EndDa}
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
