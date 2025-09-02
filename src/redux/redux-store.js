import { configureStore } from "@reduxjs/toolkit";
import { CategoriesReducer } from "./slices/categories-slice";
import { blogsReducer } from "./slices/blogs-slice";

let reduxStore = configureStore({
  reducer: {
    categories: CategoriesReducer,
    blogs: blogsReducer,
  },
 
});
export default reduxStore;