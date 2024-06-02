import React from "react";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const navigator = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-pink-600 flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto text-center p-8 bg-white shadow-lg rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-green-500 mx-auto mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your order has been successfully placed.
        </p>
        <button
          onClick={() => {
            navigator("/");
          }}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default ThankYou;
