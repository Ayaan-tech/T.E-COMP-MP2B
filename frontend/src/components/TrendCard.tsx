import React from 'react';
import { LocationOn } from '@mui/icons-material';
import "../styles/TrendsCard.css";
import { MapPin, TrendingUp, TrendingDown, Banknote } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

function TrendsCard(props) {
    const { state, district, commodity, minPrice, maxPrice, modalPrice } = props;

    const isModalPriceCloseToMax = modalPrice >= maxPrice * 0.9; // Adjust the threshold as needed

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg w-[20vw] ">
      <CardHeader className="p-0">
        <div className="bg-gradient-to-r from-blue-500 to-green-600 p-4">
          <h2 className="text-xl font-bold text-white text-center truncate">{commodity}</h2>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="h-4 w-4" />
          <p className="text-sm font-medium">
            {district}, {state}
          </p>
        </div>

        {/* Price Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Min Price */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Min Price</p>
            <p className="text-lg font-semibold">₹{minPrice}</p>
          </div>

          {/* Max Price */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Max Price</p>
            <p className="text-lg font-semibold">₹{maxPrice}</p>
          </div>
        </div>

        {/* Modal Price - Highlighted */}
        <div
          className={`mt-4 p-3 rounded-lg flex items-center justify-between ${
            isModalPriceCloseToMax
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            <div>
              <p className="text-xs font-medium opacity-80">Modal Price</p>
              <p className="text-xl font-bold">₹{modalPrice}</p>
            </div>
          </div>

          <div className="flex items-center">
            {isModalPriceCloseToMax ? (
              <TrendingUp className="h-6 w-6 text-green-600" />
            ) : (
              <TrendingDown className="h-6 w-6 text-red-600" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
    );
}

export default TrendsCard;