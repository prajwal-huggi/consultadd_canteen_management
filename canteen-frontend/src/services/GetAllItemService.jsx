import axios from "axios";
import { backend_url } from "./url";

const GetAllItemService = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${backend_url}/admin/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    });
    console.log(response);
    return response;

  } catch (error) {
    console.error(error);
    return {
      status_code: "500",
      message: "Internal Server Error",
    };
  }
};

export default GetAllItemService;
