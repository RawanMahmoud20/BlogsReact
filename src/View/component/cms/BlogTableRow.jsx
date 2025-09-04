import { useDispatch } from "react-redux";
import { blogsActions } from "../../../redux/slices/blogs-slice";
import Delete from "../../../resourse/images/ic_delete.svg";
import Edit from "../../../resourse/images/ic_edit.svg";
let BlogRow = (props) => {
  let dispatch = useDispatch();
  let OnDeleteHandler=()=>{
    dispatch(blogsActions.delete(props.blog._id) );
  }
  return (
    <tr>
      <td className="blog-category">{props.blog._categoryId}</td>
      <td>{props.blog._title}</td>
      <td className="grey-info">{props.blog._title}</td>
      <td className="grey-info">{props.blog._publisherName}</td>
      <td>
        <div className="table-options">
          <div className="table-option">
            <img src={Edit} alt="" />
          </div>
          <div className="table-option">
            <img src={Delete} alt=""  onClick={OnDeleteHandler}/>
          </div>
        </div>
      </td>
    </tr>
  );
};
export default BlogRow;
