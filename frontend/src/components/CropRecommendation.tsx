import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import {z} from "zod";
import valueSchema from "@/lib/zod";
const words = `Crop Recommendation`;

function CropRecommendation() {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    pH: "",
    rainfall: "",
  });
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [recommendedCrop, setRecommendedCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.get("/weather_data.json");
        const latest = response.data[0];
        setTemperature(latest.temperature);
        setHumidity(latest.humidity);
      } catch (err) {
        console.error("Error fetching sensor data:", err);
        setError("Failed to fetch sensor data.");
      }
    };
    fetchSensorData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRecommendCrop = async () => {
    try {
    const validatedData = valueSchema.safeParse({
      N: Number(formData.N),
      P: Number(formData.P),
      K: Number(formData.K),
      pH: Number(formData.pH),
      rainfall: Number(formData.rainfall),
    });
    console.log(validatedData);
    
    if (temperature == null || humidity == null) {
      setError("Sensor data is not available. Please try again later.");
      return;
    }
    setLoading(true);
    setError("");
    setRecommendedCrop("");

    
      const response = await axios.post("http://127.0.0.1:8000/crop_recommend", {
        N: validatedData.data.N,
        P: validatedData.data.P,
        K: validatedData.data.K,
        temperature,
        humidity,
        ph: validatedData.data.pH,
        rainfall: validatedData.data.rainfall,
      });

      setRecommendedCrop(response.data.recommended_crop);
    } catch (error) {
     console.error("Error recommending crop:", error);
     setError(error.response?.data?.error || "An error occurred while recommending the crop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex p-5 items-center justify-center">
      <div className="flex flex-col rounded-3xl items-center justify-center">
        <TextGenerateEffect words={words} />
        <div className="flex flex-col gap-4 m-5 w-[25vw] items-center">
          {["N", "P", "K", "pH", "rainfall"].map((field) => (
            <input
              key={field}
              type="number"
              name={field}
              placeholder={field}
              value={formData[field]}
              onChange={handleChange}
              className="p-2 text-2xl border rounded bg-white text-green-800 w-[20vw] text-center"
            />
          ))}
          <div className="text-green-800 text-center text-xl mt-2">
            <p>Real-time Temperature Recorded as :  {temperature ?? "Loading..."}</p>
            <p>Real-time Humidity Recorded as :  {humidity ?? "Loading..."}</p>
          </div>
        </div>

        <button
          onClick={handleRecommendCrop}
          className="px-5 py-2 m-4 text-2xl bg-green-700 text-white rounded-lg hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Recommend Crop"}
        </button>


        {error && (
          <div className="mt-4 p-4 border border-red-600 rounded-lg bg-red-100 text-red-800 text-center">
            {error}
          </div>
        )}

        {recommendedCrop && (
          <div className="mt-6 p-5 border rounded-lg shadow-md w-96 bg-white text-center">
            <h3 className="text-xl font-bold mb-2">Recommended Crop:</h3>
            <p className="text-2xl font-semibold text-green-700">
              {recommendedCrop}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropRecommendation;
