import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  loggedIn: localStorage.getItem("logged_in") ?? false,
  user: { name: "", id: "", email: "" },
};
let authSlice = createSlice({
  name: "auth-slice",
  initialState: initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload; // عشانها قيمة بولين
    },
    setUserInfo(state, action) {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        id: action.payload.id,
      };
    },
  },
});
export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;
