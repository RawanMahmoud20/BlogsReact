import { useDispatch, useSelector } from "react-redux";
import { blogsActions } from "../../../redux/slices/blogs-slice";
import Delete from "../../../resourse/images/ic_delete.svg";
import Edit from "../../../resourse/images/ic_edit.svg";

let BlogRow = (props) => {
  let dispatch = useDispatch();

  // جلب كل الكاتيجوريز
  let categories = useSelector((state) => state.categories.data);

  // البحث عن اسم الفئة حسب categoryId
  let categoryName =
    categories.find((cat) => cat.id.toString() === props.blog.categoryId)
      ?.name || "Unknown";

  let onDeleteHandler = () => {
    dispatch(blogsActions.delete(props.blog.id));
  };

  return (
    <tr>
      <td className="blog-title">{props.blog.title}</td>
      <td>{props.blog.publisherName}</td>
      <td>{categoryName}</td>
      <td>{props.blog.image}</td>
      <td>{props.blog.description}</td>
      <td>
        <div className="table-options">
          <div className="table-option">
            <img src={Edit} alt="Edit" />
          </div>
          <div className="table-option">
            <img src={Delete} alt="Delete" onClick={onDeleteHandler} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default BlogRow;
