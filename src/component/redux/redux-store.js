import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/auth-slice";
import { taskReducer } from "./slice/task-slice";
import { categoriesReducer } from "./slice/categories-slice";

let reduxStore=configureStore({
    reducer:{
        authReducer:authReducer,
        taskReducer:taskReducer,
        categoriesReducer:categoriesReducer,
    },
});
export default reduxStore;