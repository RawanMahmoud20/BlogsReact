import { createSlice } from "@reduxjs/toolkit";
let state =   {data: [{}]} ;

let blogsSlice = createSlice({
  name: "blogs-slice",
  initialState: state,

  reducers: {
   create(state, action) {
     state.categories.push(action.payload);
   },
   update(state, action) {
     const index = state.categories.findIndex(cat => cat.id === action.payload.id);
     if (index !== -1) {
       state.categories[index] = action.payload;
     }
   },
   delete(state, action) {
     state.categories = state.categories.filter(cat => cat.id !== action.payload.id);
   },
   read(state, action) {
     return state.categories.find(cat => cat.id === action.payload.id);
   },
  },
});

export const  blogsActions = blogsSlice.actions;
export const  blogsReducer = blogsSlice.reducer;
