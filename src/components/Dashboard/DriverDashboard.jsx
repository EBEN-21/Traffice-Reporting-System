import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);
  const [offences, setOffences] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedDriver = JSON.parse(localStorage.getItem("loggedInDriver"));
    if (!storedDriver) {
      navigate("/driver-login");
      return;
    }

    setDriver(storedDriver);

    // ✅ Gather all offences from all officers
    const allKeys = Object.keys(localStorage);
    const allOffences = [];

    allKeys.forEach((key) => {
      if (key.startsWith("offences_")) {
        const officerOffences = JSON.parse(localStorage.getItem(key)) || [];
        allOffences.push(...officerOffences);
      }
    });

    // ✅ Filter offences for this driver
    const driverOffences = allOffences.filter(
      (o) =>
        o.plateNumber?.toLowerCase() ===
          storedDriver.plateNumber?.toLowerCase() &&
        o.driverName?.toLowerCase() === storedDriver.driverName?.toLowerCase()
    );

    setOffences(driverOffences);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInDriver");
    navigate("/");
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handlePayNow = (id) => {
    const updatedOffences = offences.map((o) =>
      o.id === id ? { ...o, status: "Paid" } : o
    );
    setOffences(updatedOffences);

    // ✅ Update across all officer offence records
    const allKeys = Object.keys(localStorage);
    allKeys.forEach((key) => {
      if (key.startsWith("offences_")) {
        const list = JSON.parse(localStorage.getItem(key)) || [];
        const updatedList = list.map((item) =>
          item.id === id ? { ...item, status: "Paid" } : item
        );
        localStorage.setItem(key, JSON.stringify(updatedList));
      }
    });

    alert("Payment successful!");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 relative">
      {/* ===== Sidebar (visible on md+) ===== */}
      <aside className="hidden md:flex w-64 bg-green-700 text-white flex-col shadow-lg fixed h-full">
        <h2 className="px-6 mt-9 text-xl font-bold">DRIVER'S PANEL</h2>
        <nav className="flex-1 p-4 space-y-2">
          <button
            className="w-full text-left px-4 py-2 rounded hover:bg-green-800 transition"
            onClick={() => navigate("/driver-dashboard")}
          >
            Dashboard
          </button>
          <button
            className="w-full text-left px-4 py-2 rounded hover:bg-green-800 transition"
            onClick={() => alert("Payment History (Coming Soon)")}
          >
            Payment History
          </button>
          <button
            className="w-full text-left px-4 py-2 rounded hover:bg-green-800 transition"
            onClick={() => alert("Profile Page (Coming Soon)")}
          >
            Profile
          </button>
          <button
            className="w-full text-left px-4 py-2 mt-6 bg-red-600 rounded hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* ===== Top Bar for Mobile ===== */}
      <div className="md:hidden w-full bg-green-700 text-white flex justify-between items-center px-4 py-3 shadow-lg relative">
        <h1 className="text-lg font-semibold truncate max-w-[70%]">
          {driver?.driverName ? `Welcome, ${driver.driverName}` : "Driver"}
        </h1>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="text-2xl focus:outline-none"
        >
          <HiMenuAlt3 />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-3 top-14 w-44 bg-white rounded-lg shadow-lg border border-gray-200 z-50 text-gray-700"
            >
              <nav className="flex flex-col text-sm">
                <Link
                  to="/driver-dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className="px-4 py-2 hover:bg-green-50 hover:text-green-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    alert("Redirecting to Payment...");
                    setDropdownOpen(false);
                  }}
                  className="text-left px-4 py-2 hover:bg-green-50 hover:text-green-700"
                >
                  Pay Now
                </button>
                <button
                  onClick={() => {
                    alert("Payment History (Coming Soon)");
                    setDropdownOpen(false);
                  }}
                  className="text-left px-4 py-2 hover:bg-green-50 hover:text-green-700"
                >
                  Payment History
                </button>
                <button
                  onClick={() => {
                    alert("Profile Page (Coming Soon)");
                    setDropdownOpen(false);
                  }}
                  className="text-left px-4 py-2 hover:bg-green-50 hover:text-green-700"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="text-left px-4 py-2 hover:bg-red-50 text-red-600"
                >
                  Logout
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== Main Content ===== */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 transition-all duration-300 overflow-x-auto">
        <div className="hidden md:flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-green-700">
            Welcome, {driver?.driverName}
          </h1>
        </div>

        {offences.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-green-700 text-white text-left">
                  <th className="p-3 whitespace-nowrap">Plate Number</th>
                  <th className="p-3 whitespace-nowrap">Offence Type</th>
                  <th className="p-3 whitespace-nowrap">Fine (₦)</th>
                  <th className="p-3 whitespace-nowrap">Date</th>
                  <th className="p-3 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {offences.map((o) => (
                  <React.Fragment key={o.id}>
                    <tr
                      onClick={() => toggleRow(o.id)}
                      className="hover:bg-gray-50 cursor-pointer border-b last:border-none"
                    >
                      <td className="p-3 font-semibold text-blue-700 whitespace-nowrap">
                        {o.plateNumber}
                      </td>
                      <td className="p-3 whitespace-nowrap">{o.offenceType}</td>
                      <td className="p-3 whitespace-nowrap">
                        {o.fineAmount.toLocaleString()}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {new Date(o.date).toLocaleDateString()}{" "}
                        {new Date(o.date).toLocaleTimeString()}
                      </td>
                      <td
                        className={`p-3 font-semibold ${
                          o.status === "Paid" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {o.status || "Unpaid"}
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    <AnimatePresence>
                      {expandedRow === o.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td colSpan="5" className="p-4 bg-gray-50">
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                            >
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <p>
                                    <span className="font-semibold text-gray-700">
                                      License:
                                    </span>{" "}
                                    {o.licenseNumber || "N/A"}
                                  </p>
                                  <p>
                                    <span className="font-semibold text-gray-700">
                                      Location:
                                    </span>{" "}
                                    {o.location || "N/A"}
                                  </p>
                                  <p>
                                    <span className="font-semibold text-gray-700">
                                      Remarks:
                                    </span>{" "}
                                    {o.remarks || "N/A"}
                                  </p>

                                  {o.status !== "Paid" && (
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => handlePayNow(o.id)}
                                      className="mt-3 bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
                                    >
                                      Pay Now
                                    </motion.button>
                                  )}
                                </div>

                                {o.image && (
                                  <div>
                                    <span className="font-semibold block mb-2 text-gray-700">
                                      Evidence:
                                    </span>
                                    <img
                                      src={o.image}
                                      alt="Offence Evidence"
                                      className="w-full h-48 object-cover rounded-md shadow"
                                    />
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 mt-8 text-center">
           No offences committed.
          </p>
        )}
      </main>
    </div>
  );
};

export default DriverDashboard;
