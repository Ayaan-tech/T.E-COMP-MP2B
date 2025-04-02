import subprocess

class DiseasePrevention:
    def __init__(self, model_name="hf.co/sikeaditya/AgriAssist_LLM"):
    
        self.model_name = model_name

    def get_prevention_plan(self, disease: str, temperature: float, humidity: float) -> str:
      
        prompt = f"""
        You are an agricultural expert.
        Current weather: Temperature {temperature}°C, Humidity {humidity}%
        Detected Disease: {disease}
        Suggest the best preventive measures according to current weather.
        """

        # Run the Ollama model with the generated prompt
        result = subprocess.run(
            ["ollama", "run", self.model_name],
            input=prompt,
            text=True,
            capture_output=True,
            encoding = 'utf-8'
        )

        # Extract the model response
        response = result.stdout.strip()
        return response

