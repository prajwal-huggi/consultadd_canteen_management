import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetAllEmployee from "../services/GetAllEmployeeService";
import EmployeeCard from "../components/EmployeeCard";
import DeleteEmployeeService from "../services/DeleteEmployeeService";

function AllEmployee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const init = async () => {
    try {
      setLoading(true);
      const response = await GetAllEmployee();
      if (response.status === 200) {
        setEmployees(response.data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const filteredEmployees = employees.filter(
  (employee) =>
    employee.role === "EMPLOYEE" &&
    (
      (employee.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toString().includes(searchTerm)
    )
);


  const handleEdit = (employeeId) => {
    console.log("Edit employee:", employeeId);
    // Navigate to edit page or open edit modal
    navigate(`/editEmployee/${employeeId}`);
  };

  const handleDelete = async (employeeId, employeeName) => {
  if (window.confirm(`Are you sure you want to delete ${employeeName}?`)) {
    console.log("Delete employee:", employeeId);
    try {
      const response = await DeleteEmployeeService(employeeId);
      if (response.status === 204) {
        alert("Employee deleted Successfully");
        init();
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete the employee");
    }
  }
};


  const handleAddEmployee = () => {
    console.log("Add new employee");
    navigate("/addEmployee");
  };

  const handleLogout = () => {
    console.log("Clicked on the logout button");
    localStorage.setItem("authToken", "");
    localStorage.setItem("role", "");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Header Buttons */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <button
          onClick={handleAddEmployee}
          className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Add Employee
        </button>
        <button
          onClick={handleLogout}
          className="text-red-500 font-semibold hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 py-8">
        <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            All Employees
          </h1>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Employee Count */}
          {!loading && <></>}

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
              <p className="mt-2 text-gray-600">Loading employees...</p>
            </div>
          ) : (
            <>
              {/* Employee List */}
              {filteredEmployees.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredEmployees.map((employee, index) => (
                    <EmployeeCard
                      key={employee.id}
                      srNo={index + 1}
                      id={employee.id}
                      name={employee.name}
                      email={employee.email}
                      balance={employee.balance || 0}
                      onEdit={() => handleEdit(employee.id)}
                      onDelete={() => handleDelete(employee.id, employee.name)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-red-500 font-medium text-center py-8">
                  {searchTerm
                    ? "No employees found matching your search"
                    : "No employees found"}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AllEmployee;