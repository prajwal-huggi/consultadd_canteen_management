// src/components/TransactionCard.jsx
function TransactionCard({ transactionId, date, itemName, quantity, price }) {
  // Format the date for better display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300 hover:border-indigo-200">
      <div className="flex justify-between items-start">
        {/* Left side: Transaction details */}
        <div className="flex-1">
          {/* Date with icon */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(date)}</span>
          </div>

          {/* Item name */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{itemName}</h3>
            
            {/* Quantity with icon */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>Qty: {quantity}</span>
            </div>
          </div>
        </div>

        {/* Right side: Price */}
        <div className="text-right">
          <div className="bg-green-50 px-3 py-2 rounded-lg border border-green-200">
            <div className="text-xs text-green-600 font-medium uppercase tracking-wide mb-1">
              Total Price
            </div>
            <div className="text-xl font-bold text-green-700">
              ₹{price}
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Add a subtle bottom border for visual separation */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Transaction ID: # {transactionId}</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;