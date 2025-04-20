from fastapi import FastAPI, File, UploadFile, HTTPException
import shutil
import os
from typing import List, Dict, Any, Optional
from diseasePrevention.prevent import DiseasePrevention
from pestDetection.detect import PestDetectionModel
from fertilizerRecommender.fertilizer import FertilizerRecommender
from cropRecommender.crop_recommender import CropRecommender
from fastapi import Form
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from server import Store
from fastapi.responses import JSONResponse
import uvicorn
from datetime import datetime as dateTime
import uuid
import json
import pandas as pd


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class InputData(BaseModel):
    input_values: List[float]

class CropInput(BaseModel):
    N: float
    P: float
    K: float
    ph: float
    rainfall: float

class FertilizerInput(BaseModel):
    crop_type: str
    soil_type: str
    
base_dir = os.path.dirname(os.path.abspath(__file__))  

pest_detector = PestDetectionModel(os.path.join(base_dir, "pestDetection/resnet_finetuned.pth"))
disease_prevention = DiseasePrevention()
fertilizer = FertilizerRecommender()
recommender = CropRecommender()
prediction_store = Store()

os.makedirs("temp", exist_ok=True)

global_weather_data = {"temperature": None, "humidity": None}


@app.post("/analyze_image")
async def analyze_image(
    image: UploadFile = File(...),
    temperature: float = Form(...),
    humidity: float = Form(...)
):
    """Detects pest/disease from the image and uses provided weather data for prevention measures."""
    global global_weather_data
    global_weather_data["temperature"] = temperature
    global_weather_data["humidity"] = humidity
 
    image_path = f"temp/{image.filename}"
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    start_time = dateTime.now()
    
    try:
        predicted_class = pest_detector.predict(image_path)
        print(f"Current Temperature: {temperature}")
        print(f"Current Humidity: {humidity}")
    
        response = disease_prevention.get_prevention_plan(
            predicted_class, temperature, humidity
        )
        processing_time = int((dateTime.now() - start_time).total_seconds() * 1000) 
        prediction_store.add_image_analysis(
            predicted_disease=predicted_class,
            prevention_measures=response,
            temperature=temperature,
            humidity=humidity,
            processing_time=processing_time
        )

        os.remove(image_path)
        return {"predicted_disease": predicted_class, "prevention_measures": response}
    except Exception as e:
        os.remove(image_path)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/fertilizer_recommend")
def predict_fertilizer(data: FertilizerInput):
    start_time = dateTime.now()
    try:
        weather_path = os.path.join(base_dir, "../frontend/weather_data.json")
        print(f"Reading weather data from: {weather_path}")
        
        with open(weather_path, "r") as f:
            sensor_data = json.load(f)
            sensor_data = sensor_data[0]
            print(f"Loaded sensor data: {sensor_data}")

        input_data = {
            "Temperature": sensor_data["temperature"],
            "Moisture": sensor_data["soil_moisture"],
            "Soil": data.soil_type,
            "Crop": data.crop_type,
        }
        
        print("Input to model:", input_data)
        result = fertilizer.predict(input_data)
        print("Fertilizer prediction result:", result)
        processing_time = int((dateTime.now() - start_time).total_seconds() * 1000)
        prediction_store.add_fertilizer_recommendation(
            input_data=input_data,
            recommended_fertilizer=result["recommended_fertilizer"],
            processing_time=processing_time
        )
        return result
    except Exception as e:
        print(f"ERROR in /fertilizer_recommend: {e}")
        import traceback
        traceback.print_exc()  # Print full stack trace for debugging
        return {"error": str(e)}
@app.post("/crop_recommend")
def recommend_crop(input: CropInput):
    start_time = dateTime.now()
    try:
        prediction = recommender.predict(input.model_dump())
        processing_time = int((dateTime.now() - start_time).total_seconds() * 1000)
        prediction_store.add_crop_recommendation(
            input_data=input.model_dump(),
            recommended_crop=prediction["recommended_crop"],
            processing_time=processing_time
        )
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
@app.get("/model_history/image")
def get_image_analysis_history():
    """Returns history of image analysis predictions"""
    return getattr(prediction_store, "image_analysis", [])
@app.get("/model_history/crop")
def get_crop_recommendation_history():
    """Returns history of crop recommendation predictions"""
    return getattr(prediction_store, "crop_recommendations", [])

@app.get("/model_history/fertilizer")
def get_fertilizer_recommendation_history():
    """Returns history of fertilizer recommendation predictions"""
    return getattr(prediction_store, "fertilizer_recommendations", [])
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
