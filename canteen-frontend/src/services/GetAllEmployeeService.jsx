import axios from "axios";
import { backend_url } from "./url";

const GetAllEmployeeService = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${backend_url}/admin/employees`, {
      headers: {
        Authorization: `Bearer ${token}`, // attach token
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

export default GetAllEmployeeService;
