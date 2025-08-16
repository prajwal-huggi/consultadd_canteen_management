import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetTransactionHistoryEmployee from "../services/GetTransactionHistoryEmployee";
import TransactionCard from "../components/TransactionCard";

function UserHistory() {
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function init() {
    setLoading(true);
    try {
      const response = await GetTransactionHistoryEmployee();
      console.log("Transaction API Response:", response);

      if (response.status === 200 && response.data.length > 0) {
        setUserHistory(response.data);
        setMessage("");
      } else {
        setMessage("No transaction history found");
        console.log("No transaction history found");
      }
    } catch (error) {
      console.error("Error fetching history:", error);
      setMessage("Failed to load transaction history");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  const calculateTotalSpent = () => {
    return userHistory.reduce((total, tx) => total + tx.totalPrice, 0);
  };

  return (
    <>
      {/* Header with Back Button */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 font-semibold hover:underline flex items-center gap-2"
        >
          ← Back
        </button>
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

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 py-8">
        <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Transaction History
          </h1>

          {/* Summary Card */}
          {userHistory.length > 0 && (
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Total Transactions</h3>
                  <p className="text-2xl font-bold">{userHistory.length}</p>
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-semibold">Total Spent</h3>
                  <p className="text-2xl font-bold">₹{calculateTotalSpent()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
              <p className="text-gray-600 font-medium">Loading your history...</p>
            </div>
          )}

          {/* Error/Empty State */}
          {!loading && message && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium text-center">{message}</p>
            </div>
          )}

          {/* Transaction List */}
          {!loading && userHistory.length > 0 && (
            <div className="space-y-4">
              {userHistory.map((tx, index) => (
                <TransactionCard
                  key={index}
                  transactionId={tx.id}
                  date={tx.purchaseDate}
                  itemName={tx.item.name}
                  quantity={tx.quantity}
                  price={tx.totalPrice}
                />
              ))}
            </div>
          )}

          {/* Refresh Button */}
          {!loading && (
            <div className="mt-6 text-center">
              <button
                onClick={init}
                className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-600 transition duration-300 inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserHistory;