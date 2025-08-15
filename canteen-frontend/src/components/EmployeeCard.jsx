// src/components/EmployeeCard.jsx
import { Pencil, Trash2 } from "lucide-react"; // icon library (install: npm install lucide-react)

function EmployeeCard({ srNo, id, name, email, balance, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm border">
      {/* Left side: Employee details */}
      <div>
        <div className="flex space-x-4 text-sm text-gray-700">
          {/* <span className="font-semibold">Sr. No:</span> <span>{srNo}</span> */}
          <span className="font-semibold">ID:</span> <span>{id}</span>
        </div>
        <div className="mt-1">
          <span className="text-lg font-medium">{name}</span>
        </div>
        <div className="text-sm text-gray-600">{email}</div>
        <div className="text-sm text-gray-800 font-semibold">Balance: ₹{balance}</div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        {/* <button
          onClick={onEdit}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          title="Edit"
        >
          <Pencil size={18} />
        </button> */}
        <button
          onClick={onDelete}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;
