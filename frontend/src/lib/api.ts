

export const fetchModelHistory = async () => {
  try {
  
    const responses = await Promise.all([
      fetch("http://127.0.0.1:8000/model_history/image").then(res => res.ok ? res.json() : []),
      fetch("http://127.0.0.1:8000/model_history/crop").then(res => res.ok ? res.json() : []),
      fetch("http://127.0.0.1:8000/model_history/fertilizer").then(res => res.ok ? res.json() : [])
    ]);

    const [imageResults, cropResults, fertilizerResults] = responses.map(
      result => Array.isArray(result) ? result : []
    );
    console.log("All results fetched:", {
      imageResults: Array.isArray(imageResults) ? imageResults.length : 'not an array',
      cropResults: Array.isArray(cropResults) ? cropResults.length : 'not an array',
      fertilizerResults: Array.isArray(fertilizerResults) ? fertilizerResults.length : 'not an array'
    });

    console.log("Image results:", imageResults);
    console.log("Crop results:", cropResults);
    console.log("Fertilizer results:", fertilizerResults);

    const allRecords = [
      ...(Array.isArray(imageResults) ? imageResults : []).map(record => ({
        id: record.id || `img-${Math.random()}`,
        timestamp: record.timestamp || new Date().toISOString(),
        modelName: "ResNet (Pest Detection)",
        input: `Image analysis (Temp: ${record.temperature || 'N/A'}°C, Humidity: ${record.humidity || 'N/A'}%)`,
        response: `${record.predicted_disease || 'Unknown'}: ${record.prevention_measures || 'No data'}`,
        accuracy: record.accuracy || 0,
        processingTime: record.processing_time || 0,
      })),
      ...(Array.isArray(cropResults) ? cropResults : []).map(record => ({
        id: record.id || `crop-${Math.random()}`,
        timestamp: record.timestamp || new Date().toISOString(),
        modelName: "Crop Recommender",
        input: `N:${record.n || 'N/A'}, P:${record.p || 'N/A'}, K:${record.k || 'N/A'}, pH:${record.ph || 'N/A'}, Rainfall:${record.rainfall || 'N/A'}${
          record.temperature ? `, Temp:${record.temperature}°C` : ""
        }${record.humidity ? `, Humidity:${record.humidity}%` : ""}`,
        response: record.recommended_crop || 'No recommendation',
        accuracy: record.accuracy || 0,
        processingTime: record.processing_time || 0,
      })),
      ...(Array.isArray(fertilizerResults) ? fertilizerResults : []).map(record => ({
        id: record.id || `fert-${Math.random()}`,
        timestamp: record.timestamp || new Date().toISOString(),
        modelName: "Fertilizer Recommender",
        input: `Crop:${record.crop || 'N/A'}, Soil:${record.soil || 'N/A'}, Temp:${record.temperature || 'N/A'}°C, Moisture:${record.moisture || 'N/A'}%`,
        response: record.recommended_fertilizer || 'No recommendation',
        accuracy: record.accuracy || 0,
        processingTime: record.processing_time || 0,
      }))
    ];

    return allRecords.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error("Failed to fetch model history:", error);
    return []; 
  }
}
