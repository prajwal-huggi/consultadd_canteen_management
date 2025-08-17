import axios from "axios";
import { backend_url } from "./url";

function CheckoutItemService(employeeId, itemId, quantity) {
  try {
    const token = localStorage.getItem("authToken");
    const data = {
      itemId: itemId,
      quantity: quantity,
    };
    const response = axios.post(
      `${backend_url}/employee/${employeeId}/purchase`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    return response;
  } catch (error) {
    return {
      status_code: "500",
      message: "Internal Server Error",
    };
  }
}

export default CheckoutItemService;
