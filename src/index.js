import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/appRoute";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<BrowserRouter>
 <AppRoute/>
</BrowserRouter>
);
