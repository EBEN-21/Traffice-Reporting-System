import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";

const OfficerDash = () => {
  const [officerName, setOfficerName] = useState("");
  const [offences, setOffences] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
    const storedOfficer = JSON.parse(localStorage.getItem("loggedInOfficer"));
    if (storedOfficer) {
      setOfficerName(storedOfficer.name || storedOfficer.fullName || "Officer");

      // ✅ Load this officer's offences only
      const officerKey = `offences_${storedOfficer.id || storedOfficer.name || "unknown"}`;
      const storedOffences = JSON.parse(localStorage.getItem(officerKey)) || [];
      setOffences(storedOffences);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-gray-50">
      {/* ===== Desktop Sidebar ===== */}
      <aside className="hidden md:flex w-64 bg-green-800 text-white p-6 flex-col shadow-lg">
        <h2 className="text-2xl font-bold mb-10 tracking-wide">Officer Panel</h2>
        <nav className="flex-1 space-y-6 text-lg">
          <Link to="/officer-dashboard" className="block hover:text-green-200 transition">
            Dashboard
          </Link>
          <Link to="/add-offence" className="block hover:text-green-200 transition">
            Add Offence
          </Link>
          <Link
            to="/"
            onClick={() => localStorage.removeItem("loggedInOfficer")}
            className="block hover:text-green-200 transition"
          >
            Logout
          </Link>
        </nav>
        <footer className="text-sm text-gray-300 mt-8">
          &copy; {new Date().getFullYear()} Regulate NG
        </footer>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        {/* ===== Mobile Header with Dropdown ===== */}
        <div className="flex justify-between items-center mb-6 md:hidden relative">
          <h1 className="text-lg font-bold text-green-800">
            Hello, <span className="text-green-600">{officerName}</span>
          </h1>

          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 bg-green-700 text-white px-2 py-2 rounded-md text-sm shadow-md hover:bg-green-800 transition"
          >
            <HiOutlineMenu className="text-lg" />

          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-44 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              >
                <nav className="flex flex-col text-gray-700 text-sm">
                  <Link
                    to="/officer-dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-2 hover:bg-green-50 hover:text-green-700"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/add-offence"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-2 hover:bg-green-50 hover:text-green-700"
                  >
                    Add Offence
                  </Link>
                  <Link
                    to="/"
                    onClick={() => {
                      localStorage.removeItem("loggedInOfficer");
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-green-50 hover:text-green-700"
                  >
                    Logout
                  </Link>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ===== Desktop Header ===== */}
        <div className="hidden md:flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-green-800">
            Hello, <span className="text-green-600">{officerName}</span>
          </h1>
        </div>

        {/* ===== Offence Records Table ===== */}
        {offences.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="w-full min-w-[600px] border-collapse text-sm md:text-base mt-6">
              <thead>
                <tr className="bg-green-700 text-white text-center uppercase tracking-wider">
                  <th className="p-3 md:p-4">Plate Number</th>
                  <th className="p-3 md:p-4">Driver Name</th>
                  <th className="p-3 md:p-4">Offence</th>
                  <th className="p-3 md:p-4">Fine (₦)</th>
                  <th className="p-3 md:p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {offences.map((offence) => (
                  <React.Fragment key={offence.id}>
                    <tr
                      onClick={() => toggleExpand(offence.id)}
                      className="hover:bg-gray-100 cursor-pointer transition text-center"
                    >
                      <td className="p-3 md:p-4 font-semibold text-blue-700">
                        {offence.plateNumber}
                      </td>
                      <td className="p-3 md:p-4">{offence.driverName}</td>
                      <td className="p-3 md:p-4">{offence.offenceType}</td>
                      <td className="p-3 md:p-4 font-medium text-red-600">
                        ₦{Number(offence.fineAmount).toLocaleString()}
                      </td>
                      <td className="p-3 md:p-4 text-xs md:text-sm text-gray-600">
                        {new Date(offence.date).toLocaleString()}
                      </td>
                    </tr>

                    {expandedId === offence.id && (
                      <tr>
                        <td colSpan="5" className="bg-gray-50 p-0">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                              <div className="space-y-2 md:space-y-3 text-gray-700 text-xs md:text-sm">
                                <p>
                                  <span className="font-semibold">License No:</span>{" "}
                                  {offence.licenseNumber || "N/A"}
                                </p>
                                <p>
                                  <span className="font-semibold">Location:</span>{" "}
                                  {offence.location || "N/A"}
                                </p>
                                <p>
                                  <span className="font-semibold">Remarks:</span>{" "}
                                  {offence.remarks || "N/A"}
                                </p>
                              </div>
                              {offence.image && (
                                <div>
                                  <p className="font-semibold mb-2">📷 Evidence:</p>
                                  <img
                                    src={offence.image}
                                    alt="Evidence"
                                    className="w-full max-w-xs sm:max-w-sm h-40 sm:h-48 object-cover rounded-lg shadow-md border"
                                  />
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center mt-16">
            <p className="text-gray-500 text-lg">🚫 No offences recorded yet.</p>
            <Link
              to="/add-offence"
              className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 shadow"
            >
              Add Your First Offence
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default OfficerDash;
