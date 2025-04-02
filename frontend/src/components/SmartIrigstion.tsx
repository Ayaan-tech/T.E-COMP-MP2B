import { useState } from "react";

function SmartIrrigation() {
  const [soilType, setSoilType] = useState("");
  const [cropType, setCropType] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [waterRequired, setWaterRequired] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cropOptions = ["Wheat", "Barley", "Maize", "Cotton", "Soybean", "Tomato", "Rice", "Sugarcane"];
  const soilOptions = ["Silt", "Sandy", "Loamy", "Clay", "Peat"];

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setWaterRequired(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/irrigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop_type: cropType,
          soil_type: soilType,
          rainfall: parseFloat(rainfall),
        }),
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (!response.ok) {
        throw new Error(data.detail || "Failed to fetch data");
      }

      if (data && typeof data === "object" && "water_required" in data) {
        setWaterRequired(data.water_required);
      } else {
        throw new Error("Invalid response from backend.");
      }
    } catch (err) {
      setError(err.message || "Failed to get prediction. Check backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
      <div className="w-full max-w-lg bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">Smart Irrigation System</h2>

        {/* Dropdown Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Soil Type</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-800 text-white shadow-sm"
            >
              <option value="" disabled>Select Soil Type</option>
              {soilOptions.map((soil) => (
                <option key={soil} value={soil}>{soil}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Crop Type</label>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-800 text-white shadow-sm"
            >
              <option value="" disabled>Select Crop Type</option>
              {cropOptions.map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Rainfall (mm)</label>
            <input
              type="number"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
              placeholder="Enter rainfall in mm"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-800 text-white shadow-sm"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition duration-200 shadow-md"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Predicting..." : "Calculate Water Requirement"}
        </button>

        {/* Display Result */}
        {waterRequired !== null && (
          <p className="mt-6 text-center text-xl font-semibold text-green-300 bg-gray-800 p-3 rounded-lg shadow-md">
            Water Required: {waterRequired} L/sq.m
          </p>
        )}

        {/* Display Error */}
        {error && <p className="mt-4 text-center text-red-400 font-medium bg-gray-800 p-3 rounded-lg shadow-md">{error}</p>}
      </div>
    </div>
  );
}

export default SmartIrrigation;
