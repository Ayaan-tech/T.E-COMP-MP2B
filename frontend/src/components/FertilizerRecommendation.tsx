import React, {  useState } from "react";
import axios from "axios";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
 
const words = `Fertilizer Recommendation`;
const soilTypes = ['Loamy Soil','Peaty Soil','Acidic Soil','Neutral Soil','Alkaline Soil'];
const cropTypes = ['rice', 'wheat', 'Mung Bean', 'Tea', 'millet', 'maize', 'Lentil', 'Jute', 'Coffee', 'Cotton', 'Ground Nut', 'Peas', 'Rubber', 'Sugarcane', 'Tobacco', 'Kidney Beans', 'Moth Beans', 'Coconut', 'Black gram', 'Adzuki Beans', 'Pigeon Peas', 'Chickpea', 'banana', 'grapes', 'apple', 'mango', 'muskmelon', 'orange', 'papaya', 'pomegranate', 'watermelon'];

function FertilizerRecommendation() {
  const [soil, setSoil] = useState("");
  const [crop, setCrop] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRecommendation = async () => {
    if (!soil || !crop) {
      setError("Please select both soil and crop type.");
      return;
    }

    setLoading(true);
    setError("");
    setFertilizer("");
    setRemark("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/fertilizer_recommend", {
        soil_type: soil,
        crop_type: crop,
      });

      const predictedFertilizer = response.data.recommended_fertilizer;
      const predictedRemark = response.data.remark;

      setFertilizer(predictedFertilizer);
      setRemark(predictedRemark);
    } catch (err) {
      console.error("Error fetching recommendation:", err);
      setError("Failed to fetch recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex p-5 items-center justify-center">
      <div className="flex flex-col rounded-3xl items-center justify-center">
        <TextGenerateEffect words={words} />
        <div className="flex flex-col gap-4 m-5 w-[25vw] items-center">
          <select
            value={soil}
            onChange={(e) => setSoil(e.target.value)}
            className="p-2 text-2xl border rounded bg-white text-green-800 w-[20vw] items-center text-center"
          >
            <option value="">Select Soil Type</option>
            {soilTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="p-2 text-2xl border rounded bg-white w-[20vw] text-center text-green-800"
          >
            <option value="">Select Crop Type</option>
            {cropTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleRecommendation}
          className="px-5 py-2 m-4 text-2xl bg-green-700 text-white rounded-lg hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Recommendation"}
        </button>

        {error && <p className="text-red-600 mt-3">{error}</p>}

        {fertilizer && (
          <div className="mt-6 p-5 border rounded-lg shadow-md w-96 bg-white text-center">
            <h3 className="text-xl font-bold mb-2">Recommended Fertilizer:</h3>
            <p className="text-2xl font-semibold text-green-700">
              {fertilizer}
            </p>

            {remark && (
              <div className="mt-4 text-left">
                <p className="text-gray-700">
                  <strong>Why:</strong> {remark}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FertilizerRecommendation;