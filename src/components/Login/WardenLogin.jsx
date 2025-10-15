import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import officers from "../../officers.json";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const WardenLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const officer = officers.find(
      (o) => o.email === email.trim() && o.password === password
    );

    if (officer) {
      localStorage.setItem("loggedInOfficer", JSON.stringify(officer));
      navigate("/officer-dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 px-3 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-xl w-full max-w-sm sm:max-w-md p-5 sm:p-8"
      >
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-green-700 text-center mb-5 sm:mb-6">
          Officer Login
        </h1>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 text-red-700 p-2 mb-3 rounded text-center text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 ">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-green-600"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded font-medium hover:bg-green-800 transition text-sm"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} Traffic Safety System
        </p>
      </motion.div>
    </div>
  );
};

export default WardenLogin;
