#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <DHT.h>

// WiFi credentials
const char *ssid = "Momoko Chan";
const char *password = "wzvr1544";

// const char *ssid = "Ayan Shaikh_EXT";
// const char *password = "KGN@7866";

// DHT11 setup
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Soil Moisture Sensor pin
#define SOIL_MOISTURE_PIN 32

AsyncWebServer server(80);

void setup()
{
    Serial.begin(115200);

    // Connect to WiFi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nConnected! IP Address: " + WiFi.localIP().toString());

    // Initialize DHT sensor
    dht.begin();

    // Web server route
    server.on("/data", HTTP_GET, [](AsyncWebServerRequest *request)
              {
        float temperature = dht.readTemperature();
        float humidity = dht.readHumidity();
        delay(50);
        int soilMoistureValue = analogRead(SOIL_MOISTURE_PIN); // Read soil moisture sensor

        Serial.println("Soil Moisture (web): " + String(soilMoistureValue));

        // JSON response
        String json = "{";
        json += "\"temperature\": " + String(temperature, 2) + ",";
        json += "\"humidity\": " + String(humidity, 2) + ",";
        json += "\"soil_moisture\": " + String(soilMoistureValue);
        json += "}";

        request->send(200, "application/json", json); });

    server.begin();
}

void loop()
{
    // Nothing needed here, handled via web server
}
