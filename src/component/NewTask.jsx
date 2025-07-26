import { Fragment, useContext, useRef, useState } from "react";
import { Nav } from "./NavDash";
import { Navigate, Outlet } from "react-router-dom";
import Task from "../Modules/Task";
import TaskapiControler from "../Controller/Task-api-controller";
import { tasksAction } from "./redux/slice/task-slice";
import { useDispatch, useSelector } from "react-redux";

export const NewTask = () => {
  const taskApi = new TaskapiControler();
  const dispatch = useDispatch();
  let namelRef = useRef();
  let CategoryRef = useRef();
  let DetailsRef = useRef();
  let StartDatRef = useRef();
  let EndDatRef = useRef();
  let ImageRef = useRef();

  const tasks = useSelector((state) => state.taskReducer.task);
  let cheackData = () => {
    console.log("🧪 Values:");
    console.log("Name:", namelRef.current.value);
    console.log("Category:", CategoryRef.current.value);
    console.log("Details:", DetailsRef.current.value);
    console.log("Start Date:", StartDatRef.current.value);
    console.log("End Date:", EndDatRef.current.value);
    console.log("Image File:", ImageRef.current.files[0]);

    if (
      namelRef.current.value !== "" &&
      CategoryRef.current.value !== "" &&
      DetailsRef.current.value !== "" &&
      StartDatRef.current.value !== "" &&
      EndDatRef.current.value !== "" &&
      ImageRef.current.files.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const categories = useSelector((state) => state.categoriesReducer.categories);

  let newTask = () => {
    let task = new Task();
    task.name = namelRef.current.value; // name
    task.slug = CategoryRef.current.value; // slug (category)
    task.image = ImageRef.current.files[0].name; // ✅ اسم الصورة فقط
    task.id = Date.now().toString(); // ✅ حفظ ID
    Date.now().toString(); // id
    task.createdAt = StartDatRef.current.value; // createdAt
    task.updatedAt = EndDatRef.current.value; // updatedAt
    task.status = "Waiting"; // status
    task.Details = DetailsRef.current.value; // Details;
    return task;
  };

  let clear = () => {
    namelRef.current.value = "";
    CategoryRef.current.value = "";
    DetailsRef.current.value = "";
    StartDatRef.current.value = "";
    EndDatRef.current.value = "";
  };
  // let createTask = async () => {
  //   const Task = newTask();
  //   console.log("🚀 Task to be created:", Task);
  //   let response = await taskApi.createTask(Task);
  //   // dispatch(tasksAction.addNewTask({ ...Task }));
  //   dispatch(
  //     tasksAction.addNewTask({
  //       name: Task.name,
  //       slug: Task.slug,
  //       image: Task.image,
  //       id: Task.id,
  //       createdAt: Task.createdAt,
  //       updatedAt: Task.updatedAt,
  //       status: Task.status,
  //       Details: Task.Details,
  //     })
  //   );
  //   if (response.status) {
  //     alert("Task Added Successfully ✅");

  //     // dispatch Redux action if needed here

  //     clear();
  //   } else {
  //     alert(response.message || "Something went wrong ❌");
  //   }
  // };
  let createTask = async () => {
    const Task = newTask();
    console.log("🚀 Task to be created:", Task);

    let response = await taskApi.createTask(Task);
    console.log(ImageRef.current.files[0]);
    if (response.status) {
      // إذا تم إنشاء الـ task بنجاح، خذ البيانات من response وادفعها للـ Redux
      dispatch(tasksAction.addNewTask(response.data)); 

      alert("Task Added Successfully ✅");
      clear();
    } else {
      alert(response.message || "Something went wrong ❌");
    }
  };

  let SaveTaskHandeller = (event) => {
    event.preventDefault();
    console.log("Saving..."); // ✅ اختبار
    console.log("🧪 ImageRef", ImageRef.current.files);

    if (cheackData()) {
      createTask();
    } else {
      alert("يرجى تعبئة جميع الحقول!");
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
                <label className="from-label">Brand Category</label>
                <input
                  type="text"
                  id="loginName"
                  className="form-control"
                  placeholder="Task name"
                  ref={CategoryRef}
                />
                {/* <select
                  className="form-control"
                  ref={CategoryRef}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Filter By Category
                  </option>

                  {categories.map((element) => (
                    <option key={element.id} value={element.slug}>
                      {element.name}
                    </option>
                  ))}
                </select> */}
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-outline mb-4">
                <label className="form-label">Image For Brands</label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  ref={ImageRef}
                />
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
