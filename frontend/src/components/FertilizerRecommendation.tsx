import React, { useState } from "react";
import axios from "axios";
import BlurText from "./BlurText";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
 
const words = `Fertilizer Recommendation`;
const soilTypes = ["Sandy", "Loamy", "Black", "Red", "Clayey"];
const cropTypes = [
  "Maize",
  "Sugarcane",
  "Cotton",
  "Tobacco",
  "Paddy",
  "Barley",
  "Wheat",
  "Millets",
  "Oil seeds",
  "Pulses",
  "Ground Nuts",
];
const fertilizerInfo = {
  Urea: {
    description:
      "Urea is a nitrogen powerhouse! With 46% nitrogen, it's the go-to fertilizer for lush, green growth and faster plant development.",
    composition: "46-0-0",
    bestFor:
      "Boosting leafy crops like corn, wheat, and rice. Ideal during the vegetative stage to maximize growth.",
    applicationTips:
      "Apply evenly and mix with soil to prevent nitrogen loss. Avoid overuse to prevent soil acidification.",
    color: "white",
  },
  DAP: {
    description:
      "Diammonium Phosphate (DAP) is the secret to stronger roots and early plant development. It fuels crops with both nitrogen and phosphorus.",
    composition: "18-46-0",
    bestFor:
      "Perfect for seedlings and young plants needing a strong root system. Ideal for cereals, pulses, and vegetables.",
    applicationTips:
      "Use at the time of sowing for the best results. Avoid applying near the plant stem to prevent root burns.",
    color: "black",
  },
  "14-35-14": {
    description:
      "This high-phosphorus blend is excellent for flowering and fruiting crops, ensuring a high yield with balanced nutrients.",
    composition: "14-35-14",
    bestFor:
      "Fruiting plants like tomatoes, grapes, and melons. Also great for cereals and root crops.",
    applicationTips:
      "Apply before the flowering stage for the best fruit production. Combine with organic compost for added soil health.",
    color: "blue",
  },
  "28-28": {
    description:
      "A balanced nitrogen-phosphorus mix, perfect for strong stem growth and early flowering while preventing nutrient deficiency.",
    composition: "28-28-0",
    bestFor:
      "Ideal for fast-growing crops that need a boost before transitioning into the flowering phase.",
    applicationTips:
      "Apply during early growth stages to build strong, disease-resistant plants.",
    color: "green",
  },
  "17-17-17": {
    description:
      "The ultimate all-rounder! This perfectly balanced NPK fertilizer ensures steady growth, strong roots, and healthier yields.",
    composition: "17-17-17",
    bestFor:
      "Versatile choice for almost all crops, from vegetables to cereals. Great for long-term soil fertility.",
    applicationTips:
      "Apply moderately throughout the growth cycle for continuous nutrient supply. Water well after application for better absorption.",
    color: "red",
  },
  "20-20": {
    description:
      "A nitrogen-phosphorus boost, ensuring rapid leaf and root development, especially in potassium-rich soils.",
    composition: "20-20-0",
    bestFor:
      "Crops that thrive in potassium-rich soils, like legumes and leafy greens.",
    applicationTips:
      "Use during the early growth stages for better plant establishment.",
    color: "yellow",
  },
};

function FertilizerRecommendation() {
  const [soil, setSoil] = useState("");
  const [crop, setCrop] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [fertilizerDetails, setFertilizerDetails] = useState(null);
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
    setFertilizerDetails(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/fertilizer_recommend",
        {
          soil_type: soil,
          crop_type: crop,
        }
      );

      const predictedFertilizer = response.data.recommended_fertilizer;
      setFertilizer(predictedFertilizer);
      setFertilizerDetails(fertilizerInfo[predictedFertilizer] || null);
    } catch (err) {
      setError("Failed to fetch recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex p-5 items-center justify-center ">
      <div className="flex flex-col rounded-3xl items-center justify-center  " >
      <TextGenerateEffect words={words} />
        <div className="flex flex-col gap-4 m-5 w-[25vw] items-center ">
          <select
            value={soil}
            onChange={(e) => setSoil(e.target.value)}
            className="p-2 text-2xl border rounded bg-white text-green-800 w-[20vw] items-center text-center "
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
            className="p-2 text-2xl  border rounded bg-white w-[20vw] text-center text-green-800"
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

            {fertilizerDetails && (
              <div className="mt-4 text-left">
                <p>
                  <strong>Description:</strong> {fertilizerDetails.description}
                </p>
                <p>
                  <strong>Composition:</strong> {fertilizerDetails.composition}
                </p>
                <p>
                  <strong>Best For:</strong> {fertilizerDetails.bestFor}
                </p>
                <div
                  className="mt-2 w-10 h-10 mx-auto rounded-full border-2"
                  style={{ backgroundColor: fertilizerDetails.color }}
                ></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FertilizerRecommendation;
