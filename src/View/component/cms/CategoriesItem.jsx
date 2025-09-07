import { useDispatch } from "react-redux";
import Delete from "../../../resourse/images/ic_delete.svg";
import Edit from "../../../resourse/images/ic_edit.svg";

import Time from "../../../resourse/images/ic_time.svg";
import { CategoriesActions } from "../../../redux/slices/categories-slice";
import { useNavigate } from "react-router-dom";
import categoriesApiController from "../../../controller/categories-api-controller";

let CategoriesItem = (props) => {
  let navigate= useNavigate();
  let dispatch=useDispatch();

  let OnDelteHandeller= async ()=>{
  let response= await new categoriesApiController().delete(props.data.id);
    console.log("Delete response:", response); // نتابع النتيجة

  if(response.success){
    dispatch(CategoriesActions.delete(props.data.id));
  }else {
    alert("Failed to delete category. Try again!");
  }
 };


 let OnEditHandler=()=>{
   navigate(`/cms/categories/${props.data.id}/edit`);
 }
  return (
    <article className="category">
      <div className="category-header">
        <span>{props.data.name}</span>
        <div className="table-option">
          <img src={Delete} alt="" onClick={OnDelteHandeller}/>
        </div>
        <br/>
          <div className="table-option">
          <img src={Edit} alt="" onClick={OnEditHandler}/>
        </div>
      </div>
      <span>Blog No. {props.data.id}</span>
      <div className="category-footer">
        <img src={Time} alt="" />
        <span>23 Blog</span>
      </div>
    </article>
  );
};

export default CategoriesItem;
