import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DriverLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plateNumber: "",
    driverName: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { plateNumber, driverName } = formData;
    if (!plateNumber || !driverName) {
      setError("Please enter both Plate Number and Driver Name.");
      return;
    }

    // ✅ Everyone can log in — even if no offences are found
    localStorage.setItem(
      "loggedInDriver",
      JSON.stringify({ plateNumber, driverName })
    );

    navigate("/driver-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 px-3 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-xl w-full max-w-sm sm:max-w-md p-5 sm:p-8"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-green-700 text-center mb-5 sm:mb-6">
          Driver Login
        </h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 text-red-700 p-2 mb-3 rounded text-center text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Plate Number
            </label>
            <input
              type="text"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={handleChange}
              placeholder="e.g., KJA-456GH"
              className="w-full p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Driver Name
            </label>
            <input
              type="text"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              placeholder="e.g., Musa Ibrahim"
              className="w-full p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded font-medium hover:bg-green-800 transition text-sm"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} Traffic Safety System
        </p>
      </motion.div>
    </div>
  );
};

export default DriverLogin;
