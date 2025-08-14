import axios from "axios";
import { backend_url } from "./url";

const RegisterService = async (email, name, password) => {
  try {
    console.log(`${name}, ${email}, ${password}`);

    const data = {
      email: email,
      name: name,
      password: password,
    };
    const response = await axios.post(
      `${backend_url}/auth/signup/employee`,
      data
    );
    console.log("inside the registerService file");
    console.log(response.status);
    return response;

  } catch (error) {
    console.error(error);
    return {
      status_code: "500",
      message: "Internal Server Error",
    };
  }
};

export default RegisterService;
