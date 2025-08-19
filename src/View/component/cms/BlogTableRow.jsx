import Delete from "../../../resourse/images/ic_delete.svg";
import Edit from "../../../resourse/images/ic_edit.svg";
let BlogRow = () => {
  return (
    <tr>
      <td className="blog-category">A</td>
      <td>A</td>
      <td className="grey-info">A</td>
      <td className="grey-info">A</td>
      <td>
        <div className="table-options">
          <div className="table-option">
            <img src={Edit} alt="" />
          </div>
          <div className="table-option">
            <img src={Delete} alt="" />
          </div>
        </div>
      </td>
    </tr>
  );
};
export default BlogRow;
