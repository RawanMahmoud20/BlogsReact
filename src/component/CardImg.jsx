import { NavLink } from "react-router-dom";
import axios from "axios";
import TaskApiController from "../Controller/Task-api-controller";
import { useDispatch } from "react-redux";
import { tasksAction } from "./redux/slice/task-slice";

export const Card = (props) => {
  const api = new TaskApiController();
  const dispatch = useDispatch();

  const handleDeleteBrands = async (brandId) => {
    const confirm = window.confirm("Are you sure to delete");
    if (!confirm) return;
    const result = await api.DeleteBrand(brandId);
    if (result.status) {
      alert("Delete Done");
      dispatch(tasksAction.DeleteTaskById(brandId));
    } else {
      alert("Not Valid to Delete " + result.message);
    }
  };

  const handleEditImage = async (brandId) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = async () => {
      const selectFile = fileInput.files[0];
      if (!selectFile) return;
      const result = await api.EditPhotoBrand(brandId, selectFile);
      if (result.status) {
        console.log(" Edit success, server image:", result.data.data.image);

        const updatePhotoUrl = result.data.data.image.startsWith("http")
          ? `${result.data.data.image}?v=${Date.now()}`
          : `http://localhost:8000/${result.data.data.image}?v=${Date.now()}`;
        dispatch(
          tasksAction.EditPhotoById({
            id: brandId,
            newImage: updatePhotoUrl,
          })
        );
        dispatch(tasksAction.filterTasksByStatus("All")); // مثلا تعيد عرض الكل
      }
    };

    fileInput.click();
  };
  return (
    <div className="col-md-4">
      <div className="card task">
        <img
          src={`${props.task.image}?v=${Date.now()}`} // force cache refresh
          alt={props.task.name}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
          key={`${props.task.id}-${props.task.image}`} // تغيير المفتاح حسب الصورة لتحديث React
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
          <button
            className=" dropdown form-control pull-right"
            style={{ width: "100px" }}
            onClick={() => handleEditImage(props.task.id)}
          >
            Edit Photo
          </button>
          <button
            className=" dropdown form-control pull-right"
            style={{ width: "120px" }}
            onClick={() => handleDeleteBrands(props.task.id)}
          >
            Delete Brand
          </button>
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
