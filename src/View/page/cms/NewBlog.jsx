import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogsActions } from "../../../redux/slices/blogs-slice";
import Blog from "../../../models/Blog";

let NewBlog = () => {
  let categories = useSelector((state) => state.categories.data);
  let dispatch = useDispatch();
  let titleRef = useRef();
  let PublisherNameRef = useRef();
  let CategoryRef = useRef();
  let ImageRef = useRef();
  let DescriptionRef = useRef();
let cheackData=()=>{
  if(titleRef.current.value !="" && 
    PublisherNameRef.current.value !="" && 
    CategoryRef.current.value !="" && 
    ImageRef.current.value !="" && 
    DescriptionRef.current.value !=""
  ){
    return true;
  }
  alert("All fields are required");
  return false;
};
let getBlog=()=>{
return new Blog(
  Date.now().toString(),
  titleRef.current.value,
  PublisherNameRef.current.value,
  CategoryRef.current.value,
  ImageRef.current.value,
  DescriptionRef.current.value
);
};

let clear=()=>{
  titleRef.current.value = "";
  PublisherNameRef.current.value = "";
  CategoryRef.current.value = "";
  ImageRef.current.value = "";
  DescriptionRef.current.value = "";

};
  let onSubmitHandler = (event) => {
  event.preventDefault();
  if(cheackData()){
let blog = getBlog();
  dispatch(blogsActions.create(blog));
       clear(); 
  }



}

  return (
    <section className="content">
      <div className="content-header">
        <span>New Blog</span>
      </div>
      <div className="content-body">
        <section className="create-item">
          <form className="create-item_form" onSubmit={onSubmitHandler}>
            <div className="create-item_form_content">
              <section className="create-item_left">
                <div className="form-group" >
                  <label htmlFor="blog-title">Blog Title</label>
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
                  <label htmlFor="blog-title">Publisher Name</label>
                  <input
                    type="text"
                    className="form-input"
                    name="publisher-name"
                    id="publisher-name"
                    placeholder="Publisher Name"
                    ref={PublisherNameRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="categories">Category</label>
                  <select
                    name="categories"
                    id="categories"
                    className="form-select"
                    ref={CategoryRef}
                  >
                    {categories.map((element) => (
                      <option key={element._id} value={element._id}>
                        {element._title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="blog-title">Image</label>
                  <input
                    type="file"
                    className="form-input file-input"
                    name="Image"
                    id="Image"
                    placeholder="Image"
                    ref={ImageRef}
                  />
                </div>
              </section>
              <section className="create-item_right">
                <div className="form-group">
                  <label htmlFor="blog-description">Description</label>
                  <textarea
                    className="form-textarea"
                    id="blog-description"
                    rows="11"
                    placeholder="Write description"
                    ref={DescriptionRef}
                  ></textarea>
                </div>
              </section>
            </div>
            <div className="create-item_form_actions">
              <button className="form-action" type="reset">
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
export default NewBlog;
