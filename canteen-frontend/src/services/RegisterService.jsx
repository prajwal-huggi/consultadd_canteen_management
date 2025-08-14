import axios from "axios";

const RegisterService = async (email, name, password) => {
  try {
    console.log(`${name}, ${email}, ${password}`);

    const data = {
      email: email,
      name: name,
      password: password,
    };
    const response = await axios.post(
      "http://localhost:8080/auth/signup/employee",
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
