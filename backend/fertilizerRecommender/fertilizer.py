import os
import joblib
import pandas as pd

class FertilizerRecommender:
    def __init__(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(base_dir, "fertilizer_remark_model.pkl")
        self.model = joblib.load(model_path)

    def predict(self, data):
        df = pd.DataFrame([data])
        print(f"Data: {df}")

        prediction = self.model.predict(df)
        print(f"Prediction: {prediction} | Type: {type(prediction)}")

        if isinstance(prediction[0], str) and ':' in prediction[0]:
            parts = prediction[0].split(':', 1)
            return {
                "recommended_fertilizer": parts[0].strip(),
                "remark": parts[1].strip()
            }

        return {
            "recommended_fertilizer": prediction[0][0],
            "remark": prediction[0][1]
         }
# fert = FertilizerRecommender()
# input_data = {
#             "Temperature": 50,
#             "Moisture": 22,
#             "Soil": 'rice',
#             "Crop": 'Acid Soil',
#         }
# print(f"Output: {fert.predict(input_data)}")
