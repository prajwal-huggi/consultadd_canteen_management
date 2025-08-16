import axios from "axios";
import { backend_url } from "./url";

const AddMoneyService = async (email, name, currentMoney, addMoney) => {
  try {
    console.log(`Adding money for ${email} with current balance ${currentMoney} and amount to add ${addMoney}`);
    const token = localStorage.getItem("authToken");
    const employeeId = localStorage.getItem("employeeId");
    const totalMoney = Number(currentMoney) + Number(addMoney);

    const data = {
      email: email,
      name: name,
      balance: totalMoney,
      role: localStorage.getItem("role")
    };

    const response = await axios.put(
      `${backend_url}/admin/employees/${employeeId}`,
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
    console.error(error);
    return {
      status_code: "500",
      message: "Internal Server Error",
    };
  }
};

export default AddMoneyService;
