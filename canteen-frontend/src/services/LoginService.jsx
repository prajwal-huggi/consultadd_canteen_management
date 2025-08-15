import axios from "axios";
import { backend_url } from "./url";

const LoginService = async (email, password) => {
  try {
    console.log(`${email}, ${password}`);
    const data = {
      email: email,
      password: password,
    };
    const response = await axios.post(`${backend_url}/auth/login`, data);
    console.log(response.data);

    return response;

  } catch (error) {
    console.error(error);
    return {
      status_code: "500",
      message: "Internal Server Error",
    };
  }
};

export default LoginService;