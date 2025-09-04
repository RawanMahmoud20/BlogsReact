import { NavLink } from "react-router-dom";
import CategoriesItem from "../../component/cms/CategoriesItem";
import { useSelector } from "react-redux";

let Categories = () => {

let categories = useSelector((state)=>(state.categories.data));
  return (
    <section className="content">
      <div className="content-header">
        <span>All Categories</span>
        <div className="content-header-options">
          <div className="content-header-options_filter">
            <img src="images/btn_Filter.svg" alt="" />
          </div>
          <NavLink className="header-button" to="/cms/categories/new">
            Create New Category
          </NavLink>
        </div>
      </div>
      <div className="content-body">
        <section className="all-categories">

          {
          categories.length >0 
          ?
          categories.map((element)=>(
          <CategoriesItem key={element.id} data={element}/>
          )) 
          :
          <p>No categories found</p>
          }
        </section>
      </div>
    </section>
  );
};

export default Categories;
