import { createSlice } from "@reduxjs/toolkit";

let initialState = { categories: [] };
let categoriesSlice = createSlice({
name: "categories-Slice",
initialState: initialState,
reducers: {
    setCategories(state, action) {
    state.categories = action.payload;
    },
    getCategories(state, action) {
        state.categories = action.payload;
        },
},
});
export const categoriesReducer = categoriesSlice.reducer;
export const categoriesAction = categoriesSlice.actions;
