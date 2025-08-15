import axios from "axios";
import { backend_url } from "./url";

const DeleteEmployeeService = (id) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = axios.delete(`${backend_url}/admin/employees/${id}`, {
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

export default DeleteEmployeeService;
