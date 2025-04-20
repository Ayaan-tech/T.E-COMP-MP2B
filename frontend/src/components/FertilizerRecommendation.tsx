import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const words = `Fertilizer Recommendation`;
const soilTypes = ['Loamy Soil', 'Peaty Soil', 'Acidic Soil', 'Neutral Soil', 'Alkaline Soil'];

const soilMapping = {
  'Loamy Soil': 'Wheat',
  'Peaty Soil': 'Coffee',
  'Acidic Soil': 'Tea',
  'Neutral Soil': 'Maize',
  'Alkaline Soil': 'Sugarcane'
};

const fertilizerProducts = {
  "water-retaining": [
    {
      name: "Acuro MAGIC HYDROGEL for Agriculture (1 kg, Pack of 3)",
      price: "₹599",
      imageUrl: "/src/assets/MagicHydrogel.jpg",
      link: "https://www.amazon.in/MAGIC-HYDROGEL-AGRICULTURE-Kg-Pack/dp/B07NL3CJM6"
    },
    {
      name: "CERO® WATER RETAIN Gel for Potted Plants (499 g)",
      price: "₹289",
      imageUrl: "/src/assets/Cero.jpg",
      link: "https://www.amazon.in/MAGIC-HYDROGEL-AGRICULTURE-500gm/dp/B07HY49158"
    },
    {
      name: "Kisanmart Hydrogel for Plants (250 g)",
      price: "₹3798",
      imageUrl: "/src/assets/HydroGel.jpg",
      link: "https://www.amazon.in/Kisanmart-Hydrogel-Draught-10-KG/dp/B0CYT8L5LS"
    }
  ],
  "DAP": [
    {
      name: "DAP Fertilizer NPK 18-46-0 -2Kg",
      price: "₹312",
      imageUrl: "/src/assets/IFCODAP.jpg",
      link: "https://www.amazon.in/Fertilizer-Diammonium-Phosphate-Fast-Acting-Water-Soluble/dp/B0F27S29YV"
    },
    {
      name: "BEST MILEGA Dap Fertilizers For Plants 1KG",
      price: "₹148",
      imageUrl: "/src/assets/BestMilega.jpg",
      link: "https://www.amazon.in/BEST-MILEGA-Fertilizers-Fertilizer-Gardening/dp/B0CBQ61MY6"
    },
    {
      name: "Unitedlys Dap Fertilizer for Plants Home Garden 880GM",
      price: "₹236",
      imageUrl: "/src/assets/UnitedlysDap.jpg",
      link: "https://www.amazon.in/Unitedlys-Fertilizer-Plants-Purpose-Gardening/dp/B0DPKZFTN7"
    }
  ],
  "Gypsum": [
    {
      name: "Agricare Sulpha Cal 30kg Natural Gypsum containing Ca, S, Mg & P",
      price: "₹1596",
      imageUrl: "/src/assets/SulphaCal.jpg",
      link: "https://www.moglix.com/agricare-sulpha-cal-30kg-natural-gypsum-containing-ca-s-mg-p/mp/msnm9xyo4oedkj"
    },
    {
      name: "IFFCO Urban Gardens - Gypsum Meal - 900gm - Organic Calcium Sulphate Fertilizer",
      price: "₹199",
      imageUrl: "/src/assets/IFCO_GARDEN.jpg",
      link: "https://www.amazon.in/IFFCO-Urban-Gardens-Fertilizer-Conditioner/dp/B0CKBVWLVC"
    },
    {
      name: "Divine Tree Gypsum Powder for Plant Calcium Sulfate Fertilizer (1 kg)",
      price: "₹499",
      imageUrl: "/src/assets/GypSum.jpg",
      link: "https://www.amazon.in/Divine-Gypsum-Calcium-Sulfate-Conditioner/dp/B07BHPX6H8"
    }
  ],
};

const fertilizerTypeMap = {
  "water-retaining fertilizer": "water-retaining",
  "dap": "DAP",
  "gypsum": "Gypsum"
};

function FertilizerRecommendation() {
  const [soil, setSoil] = useState("");
  const [crop, setCrop] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [fertilizerType, setFertilizerType] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (soil) {
      const recommendedCrop = soilMapping[soil];
      if (recommendedCrop) {
        setCrop(recommendedCrop);
      } else {
        setCrop("");
      }
    } else {
      setCrop("");
    }
  }, [soil]);

  useEffect(() => {
    if (fertilizer) {
      const lowerCaseFertilizer = fertilizer.toLowerCase();
      let matchedType = "water-retaining"; // Default type
      for (const [key, value] of Object.entries(fertilizerTypeMap)) {
        if (lowerCaseFertilizer.includes(key)) {
          matchedType = value;
          break;
        }
      }
      setFertilizerType(matchedType);
      setRecommendations(fertilizerProducts[matchedType] || []);
    }
  }, [fertilizer]);

  const handleRecommendation = async () => {
    if (!soil) {
      setError("Please select soil Type:");
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
    <div className="flex flex-col p-5 items-center justify-center">
      <div className="flex flex-col rounded-3xl items-center justify-center max-w-6xl w-full">
        <div className="mb-8">
          <TextGenerateEffect words={words} />
        </div>
        
        <div className="flex flex-col gap-4 mb-8 w-full max-w-md items-center">
          <select
            value={soil}
            onChange={(e) => setSoil(e.target.value)}
            className="p-3 text-xl border-2 border-green-300 rounded-lg bg-white text-green-800 w-[80%] transition-all focus:ring-2 focus:ring-green-400 focus:border-green-500 focus:outline-none text-center"
          >
            <option value="">Select Soil Type</option>
            {soilTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {soil && (
            <div className="p-3 text-xl border-2 border-green-200 rounded-lg bg-gradient-to-r from-green-50 to-green-100 w-[80%] text-center text-green-800 font-semibold shadow-sm">
              {crop}
            </div>
          )}
        </div>

        <button
          onClick={handleRecommendation}
          className="px-8 py-3 mb-8 text-xl bg-gradient-to-r w-[30%] from-green-600 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={loading || !soil}
        >
          {loading ? (
            <span className="inline-flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          ) : (
            "Get Recommendation"
          )}
        </button>

        {error && <p className="text-red-600 mt-1 mb-6 text-center font-medium">{error}</p>}

        {fertilizer && (
          <div className="mb-10 p-6 border border-green-200 rounded-xl shadow-lg w-full max-w-md bg-white text-center transform transition-all duration-500 hover:shadow-xl">
            <h3 className="text-xl font-bold mb-3 text-green-800">Recommended Fertilizer:</h3>
            <p className="text-2xl font-semibold text-green-600 mb-4">
              {fertilizer}
            </p>

            {remark && (
              <div className="mt-4 text-left p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="text-gray-700">
                  <span className="font-bold text-green-700">Why:</span> {remark}
                </p>
              </div>
            )}
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="w-full mb-12">
            <Card className="w-full bg-gradient-to-b from-white to-green-50 shadow-xl rounded-2xl overflow-hidden border border-green-100">
              <CardHeader className="text-center pb-2 border-b border-green-100">
                <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500">Recommended Products</CardTitle>
                <CardDescription className="text-gray-600 text-lg">Search from our variable products</CardDescription>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendations.map((product, index) => (
                    <div key={index} className="group relative h-full">
                      <div className="h-full overflow-hidden rounded-xl border border-green-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 hover:border-green-300">
                        <a href={product.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                          <div className="flex flex-col h-full">
                            <div className="relative h-48 overflow-hidden">
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-fit transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            <div className="p-5 flex flex-col flex-grow">
                              <h4 className="font-bold text-lg mb-3 line-clamp-2 text-gray-800 group-hover:text-green-700 transition-colors">{product.name}</h4>
                              
                              <div className="mt-auto pt-4 flex justify-between items-center">
                                <span className="text-green-600 font-bold text-xl">{product.price}</span>
                                <Button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md transform group-hover:scale-105">
                                  Buy Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
             
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default FertilizerRecommendation;