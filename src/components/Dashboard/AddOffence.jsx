import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddOffence = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    plateNumber: "",
    driverName: "",
    licenseNumber: "",
    offenceType: "",
    fineAmount: "",
    date: new Date().toISOString().slice(0, 16),
    location: "",
    remarks: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.plateNumber || !formData.driverName || !formData.offenceType || !formData.fineAmount) {
      alert("Please fill in all required fields.");
      return;
    }

    const existingOffences = JSON.parse(localStorage.getItem("offences")) || [];
    const newOffence = {
      id: Date.now(),
      ...formData,
      fineAmount: parseFloat(formData.fineAmount),
    };

    const updatedOffences = [newOffence, ...existingOffences];
    localStorage.setItem("offences", JSON.stringify(updatedOffences));

    setSuccessMessage("✅ Offence record successfully added!");

    setTimeout(() => {
      setFormData({
        plateNumber: "",
        driverName: "",
        licenseNumber: "",
        offenceType: "",
        fineAmount: "",
        date: new Date().toISOString().slice(0, 16),
        location: "",
        remarks: "",
        image: null,
      });
      setPreviewImage(null);
      setSuccessMessage("");
      navigate("/officer-dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-3 sm:space-y-0">
        <h1 className="text-xl sm:text-2xl font-bold text-green-700 text-center sm:text-left">
          Add New Offence
        </h1>
        <button
          onClick={() => navigate("/officer-dashboard")}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition text-sm sm:text-base w-full sm:w-auto"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center text-sm sm:text-base">
          {successMessage}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-4 sm:p-6 max-w-3xl mx-auto space-y-6"
      >
        {/* Plate Number & Driver Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-gray-700 font-semibold text-sm sm:text-base">
              Plate Number *
            </label>
            <input
              type="text"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={handleChange}
              placeholder="e.g., ABC123XYZ"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold text-sm sm:text-base">
              Driver Name *
            </label>
            <input
              type="text"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              required
            />
          </div>
        </div>

        {/* License & Offence Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-gray-700 font-semibold text-sm sm:text-base">
              License Number
            </label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="e.g., DVR-5678"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold text-sm sm:text-base">
              Offence Type *
            </label>
            <select
              name="offenceType"
              value={formData.offenceType}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              required
            >
              <option value="">Select Offence</option>
              <option value="Over Speeding">Over Speeding</option>
              <option value="Running Red Light">Running Red Light</option>
              <option value="Illegal Parking">Illegal Parking</option>
              <option value="Driving Without License">Driving Without License</option>
              <option value="Distracted Driving">Distracted Driving</option>
            </select>
          </div>
        </div>

        {/* Fine & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-gray-700 font-semibold text-sm sm:text-base">
              Fine Amount (₦) *
            </label>
            <input
              type="number"
              name="fineAmount"
              value={formData.fineAmount}
              onChange={handleChange}
              placeholder="e.g., 15000"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold text-sm sm:text-base">
              Date & Time
            </label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-semibold text-sm sm:text-base">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Ojota Roundabout, Lagos"
            className="mt-1 p-2 w-full border rounded-md focus:ring-1 focus:ring-green-500 text-sm sm:text-base"
          />
        </div>

        {/* Remarks */}
        <div>
          <label className="block text-gray-700 font-semibold text-sm sm:text-base">
            Officer Remarks
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Add remarks about the offence..."
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            rows="3"
          />
        </div>

        {/* Picture Evidence */}
        <div>
          <label className="block text-gray-700 font-semibold text-sm sm:text-base">
            Picture Evidence
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block text-sm sm:text-base"
          />
          {previewImage && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <img
                src={previewImage}
                alt="Evidence Preview"
                className="w-32 sm:w-40 h-32 sm:h-40 object-cover rounded shadow"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition w-full md:w-auto text-sm sm:text-base"
        >
          Submit Offence
        </button>
      </form>
    </div>
  );
};

export default AddOffence;
