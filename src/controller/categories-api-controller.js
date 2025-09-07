import axios from "axios";
import ApiResponse from "../models/ApiResponse";
import Category from "../models/Category";

class categoriesApiController{
  #errorResponse=()=> new ApiResponse("something went wrong , try again", false);
create = async(Category)=>{
 axios.defaults.withCredentials = true;
 axios.defaults.baseURL = "http://localhost:8000";
 try {
   let response = await axios.post(`/api/v1/categories`, {
     name: Category._name,
     slug: Category._slug, 
   });
   if(response.status == 201 || response.status == 400){
     return new ApiResponse(response.data["status"], response.data["success"]);
   }
 } catch (error) {
   return this.#errorResponse();
 }
};

read = async()=>{
 axios.defaults.withCredentials = true;
 axios.defaults.baseURL = "http://localhost:8000";
    try {
        let response = await axios.get(`/api/v1/categories`);
        if(response.status == 200){
            // when get data in form
           // بدل ما نرجع ApiResponse، رجع array من plain objects
          const categories = response.data.data.map(el => ({
            id: el.id,
            name: el.name,
            slug: el.slug,
            image: el.image
          }));
          return categories;
        }
        return []; // لو مافي data
      } catch (error) {
        console.error("Axios error:", error.response || error.message);
        return [];
      }
};
delete = async (id) => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:8000";

  try {
  // get token and csrfToken from localStorage
   let csrfRes = await axios.get("/csrf-token", { withCredentials: true });
    localStorage.setItem("csrfToken", csrfRes.data.csrfToken);

    console.log("Using csrfToken:", csrfRes.data.csrfToken);
    
    console.log("Sending delete request with:", {
      token: localStorage.getItem("token"),
      csrfToken: localStorage.getItem("csrfToken"),
    });
    let response = await axios.delete(`/api/v1/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT
        "x-csrf-token": localStorage.getItem("csrfToken"),        // CSRF
      },
      withCredentials: true,
    });
    console.log("Delete API raw response:", response);
    if (response.status === 200 || response.status === 204) {
      return new ApiResponse("Category deleted successfully", true);
    }
  } catch (error) {
    console.error("Delete error:", error.response?.data || error.message);
    return this.#errorResponse();
  }
};

}
export default categoriesApiController;
