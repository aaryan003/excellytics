// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <main className="flex flex-col items-center justify-center h-screen pt-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Excellify
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your one-stop platform for Excel-based learning and insights.
        </p>
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-6 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors">
              Signup
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
