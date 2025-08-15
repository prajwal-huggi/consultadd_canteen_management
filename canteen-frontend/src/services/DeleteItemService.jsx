import axios from "axios";
import { backend_url } from "./url";

const DeleteItemService = async (id) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.delete(`${backend_url}/admin/items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return {
      status_code: "500",
      message: "Internal Server Error",
    };
  }
};

export default DeleteItemService;