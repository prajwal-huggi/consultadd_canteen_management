import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard";
import { useNavigate } from "react-router-dom";
import SaveItemService from "../services/SaveItemService";
import GetAllItemService from "../services/GetAllItemService";
import DeleteItemService from "../services/DeleteItemService";
import GetEmployeeService from "../services/GetEmployeeService";
import AddMoneyService from "../services/AddMoneyService";

function User() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [totalCost, setTotalCost] = useState(0);
  const [currentSalary, setCurrentSalary] = useState(0);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [email , setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSalaryClick = () => setOpen(true);
  const handleClose = () => {
    setAmount(0);
    setOpen(false);
  };
  const handleAddMoney = async() => {
    console.log(`Current Salary: is ${currentSalary} and the added money is ${amount}`); 
    const response= await AddMoneyService(email, name, currentSalary, amount);
    // console.log("Amount to add:", amount); // Later you can replace this with your backend call
    if(response.status === 200) {
      alert("Money added successfully");
      setCurrentSalary(response.data.balance);
    } else {
      alert("Failed to add money");
    }
    console.log(response);
    handleClose();
  };

  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [products, setProducts] = useState([]);

  async function init() {
    try {
      let response = await GetAllItemService();
      if (response.status === 200) {
        setProducts(
          response.data.map((item) => ({
            ...item,
            totalItem: item.quantity,
            quantity: 0,
          }))
        );
      }
      response = await GetEmployeeService();
      if (response.status === 200) {
        setCurrentSalary(response.data.balance);
        setEmail(response.data.email);
        setName(response.data.name);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        quantity: 0,
      }))
    );
    setTotalCost(0);
  }, []);

  const filteredItems = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const increaseQuantity = (id) => {
    const product = products.find((p) => p.id === id);
    if (product && product.quantity < product.totalItem) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
      setTotalCost((prevTotal) => prevTotal + product.price);
    } else {
      alert(`${product.name} has total quantity ${product.totalItem}`);
    }
  };

  const decreaseQuantity = (id) => {
    const product = products.find((p) => p.id === id);
    if (product && product.quantity > 0) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
      setTotalCost((prevTotal) => prevTotal - product.price);
    }
  };

  function onClickCheckout() {
    const sendProducts = products.filter((p) => p.quantity > 0);
    navigate("/checkout", { state: sendProducts });
  }

  async function onClickSaveItem(name, price, quantity) {
    try {
      const response = await SaveItemService(name, price, quantity);

      if (response.status === 201) {
        alert("Item Saved Successfully");
        await init();
        return true;
      } else {
        alert("Item not saved");
        return false;
      }
    } catch (error) {
      console.log(error);
      alert("Error saving item");
      return false;
    }
  }

  function onClickAddItem() {
    setShowAddItemForm(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.quantity) {
      alert("Please fill in all fields");
      return;
    }

    if (isNaN(formData.price) || isNaN(formData.quantity)) {
      alert("Price and quantity must be valid numbers");
      return;
    }

    if (parseFloat(formData.price) <= 0 || parseInt(formData.quantity) <= 0) {
      alert("Price and quantity must be greater than 0");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await onClickSaveItem(
        formData.name,
        formData.price,
        formData.quantity
      );

      if (success) {
        setFormData({ name: "", price: "", quantity: "" });
        setShowAddItemForm(false);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormCancel = () => {
    setFormData({ name: "", price: "", quantity: "" });
    setShowAddItemForm(false);
  };

  const handleDelete = async (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete ${productName}?`)) {
      try {
        const response = await DeleteItemService(productId);
        if (response.status === 204) {
          alert("Item deleted Successfully");
          init();
        }
      } catch (error) {
        console.error(error);
        alert("Unable to delete the item");
      }
    }
  };

  return (
    <>
      {/* Header Buttons */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        {localStorage.getItem("role") === "EMPLOYEE" && (
          <button
            onClick={() => navigate("/userHistory")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            History
          </button>
        )}
        <button
          onClick={() => {
            localStorage.setItem("authToken", "");
            navigate("/login", { replace: true });
          }}
          className="text-red-500 font-semibold hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Salary Display */}
      <div className="flex px-6">
        <button onClick={handleSalaryClick}>₹ {currentSalary}</button>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 py-8">
        <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Canteen Items
          </h1>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for an item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Item List */}
          {filteredItems.length > 0 ? (
            <div className="space-y-4">
              {filteredItems.map((product) => (
                <FoodCard
                  key={product.id}
                  name={product.name}
                  quantity={product.quantity}
                  price={product.price}
                  onIncrease={() => increaseQuantity(product.id)}
                  onDecrease={() => decreaseQuantity(product.id)}
                  onDelete={() => handleDelete(product.id, product.name)}
                  isItemOfTheDay={product.isItemOfTheDay}
                />
              ))}
            </div>
          ) : (
            <p className="text-red-500 font-medium text-center">
              No item present
            </p>
          )}

          {/* Total Cost & Checkout */}
          {localStorage.getItem("role") === "EMPLOYEE" && (
            <div className="mt-6 flex justify-between items-center text-lg font-semibold text-gray-800">
              <span>Total Cost:</span>
              <span>₹{totalCost}</span>
            </div>
          )}

          {localStorage.getItem("role") === "EMPLOYEE" ? (
            <button
              onClick={onClickCheckout}
              className="mt-6 w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition duration-300"
            >
              Proceed to Checkout
            </button>
          ) : (
            <button
              onClick={onClickAddItem}
              className="mt-6 w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition duration-300"
            >
              Add Item
            </button>
          )}
        </div>
      </div>

      {/* Floating Add Salary Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Add Money
            </h2>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
              className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleClose}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMoney}
                className="flex-1 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 transition duration-300"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Form Modal */}
      {showAddItemForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Add New Item
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter item name"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price (₹)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Total Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter total quantity"
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleFormCancel}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition duration-300"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 transition duration-300 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default User;
