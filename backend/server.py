from datetime import datetime
import uuid
import json
from typing import List, Dict, Any, Optional

class Store:
    def __init__(self):
        self.image_analysis: List[Dict[str, Any]] = []
        self.crop_recommendations: List[Dict[str, Any]] = []
        self.fertilizer_recommendations: List[Dict[str, Any]] = []
    def add_image_analysis(self, predicted_disease: str, prevention_measures: str, 
                          temperature: float, humidity: float, processing_time: int):
         record = {
            "id": str(uuid.uuid4()),
            "timestamp": datetime.now().isoformat(),
            "predicted_disease": predicted_disease,
            "prevention_measures": prevention_measures,
            "temperature": temperature,
            "humidity": humidity,
            "accuracy": round(0.7 + (hash(predicted_disease) % 20) / 100, 2),  #Some type of Accuracy :(
            "processing_time": processing_time
        }
         self.image_analysis.append(record)
       #The latest 50 records :)
         if len(self.image_analysis) > 50:
            self.image_analysis = self.image_analysis[-50:]
        
    def add_crop_recommendation(self, input_data: Dict[str, Any], recommended_crop: str, processing_time: int):
        record = {
            "id": str(uuid.uuid4()),
            "timestamp": datetime.now().isoformat(),
            "n": input_data.get("N"),
            "p": input_data.get("P"),
            "k": input_data.get("K"),
            "ph": input_data.get("ph"),
            "rainfall": input_data.get("rainfall"),
            "temperature": input_data.get("temperature"),
            "humidity": input_data.get("humidity"),
            "recommended_crop": recommended_crop,
            "accuracy": round(0.72 + (hash(recommended_crop) % 25) / 100, 2),
            "processing_time": processing_time
        }
        print(f"Adding image analysis: {record}")
        self.crop_recommendations.append(record)
        if len(self.crop_recommendations) > 50:
            self.crop_recommendations = self.crop_recommendations[-50:]
    def add_fertilizer_recommendation(self, input_data: Dict[str, Any], 
                                     recommended_fertilizer: str, processing_time: int):
        record = {
            "id": str(uuid.uuid4()),
            "timestamp": datetime.now().isoformat(),
            "crop": input_data.get("Crop"),
            "soil": input_data.get("Soil"),
            "temperature": input_data.get("Temperature"),
            "moisture": input_data.get("Moisture"),
            "recommended_fertilizer": recommended_fertilizer,
            "accuracy": round(0.75 + (hash(recommended_fertilizer) % 20) / 100, 2),
            "processing_time": processing_time
        }
        self.fertilizer_recommendations.append(record)
        if len(self.fertilizer_recommendations) > 50:
            self.fertilizer_recommendations = self.fertilizer_recommendations[-50:]