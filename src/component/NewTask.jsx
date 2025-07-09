import { Fragment, useContext, useRef, useState } from "react";
import { Nav } from "./NavDash";
import { Navigate, Outlet } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import Task from "../Modules/Task";

export const NewTask = () => {
  let taskContext = useContext(TaskContext);

  let namelRef = useRef();
  let CategoryRef = useRef();
  let DetailsRef = useRef();
  let StartDatRef = useRef();
  let EndDatRef = useRef();
  let cheackData = () => {
    if (
      namelRef.current.value !== "" &&
      CategoryRef.current.value !== "" &&
      DetailsRef.current.value !== "" &&
      StartDatRef.current.value !== "" &&
      EndDatRef.current.value !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  let newTask = () => {
    return new Task(
      namelRef.current.value,
      CategoryRef.current.value,
      DetailsRef.current.value,
      StartDatRef.current.value,
      EndDatRef.current.value,
      "Waiting"
    );
  };

  let clear = () => {
    namelRef.current.value = "";
    CategoryRef.current.value = "";
    DetailsRef.current.value = "";
    StartDatRef.current.value = "";
    EndDatRef.current.value = "";
  };
  let createTask = async () => {
    const Task = newTask();
    console.log(Task);
    let response = await taskContext.apiControler.createTask(Task);
    if (response) {
      alert("Task Added Successfully ✅");
    }
    if (response.status) {
      taskContext.setTask((prevTask) => {
        return [Task, ...prevTask];
      });
    } else {
      alert(response.message);
    }
    clear();
  };
  let SaveTaskHandeller = (event) => {
    event.preventDefault();
    if (cheackData()) {
      createTask();
    }
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <Nav />
          <Outlet />
          {/* <Tasks /> */}
        </div>
      </div>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 mt-3">Add New Brand </h1>
        </div>
        <form onSubmit={SaveTaskHandeller}>
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="form-outline mb-4">
                <label className="form-label">Brand name</label>
                <input
                  type="text"
                  id="loginName"
                  className="form-control"
                  placeholder="Task name"
                  ref={namelRef}
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-outline mb-4">
                <label className="form-label">Brand Category</label>
                <input
                  id="input-tags"
                  value="category 1,category 2, category 3 , name of category"
                  autoComplete="off"
                  placeholder="Add Category?"
                  ref={CategoryRef}
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-outline mb-4">
                <label className="form-label">Image For Brands</label>
                <input className="form-control" type="file" id="formFile" />
              </div>
            </div>

            <div className="col-md-12">
              <label className="form-label">Task Details</label>
              <div className="form-outline mb-4">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  ref={DetailsRef}
                ></textarea>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-outline mb-4">
                <label className="form-label">Start date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  placeholder="Task name"
                  ref={StartDatRef}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">End date</label>
              <div className="form-outline mb-4">
                <input
                  type="datetime-local"
                  className="form-control"
                  placeholder="Task name"
                  ref={EndDatRef}
                />
              </div>
            </div>

            <div>
              <button type="submit" className="pull-right btn btn-main mb-4">
                Add New Brands
              </button>
            </div>
          </div>
        </form>
      </main>
    </Fragment>
  );
};
