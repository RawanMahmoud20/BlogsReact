import { NavLink } from "react-router-dom";

export const Card = (props) => {
  return (
    <div className="col-md-4">
      <div className="card task">
        <img
          src={
            props.task.image.startsWith("http")
              ? props.task.image
              : `${props.task.image}`
          }
          className="card-img-top"
          alt={props.task.name}
        />
        <div className="card-body">
          <h5 className="card-title">{props.task.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            <span data-feather="calendar"></span>
            {props.task.createdAt}
            <span className="main-color"> To </span>
            {props.task.updatedAt}
          </h6>
          <p className="card-text">{props.task.slug}</p>
          <hr />
          <span className="btn badge-light-warning status-btn Waiting">
            {props.task.status}
          </span>
          <NavLink
            to={`/dashboard/task/${props.task.id}/details`}
            className="btn btn-bg-gray pull-right"
          >
            <span data-feather="arrow-right"></span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
