import { Pencil, Trash2 } from "lucide-react"; // icon library (install: npm install lucide-react)

function FoodCard({
  name,
  price,
  quantity,
  onIncrease=()=>{},
  onDecrease= ()=>{},
  isItemOfTheDay= false,
  onDelete= ()=>{},
}) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
      {/* Left side: Name & Price */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-medium">{name}</span>
          {isItemOfTheDay && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-yellow-300 text-yellow-800 rounded">
              Item of the Day
            </span>
          )}
        </div>
        <span className="block text-sm text-gray-600">₹{price}</span>
      </div>

      {/* Quantity Controls */}
      {localStorage.getItem("role") === "EMPLOYEE" ? (
        <div className="flex items-center space-x-3">
          <button
            onClick={onDecrease}
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            -
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button
            onClick={onIncrease}
            className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600"
          >
            +
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <button
            onClick={onDelete}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default FoodCard;
