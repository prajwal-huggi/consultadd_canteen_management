import axios from "axios";
import { backend_url } from "./url";
import { useState } from "react";

const GetTransactionHistoryEmployee = async () => {
  try {
    const token = localStorage.getItem("authToken");
    console.log("Token:", token);
    const response = await axios.get(
      `${backend_url}/employee/purchase-history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

export default GetTransactionHistoryEmployee;
