import axios from "axios";
import { backend_url } from "./url";

const SaveItemService = async (name, price, quantity) => {
  try {
    const data={
    "name": name,
    "price": price,
    "quantity": quantity
}
    const token= localStorage.getItem('authToken');
    const response = await axios.post(`${backend_url}/admin/items`, data, {
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

export default SaveItemService;
