import requests
import time
import json
from datetime import datetime

ESP32_IP = "http://192.168.42.66/data"

while True:
    try:
        response = requests.get(ESP32_IP)
        data = response.json()

        # Add a timestamp to the data
        data['timestamp'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Load existing data from file (if any)
        try:
            with open("weather_data.json", "r") as file:
                existing_data = json.load(file)
        except FileNotFoundError:
            existing_data = []

        # Append new data
        existing_data.append(data)

        # Save back to the JSON file
        with open("weather_data.json", "w") as file:
            json.dump(existing_data, file, indent=4)

        print(f"Data saved: {data}")

    except Exception as e:
        print("Error:", e)
    
    time.sleep(300)  # Fetch data every 5 minutes
