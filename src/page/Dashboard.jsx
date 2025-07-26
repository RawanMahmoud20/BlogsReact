import { Fragment, useContext, useEffect, useRef, useState } from "react";
import "bootstrap/dist/js/bootstrap.js";

import "../resourse/css/dashboard.css";
import { Nav } from "../component/NavDash";
import { Tasks } from "../component/Task";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-Contect";
import AuthApiController from "../Controller/auth-api-controller";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../component/redux/slice/auth-slice";
import axios from "axios";
import CategoriesApiController from "../Controller/Categories-api-controller";
import {
  categoriesAction,
  categoriesReducer,
} from "../component/redux/slice/categories-slice";
import { tasksAction } from "../component/redux/slice/task-slice";

export const Dashboard = () => {
  // const api = new AuthApiController();

  let Navigate = useNavigate();
  let authController = new AuthApiController();
  let dispatch = useDispatch();
  let categories = useSelector((state) => state.categoriesReducer.categories);
  const categoriesApicontrol = new CategoriesApiController();
  let searchRef = useRef();
  let buttonHandeller = async () => {
    let response = await authController.logout();
    if (response.status) {
      dispatch(authAction.setLoggedIn(false));
      // auth.UpdateStatus(false);
      Navigate("/login", { replace: true });
    }
    // Navigate("/login", { replace: true });
  };
  let UserInfo = useSelector((state) => state.authReducer.user);

  let fetchCategories = async () => {
    if (categories.length !== 0) {
      let Categories = await categoriesApicontrol.fetchCategories();
      if (categories.length !== 0) {
        dispatch(categoriesAction.setCategories(Categories));
      }
    }
  };
  let SearchCheakHandeller = (event) => {
    console.log(event.target.value);
    console.log("Search changed!");
        dispatch(tasksAction.filteredTasksByName(event.target.value));
    
    
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:8000/api/v1/users/1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const userData = response.data.data;
      dispatch(authAction.setUserInfo(userData)); // ✅ خزّناها في Redux
    };
    fetchUser();
    fetchCategories();
  }, []);
  return (
    <Fragment>
      <header className="navbar sticky-top navbar-light bg-light flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          <h2>Hello {UserInfo.name}</h2>
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
            <button
              className="nav-link px-3 btn-light-main btn"
              onClick={buttonHandeller}
            >
              Sign out
            </button>
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
    </Fragment>
  );
};
