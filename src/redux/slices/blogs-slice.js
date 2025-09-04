import { createSlice } from "@reduxjs/toolkit";
let state =   {data: [{}]} ;

let blogsSlice = createSlice({
  name: "blogs-slice",
  initialState: state,

  reducers: {
   create(state, action) {
    state.data= [...state.data, action.payload];    
   },
   update(state, action) {
     const index = state.data.findIndex(cat => cat.id === action.payload.id);
     if (index !== -1) {
       state.data[index] = action.payload;
     }
   },
   delete(state, action) {
    let filteredData=state.data.filter(
      (element)=>element._id !== action.payload
    );
     state.data = filteredData;   },
   read(state, action) {
     state.data = action.payload;
   },
  },
});

export const  blogsActions = blogsSlice.actions;
export const  blogsReducer = blogsSlice.reducer;
