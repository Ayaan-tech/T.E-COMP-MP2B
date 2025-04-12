import os
import joblib
import lzma
import json

class CropRecommender:
    def __init__(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(base_dir, "crop_model.jbl.lzma")
        self.model = self.load_model(model_path)

    def load_model(self, path):
        with lzma.open(path, "rb") as f:
            return joblib.load(f)

    def get_sensor_data(self):
        json_path ="../frontend/weather_data.json"
        with open(json_path, "r") as file:
            data = json.load(file)
            return data[0] 

    def predict(self, data):
        sensor = self.get_sensor_data()
        temperature = sensor["temperature"]
        humidity = sensor["humidity"]

        features = [[
            data["N"],
            data["P"],
            data["K"],
            temperature,
            humidity,
            data["ph"],
            data["rainfall"]
        ]]

        prediction = self.model.predict(features)[0]
        return {
            "recommended_crop": prediction
        }
