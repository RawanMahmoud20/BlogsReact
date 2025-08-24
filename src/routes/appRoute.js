import { useHref } from "react-router-dom";
import CmsRoute from "./cms-router";
import WebRoute from "./web-routes";

let AppRoute = () => {
  let hreh = useHref();
  return <>{hreh.startsWith("/cms") ? <CmsRoute /> : <WebRoute />}</>;
};
export default AppRoute;
