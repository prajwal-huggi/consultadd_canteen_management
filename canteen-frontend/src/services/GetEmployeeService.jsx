import axios from "axios";
import { backend_url } from "./url";

const GetEmployeeService= async()=>{
    try{
        const token= localStorage.getItem("authToken");
        const employeeId= localStorage.getItem("employeeId");
        console.log(employeeId);
        const response= axios.get(`${backend_url}/admin/employees/${employeeId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;

    }catch(error){
        console.log(error);
        return {
      status_code: "500",
      message: "Internal Server Error",
    };
    }
}

export default GetEmployeeService;