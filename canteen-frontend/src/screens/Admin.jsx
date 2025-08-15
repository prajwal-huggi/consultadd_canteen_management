// src/components/Admin.jsx
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-sm">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Button Group */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() => {
            console.log("items");
            navigate("/user");
          }}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition"
        >
          📦 Manage Items
        </button>

        <button
          onClick={() => {
            console.log("employees");
            navigate("/allEmployee");
          }}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition"
        >
          👥 Manage Employees
        </button>
      </div>
    </div>
  );
}

export default Admin;
