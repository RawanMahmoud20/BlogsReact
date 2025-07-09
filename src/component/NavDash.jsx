import { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-Contect";

export const Nav = () => {
  let auth = useContext(AuthContext);

  return (
    <Fragment>
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink
                to="/dashboard/task"
                className={(props) =>
                  props.isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
              >
                <span data-feather="home"></span>
                Brands
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={(props) =>
                  props.isActive ? "nav-link active" : "nav-link"
                }
                to="/dashboard/newTask"
                end
              >
                <span data-feather="file"></span>
                New Brands
              </NavLink>

              {/* <a className="nav-link" href="#">
                <span data-feather="users"></span>
                {auth.loggenIn ? "loggedIn" : "Error"}
              </a> */}
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};
