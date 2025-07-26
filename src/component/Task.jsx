import { Fragment, useContext, useEffect, useRef } from "react";
import { Card } from "./CardImg";
import { Nav } from "./NavDash";
import { Navigate, Outlet, replace, useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskapiControler from "../Controller/Task-api-controller";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "./redux/slice/task-slice";
import { authAction } from "./redux/slice/auth-slice";
import { NavLink } from "react-router-dom";

export const Tasks = () => {
  let dispatch = useDispatch();
  let tasks = useSelector((state) => state.taskReducer.filteredTask);

  let categories = useSelector((state) => state.categoriesReducer.categories);
  let api = new TaskapiControler();
  let navigate = useNavigate();
  let OnFilteredHandeller = (event) => {
    if (event.target.value == "All") {
      dispatch(tasksAction.filterTasksByStatus(event.target.value));
    } else {
      console.log("All");
      dispatch(tasksAction.filterTasksByStatus(event.target.value));
    }
  };
  let searchRef = useRef();

  let SearchCheakHandeller = (event) => {
    console.log(event.target.value);
    console.log("Search changed!");
    dispatch(tasksAction.filteredTasksByName(event.target.value));
  };
  useEffect(() => {
    const fetchData = async () => {
      let response = await api.FilteredTask();
      console.log("Tasks fetched:", response);
      if (response?.tasks && Array.isArray(response.tasks)) {
        dispatch(tasksAction.setTask(response.tasks));
      } else if (response.status === 401) {
        dispatch(authAction.setLoggedIn(false));
        dispatch(tasksAction.setTask(response.data)); // أو حسب اسم الأكشن

        navigate("/login", { replace: true });
      } else {
        console.log("⚠️ Unexpected response shape:", response);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log("Tasks from Redux after update:", tasks);
  }, [tasks]);
  return (
    <Fragment>
      <header className="navbar sticky-top navbar-light bg-light flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          The Brands
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
          ref={searchRef}
          onChange={SearchCheakHandeller}
        />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <NavLink to="/login" className="nav-link px-3 btn-light-main btn">
              Sign out
            </NavLink>
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <Nav />
          <Outlet />
          {/* <Tasks /> */}
        </div>
      </div>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">The Controller</h1>

          <div className=" mb-2 mb-md-0">
            <div className="d-flex align-items-center ms-3 ms-lg-4"></div>
            <div className="d-flex align-items-center ms-3 ms-lg-4"></div>
          </div>

          <ul className="list-inline">
            <li className="list-inline-item">
              {" "}
              <select
                className=" dropdown form-control pull-right"
                placeholder="Filter By status"
                autoComplete="off"
                onChange={OnFilteredHandeller}
              >
                <option value="All">All</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
                <option value="Canceled">Canceled</option>
                <option value="Waiting">Waiting</option>
              </select>
            </li>
            <li className="list-inline-item mt-3">
              {" "}
              <select
                className=" dropdown form-control pull-right"
                placeholder="Filter By status"
                autoComplete="off"
              >
                <option value="">Filter By category</option>
                {categories.map((element) => (
                  <option key={element.id} value={element.id}>
                    {element.name}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>

        <div className="row mt-5">
          {/* {Array.isArray(FilteredTask) &&
            FilteredTask.map((element) => (
              <Card key={element.id} task={element} />
            ))} */}
          {console.log("Tasks from Redux:", tasks)}
          {tasks.length === 0 && <p>No tasks to show</p>}
          {tasks.map((element) => (
            <Card key={element.id} task={element} />
          ))}
        </div>
      </main>
    </Fragment>
  );
};
