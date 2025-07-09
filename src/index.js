import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "bootstrap/dist/css/bootstrap.css";
import "./resourse/css/custom.css";
import { Provider } from "react-redux";
import reduxStore from "./component/redux/redux-store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={reduxStore}>
      <AppRoutes />
    </Provider>
  </BrowserRouter>
);
