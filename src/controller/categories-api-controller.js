import axios from "axios";
import ApiResponse from "../models/ApiResponse";
import Category from "../models/Category";
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

read = async(Category)=>{
 axios.defaults.withCredentials = true;
 axios.defaults.baseURL = "http://localhost:8000";
    try {
        let response = await axios.get(`/api/v1/categories`);
        if(response.status == 200){
            // when get data in form
            let categories=[];
            response.data.data.forEach((element)=>{
            categories.push(
            new Category(element.id , element.name, element.slug)
            );
            });
            return categories;
            // // In normal and the one data is json and data 2 this is getted 
            // return response.data.data;
            }
            return [];
    } catch (error) {
        return this.#errorResponse();
    }
};
delete = async(id)=>{
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "http://localhost:8000";
    try {
        let response = await axios.post(`/api/v1/categories/${id}`);
        if(response.status == 204){
            return new ApiResponse("Category deleted successfully", true);
        }
    } catch (error) {
        return this.#errorResponse();
    }
}
}