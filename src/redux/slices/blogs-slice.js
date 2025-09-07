import { createSlice } from "@reduxjs/toolkit";
let state =   { data: JSON.parse(localStorage.getItem("blogs")) || []} ;

let blogsSlice = createSlice({
  name: "blogs-slice",
  initialState: state,

  reducers: {
   create(state, action) {
      state.data.push(action.payload); // إضافة بلوج جديد
         localStorage.setItem("blogs", JSON.stringify(state.data));

    },
   update(state, action) {
     const index = state.data.findIndex(cat => cat.id === action.payload.id);
     if (index !== -1) {
       state.data[index] = action.payload;
     }
         localStorage.setItem("blogs", JSON.stringify(state.data));

    },
   delete(state, action) {
     let filteredData = state.data.filter(
       (element) => element.id !== action.payload
     );
     state.data = filteredData;
         localStorage.setItem("blogs", JSON.stringify(state.data));

    },
   read(state, action) {
      state.data = action.payload; // لو حبيت تعمل initialize
         localStorage.setItem("blogs", JSON.stringify(state.data));

    },
  },
});

export const  blogsActions = blogsSlice.actions;
export const  blogsReducer = blogsSlice.reducer;
