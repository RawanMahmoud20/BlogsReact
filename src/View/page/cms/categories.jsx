import { NavLink } from "react-router-dom";
import CategoriesItem from "../../component/cms/CategoriesItem";

let Categories = () => {
  return (
    <section class="content">
      <div class="content-header">
        <span>All Categories</span>
        <div class="content-header-options">
          <div class="content-header-options_filter">
            <img src="images/btn_Filter.svg" alt="" />
          </div>
          <NavLink className="header-button" to="/cms/categories/new">
            Create New Category
          </NavLink>
        </div>
      </div>
      <div class="content-body">
        <section class="all-categories">
          <CategoriesItem />
          <CategoriesItem />
          <CategoriesItem />
          <CategoriesItem />
          <CategoriesItem />
        </section>
      </div>
    </section>
  );
};

export default Categories;
