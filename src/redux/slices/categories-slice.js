import { createSlice } from "@reduxjs/toolkit";
let state =   {data: []} ;

let categoriesSlice = createSlice({
  name: "categories-slice",
  initialState: state,

  reducers: {
   create(state, action) {
    //  spread of existing array and adding new object
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
      (element)=>element.id !== action.payload
    );
     state.data = filteredData;
   },
read(state, action) {
  // action.payload صار array من objects
  if (Array.isArray(action.payload)) {
    state.data = action.payload;
  } else {
    state.data = [];
  }
}


  },
});

export const  CategoriesActions = categoriesSlice.actions;
export const  CategoriesReducer = categoriesSlice.reducer;
