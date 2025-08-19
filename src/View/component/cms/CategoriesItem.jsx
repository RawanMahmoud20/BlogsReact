import Delete from "../../../resourse/images/ic_delete.svg";
import Time from "../../../resourse/images/ic_time.svg";

let CategoriesItem = () => {
  return (
    <article class="category">
      <div class="category-header">
        <span>Design</span>
        <div class="table-option">
          <img src={Delete} alt="" />
        </div>
      </div>
      <span>Blog No.</span>
      <div class="category-footer">
        <img src={Time} alt="" />
        <span>23 Blog</span>
      </div>
    </article>
  );
};

export default CategoriesItem;
