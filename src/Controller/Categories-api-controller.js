import axios from "axios";
import ApiResponse from "../Modules/ApiResponse";

class CategoriesApiController {
  // operation Read
  fetchCategories = async () => {
    axios.defaults.baseURL = "http://localhost:8000/api";
    axios.defaults.withCredentials = true;
    let response = await axios.get("/v1/brands");
    if (response.status === 200) {
      let categories = [];
      for (let item in response.data.data) {
        categories.push(response.data.data[item]);
        console.log(categories);
      }
      // let apirespons = new ApiResponse("Success", true);
      // apirespons.categories = categories;
      // return apirespons;
      return categories;
    }
    return [];
    console.log(response);
    // if (response.status === 200 && Array.isArray(response.data.data)) {
    //   const brands = response.data.data;

    //   if (brands.length === 0) {
    //     console.log("⚠️ لا توجد علامات تجارية");
    //   } else {
    //     for (let item of brands) {
    //       console.log("🔹", item);
    //     }
    //   }
    // }
  };
}
export default CategoriesApiController;
