import { Route, Routes } from "react-router-dom";
import CMSParent from "../View/page/cms/CMSParent";
import Blogs from "../View/page/cms/Blogs";
import Categories from "../View/page/cms/categories";
import NewBlog from "../View/page/cms/NewBlog";
import NewCategories from "../View/page/cms/NewCategories";
let CmsRoute = () => {
  return (
    <Routes>
      <Route path="/cms" element={<CMSParent />}>
        <Route path="blog" element={<Blogs />}></Route>
        <Route path="categories" element={<Categories />}></Route>
        <Route path="blog/Create" element={<NewBlog />}></Route>
        <Route path="categories/new" element={<NewCategories/>}></Route>
      </Route>
    </Routes>
  );
};
export default CmsRoute;
