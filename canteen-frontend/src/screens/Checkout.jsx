import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import CheckoutItemService from "../services/CheckoutItemService";

function Checkout() {
  const location = useLocation();
  const navigate= useNavigate();

  // Products passed from the previous page (must include quantity)
  const initialProducts = location.state || [];
  
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Reset products every time we come to this page
    const resetProducts = initialProducts.map((p) => ({
      ...p,
      quantity: p.quantity || 0 // default if not provided
    }));
    setProducts(resetProducts);
  }, [location.key]);

  const totalCost = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const increaseQuantity = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.quantity < p.totalItem
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  };

  const decreaseQuantity = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.quantity > 0
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  };
  const employeeId= localStorage.getItem("employeeId");
  const onClickProceed = async () => {
  console.log("Products are", products);
  console.log("Hii");

  for (const p of products) {
    try {
      const response = await CheckoutItemService(employeeId, p.id, p.quantity);
      console.log("Response:", response);
      alert("All items saved successfully!");
      navigate(-1);
    } catch (error) {
      console.log(error);
      setMessage("Unable to save the item");
    }
  }
};


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Checkout</h1>

      {products.length > 0 ? (
        <div className="space-y-4">
          {products.map((product) => (
            <FoodCard
              key={product.id}
              name={product.name}
              quantity={product.quantity}
              price={product.price}
              onIncrease={() => increaseQuantity(product.id)}
              onDecrease={() => decreaseQuantity(product.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-red-500 font-medium">No item present</p>
      )}

      {/* Total and Button */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
        <span className="text-lg font-semibold">
          Total Amount: <span className="text-green-600">₹{totalCost}</span>
        </span>
        <button onClick={onClickProceed} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md">
          Proceed
        </button>
      </div>
    </div>
  );
}

export default Checkout;
