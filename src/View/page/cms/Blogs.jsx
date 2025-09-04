import { NavLink } from "react-router-dom";
import BlogRow from "../../component/cms/BlogTableRow";
import { useSelector } from "react-redux";

let Blogs = () => {
  let data= useSelector((state) => state.blogs.data);
  return (
    <section className="content">
      <div className="content-header">
        <span>All Blogs</span>
        <div className="content-header-options">
          <div className="content-header-options_filter">
            <img src="Images/btn_Filter.svg" alt="" />
          </div>
          <NavLink className="header-button" to="/cms/blog/Create">
            Create New Blog
          </NavLink>
        </div>
      </div>
      <div className="content-body">
        <div className="content-body_table">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Blog title</th>
                <th>Due date</th>
                <th>Publisher</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {data && data.length > 0 ? (
              data.map((element) => (
                <BlogRow key={element.id} blog={element} />
              ))
            ) : null }
          </tbody>


          </table>
        </div>
      </div>
    </section>
  );
};
export default Blogs;
