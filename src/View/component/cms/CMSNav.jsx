import { NavLink } from "react-router-dom";

let NavCms = () => {
  return (
    <nav>
      <span>Admin tools</span>
      <ul className="nav-items">
        <li>
          <NavLink
            to="/cms"
            className={(props) => (props.isActive ? "active" : "in-active")}
            end
          >
            <div className="nav-item-content">
              <img src="Images/ic_overview.svg" alt="" />
              <span>Overview</span>
            </div>
            <span className="nav-item-count">2</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cms/blog"
            className={(props) => (props.isActive ? "active" : "in-active")}
            end
          >
            <div className="nav-item-content">
              <img src="Images/ic_blogs.svg" alt="" />
              <span>All Blogs</span>
            </div>
            <span className="nav-item-count">2</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cms/categories"
            className={(props) => (props.isActive ? "active" : "in-active")}
            end
          >
            <div className="nav-item-content">
              <img src="Images/ic_categories.svg" alt="" />
              <span>Categories</span>
            </div>
            <span className="nav-item-count">2</span>
          </NavLink>
        </li>
        <li className="last-item">
          <NavLink
            to="/"
            className={(props) => (props.isActive ? "active" : "in-active")}
            end
          >
            <div className="nav-item-content">
              <img src="Images/ic_settings.svg" alt="" />
              <span>Settings</span>
            </div>
            <span className="nav-item-count">2</span>
          </NavLink>
        </li>
      </ul>
      <span>Insights</span>
      <ul className="nav-items">
        <li>
          <NavLink
            to="/"
            className={(props) => (props.isActive ? "active" : "in-active")}
            end
          >
            <div className="nav-item-content">
              <img src="Images/ic_notifications.svg" alt="" />
              <span>Notifications</span>
            </div>
            <span className="nav-item-count">2</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default NavCms;
