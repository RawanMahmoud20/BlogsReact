import { useDispatch } from "react-redux";
import Delete from "../../../resourse/images/ic_delete.svg";
import Edit from "../../../resourse/images/ic_edit.svg";

import Time from "../../../resourse/images/ic_time.svg";
import { CategoriesActions } from "../../../redux/slices/categories-slice";
import { useNavigate } from "react-router-dom";

let CategoriesItem = (props) => {
  let navigate= useNavigate();
  let dispatch=useDispatch();
  let OnDelteHandeller=()=>{
    dispatch(CategoriesActions.delete(props.data._id));
  }
 let OnEditHandler=()=>{
   navigate(`/cms/categories/${props.data._id}/edit`);
 }
  return (
    <article class="category">
      <div class="category-header">
        <span>{props.data._name}</span>
        <div class="table-option">
          <img src={Delete} alt="" onClick={OnDelteHandeller}/>
        </div>
        <br/>
          <div class="table-option">
          <img src={Edit} alt="" onClick={OnEditHandler}/>
        </div>
      </div>
      <span>Blog No. {props.data._id}</span>
      <div class="category-footer">
        <img src={Time} alt="" />
        <span>23 Blog</span>
      </div>
    </article>
  );
};

export default CategoriesItem;
