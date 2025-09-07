import { useRef } from "react";
import Blog from "../../../models/Blog";
import { CategoriesActions } from "../../../redux/slices/categories-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

let EditCategory = () => {

  let titleRef=useRef();
  let briefInfoRef=useRef();
  let dispatch=useDispatch();
   let navigate = useNavigate(); 
let onSubmitHandler=(event)=>{
  event.preventDefault();
  if(cheackData()){
    Save();
  
  }
  
};
let cheackData=()=>{
  if(titleRef.current.value !="" && 
    briefInfoRef.current.value !="" 
  ){
    return true;
  }
  alert("All fields are required");
  return false;
};
let getObject=()=>{
return new Blog(
  Date.now().toString(),
  titleRef.current.value,
  briefInfoRef.current.value,
);
};

let Save=()=>{
  let newCategory = getObject();
  dispatch(CategoriesActions.create(newCategory));
    clear(); 
}
let clear=()=>{
  titleRef.current.value = "";
  briefInfoRef.current.value = "";

};

 let cancelHandler = () => {
    navigate("/cms/categories"); // <-- زر كانسل يذهب للكاتيجوريز
  };
  return (
    <section className="content">
      <div className="content-header">
        <span>Edit Category</span>
      </div>
      <div className="content-body">
        <section className="create-item">
          <form className="create-item_form" onSubmit={onSubmitHandler}>
            <div className="create-item_form_content">
              <section className="create-item_left">
                <div className="form-group">
                  <label htmlFor="blog-title">Categories Title</label>
                  <input
                    className="form-input"
                    type="text"
                    name="blog-title"
                    id="blog-title"
                    placeholder="Blog title"
                    ref={titleRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="blog-info">Brief info </label>
                  <input
                    type="text"
                    className="form-input"
                    name="brief-info"
                    id="brief-info"
                    placeholder="Brief Info "
                    ref={briefInfoRef}
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="categories">Category</label>
                  <select
                    name="categories"
                    id="categories"
                    className="form-select"
                    ref={categoryRef}
                  >
                    <option value="c-1">Category 1</option>
                    <option value="c-2">Category 2</option>
                    <option value="c-3">Category 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="blog-title">Image</label>
                  <input
                    type="file"
                    className="form-input file-input"
                    name="publisher-name"
                    id="publisher-name"
                    placeholder="Publisher Name"
                  />
                </div> */}
              </section>
              {/* <section className="create-item_right">
                <div className="form-group">
                  <label htmlFor="blog-description">Description</label>
                  <textarea
                    className="form-textarea"
                    id="blog-description"
                    rows="11"
                    placeholder="Write description"
                  ></textarea>
                </div>
              </section> */}
            </div>
            <div className="create-item_form_actions">
              <button className="form-action" type="button" onClick={cancelHandler}>
                Cancel
              </button>
              <button className="form-action done-action" type="submit">
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
export default EditCategory;
