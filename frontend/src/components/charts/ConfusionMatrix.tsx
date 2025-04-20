"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Actual class names from the pest detection model
const classNames = [
  "Cashew anthracnose",
  "Cashew gumosis",
  "Cashew healthy",
  "Cashew leaf miner",
  "Cashew red rust",
  "Cassava bacterial blight",
  "Cassava brown spot",
  "Cassava green mite",
  "Cassava healthy",
  "Cassava mosaic",
  "Maize fall armyworm",
  "Maize grasshoper",
  "Maize healthy",
  "Maize leaf beetle",
  "Maize leaf blight",
  "Maize leaf spot",
  "Maize streak virus",
  "Tomato healthy",
  "Tomato leaf blight",
  "Tomato leaf curl",
  "Tomato septoria leaf spot",
  "Tomato verticulium wilt",
]

// Actual confusion matrix data that matches the image
const actualMatrixData = [
  [14, 0, 6, 10, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 33, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 29, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 2, 0, 0, 0, 0, 0, 0, 1, 29, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 0, 0, 2, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 24, 9, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 34, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 8, 31, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 1, 4, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 25, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 30, 2],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 10, 19],
]

const getCropData = (crop, allClasses, fullMatrix) => {
  if (crop === "all") return { classes: allClasses, matrix: fullMatrix }
  
  const indices = []
  const filteredClasses = []
  
  allClasses.forEach((className, index) => {
    if (className.toLowerCase().includes(crop.toLowerCase())) {
      indices.push(index)
      filteredClasses.push(className)
    }
  })
  
  const filteredMatrix = indices.map(i => 
    indices.map(j => fullMatrix[i][j])
  )
  
  return { classes: filteredClasses, matrix: filteredMatrix }
}

const ConfusionMatrix = () => {
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [matrix, setMatrix] = useState([])
  const [displayClasses, setDisplayClasses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [maxValue, setMaxValue] = useState(39) // Initial max value from the actual data

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Get data for the selected crop
        const { classes, matrix } = getCropData(selectedCrop, classNames, actualMatrixData)
        setDisplayClasses(classes)
        setMatrix(matrix)
        
        // Calculate max value for color scaling
        const newMaxValue = Math.max(...matrix.map(row => Math.max(...row)))
        setMaxValue(newMaxValue)
      } catch (error) {
        console.error("Failed to process confusion matrix data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [selectedCrop])

  // Function to get a color based on the value (blue scale like in the image)
  const getColor = (value) => {
    if (value === 0) return "rgb(255, 255, 255)" // White for zero values
    
    // Calculate blue intensity - from white to dark blue
    const intensity = Math.max(0, Math.min(1, value / maxValue))
    const blue = Math.floor(255 - (intensity * 155)) // Darker blue for higher values
    const red = Math.floor(255 - (intensity * 255))
    const green = Math.floor(255 - (intensity * 255))
    
    return `rgb(${red}, ${green}, ${blue})`
  }

  // Function to determine text color based on background
  const getTextColor = (value) => {
    return value > maxValue * 0.5 ? "white" : "black"
  }

  return (
    <Card className="w-full ">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Confusion Matrix</CardTitle>
          <CardDescription>Visualization of model prediction accuracy across classes</CardDescription>
        </div>
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select crop" />
          </SelectTrigger>
          <SelectContent className="w-[180px] cursor-pointer ">
            <SelectItem value="all">All Crops</SelectItem>
            <SelectItem value="cashew">Cashew</SelectItem>
            <SelectItem value="cassava">Cassava</SelectItem>
            <SelectItem value="maize">Maize</SelectItem>
            <SelectItem value="tomato">Tomato</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[400px] items-center justify-center">Loading confusion matrix...</div>
        ) : (
          <div className="overflow-auto ">
            <div className="min-w-[600px]">
              {/* Matrix title */}
              <div className="text-center font-semibold text-2xl mb-4 hover:text-muted-foreground">Confusion Matrix</div>
              
              {/* Column headers */}
              <div className="flex">
                <div className="w-48 flex-shrink-0"></div> {/* Empty space for row labels */}
                <div className="flex flex-1">
                
                </div>
              </div>

              {/* Y-axis label */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 transform -rotate-90 text-sm font-medium">
                True label
              </div>

              {/* Matrix rows */}
              <div className="flex flex-col gap-1 ">
                {matrix.map((row, i) => (
                  <div key={`row-${i}`} className="flex items-center bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white shadow-lg">
                    <div 
                      className="w-48 px-2 py-1 text-xl font-medium truncate text-right flex-shrink-0" 
                      title={displayClasses[i]}
                    >
                      {displayClasses[i]}
                    </div>
                    <div className="flex flex-1">
                      {row.map((value, j) => (
                        <div
                          key={`cell-${i}-${j}`}
                          className="flex-1 aspect-square flex items-center justify-center text-xs font-medium border border-gray-200"
                          style={{
                            backgroundColor: getColor(value),
                            color: getTextColor(value),
                            minWidth: "24px",
                            minHeight: "24px"
                          }}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend/colorbar */}
              <div className="mt-8 flex items-center justify-center gap-2">
                <div className="h-4 w-4" style={{ backgroundColor: "rgb(255, 255, 255)" }}></div>
                <span className="text-xs">0</span>
                <div className="h-4 w-32 bg-gradient-to-r from-[rgb(255,255,255)] to-[rgb(0,0,100)]"></div>
                <div className="h-4 w-4" style={{ backgroundColor: "rgb(0, 0, 100)" }}></div>
                <span className="text-xs">{maxValue}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
export default ConfusionMatrix