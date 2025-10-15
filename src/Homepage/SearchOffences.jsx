import React, { useState } from "react";
import offences from "../data.json";

const SearchOffences = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!plateNumber.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const filtered = offences.filter(
      (offence) =>
        offence.plateNumber.toLowerCase() === plateNumber.toLowerCase()
    );
    setResults(filtered);
    setHasSearched(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const displayedData = hasSearched ? results : offences.slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 sm:p-6 md:p-8">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 text-center md:text-left">
        Traffic Offence Records
      </h1>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center md:justify-start">
        <input
          type="text"
          placeholder="Enter Plate Number (e.g., ABC123XYZ)"
          className="p-2 border border-gray-300 rounded-md w-full sm:w-[60%] md:w-[35%] lg:w-[30%] focus:outline-none focus:border-green-500 text-sm md:text-base"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {/* Table Section */}
      {displayedData.length > 0 ? (
        <div className="w-full">
          {/* Info message */}
          {hasSearched && results.length > 0 && (
            <div className="mb-4 text-gray-700 text-center md:text-left">
              Showing <strong>{results.length}</strong> result
              {results.length > 1 ? "s" : ""} for plate number:{" "}
              <span className="text-green-700 font-semibold break-words">
                {plateNumber}
              </span>
            </div>
          )}

          {/* Table Container */}
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse shadow-md text-sm sm:text-base min-w-[600px]">
              <thead>
                <tr className="bg-green-700 text-white text-center">
                  <th className="p-3 rounded-l-lg">Plate Number</th>
                  <th className="p-3">Driver Name</th>
                  <th className="p-3">Offence Type</th>
                  <th className="p-3">Fine Amount (₦)</th>
                  <th className="p-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((offence) => (
                  <tr
                    key={offence.id}
                    className="bg-white hover:bg-gray-50 transition-all duration-200 text-center border-b"
                  >
                    <td className="p-5 font-bold text-blue-700 rounded-l-lg">
                      {offence.plateNumber}
                    </td>
                    <td className="p-5">{offence.driverName}</td>
                    <td className="p-5">{offence.offenceType}</td>
                    <td className="p-5">
                      {offence.fineAmount.toLocaleString()}
                    </td>
                    <td
                      className={`p-5 font-semibold rounded-r-lg ${
                        offence.status === "Unpaid"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {offence.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Info about limited records */}
          {!hasSearched && offences.length > 10 && (
            <p className="mt-4 text-gray-600 text-sm text-center md:text-left">
              Showing only the first 10 records. Use search to find a specific plate number.
            </p>
          )}
        </div>
      ) : hasSearched ? (
        <p className="text-gray-600 mt-4 text-center">
          No records found for plate number:{" "}
          <strong className="text-red-600 break-words">{plateNumber}</strong>
        </p>
      ) : (
        <p className="text-gray-600 text-center">
          No offence records available.
        </p>
      )}
    </div>
  );
};

export default SearchOffences;
