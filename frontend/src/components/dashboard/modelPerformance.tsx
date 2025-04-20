"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {  ChartContainer } from "@/components/ui/chart"
// import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import React from 'react'
import Component from "../charts/AreaChart"
import RecallBarChart from "../charts/BarChart"
import CombinedMetricsChart from "../charts/ResnetChart"
import SensorChart from "../charts/SensorChart"
import ConfusionMatrix from "../charts/ConfusionMatrix"

const ModelPerformance = () => {
  // State to manage the selected model
  const [selectedModel, setSelectedModel] = useState("resnet")
  


  const renderTabs = () => {
    switch (selectedModel) {
       case "resnet":
        return (
          <Tabs key={`tabs-${selectedModel}`} defaultValue="Batch Accuracy vs Batch Loss">
            
            <TabsList className="mb-4 bg-zinc-800 border border-zinc-700">
              <TabsTrigger value="Batch Accuracy vs Batch Loss" className="data-[state=active]:bg-zinc-700 text-zinc-300"> Accuracy vs Loss</TabsTrigger>
              <TabsTrigger value="Confusion Matrix" className="data-[state=active]:bg-zinc-700 text-zinc-300"> Confusion Matrix</TabsTrigger>
            </TabsList>

            <TabsContent value="Batch Accuracy vs Batch Loss" className="h-[350px]">
              <Card className="bg-zinc-900 border border-zinc-800 shadow-md">
                <CardContent className="flex flex-row gap-4 justify-between items-center pt-6 overflow-hidden">
                <CombinedMetricsChart/>
                  {/* <img src="src/assets/precision.jpg" alt="Fertilizer Recommendation Precision" className="max-h-full object-contain" /> */}
                </CardContent>
              </Card>
             
            </TabsContent>
            <TabsContent value="Confusion Matrix" className="h-[350px]">
              <Card className="bg-zinc-900 border border-zinc-800 shadow-md">
                <CardContent className="flex flex-row gap-4 justify-between items-center pt-6 overflow-hidden">
                <ConfusionMatrix/>
                  {/* <img src="src/assets/precision.jpg" alt="Fertilizer Recommendation Precision" className="max-h-full object-contain" /> */}
                </CardContent>
              </Card>
             
            </TabsContent>
          </Tabs>
        )
      
      case "fertilizer":
        return (
          <Tabs key={`tabs-${selectedModel}`} defaultValue="precision">
            <TabsList className="mb-4 bg-zinc-800 border border-zinc-700">
              <TabsTrigger value="precision" className="data-[state=active]:bg-zinc-700 text-zinc-300 " >Precision</TabsTrigger>
              <TabsTrigger value="heatmap" className="data-[state=active]:bg-zinc-700 text-zinc-300">Heatmap</TabsTrigger>
              <TabsTrigger value="sensordata" className="data-[state=active]:bg-zinc-700 text-zinc-300">Sensor-Data</TabsTrigger>
            </TabsList>
            <TabsContent value="precision" className="h-[350px]">
              <Card className="bg-zinc-900 border border-zinc-800 shadow-md">
                <CardContent className="flex flex-row gap-4 justify-between items-center pt-6 overflow-hidden">
                <Component />
                <RecallBarChart />
                  {/* <img src="src/assets/precision.jpg" alt="Fertilizer Recommendation Precision" className="max-h-full object-contain" /> */}
                </CardContent>
              </Card>
             
            </TabsContent>
      
            <TabsContent value="heatmap" className="h-[350px]">
              <Card className="bg-zinc-900 border border-zinc-800 shadow-md">
                <CardContent className="flex flex-col gap-4 justify-between items-center pt-6">
                  <img src="src/assets/heatmap.jpg"  alt="Fertilizer Recommendation Heatmap" className="max-h-full object-contain" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sensordata" className="h-[350px]">
              <Card className="bg-zinc-900 border border-zinc-800 shadow-md">
              <CardContent className="flex flex-row gap-4 justify-between items-center pt-6 overflow-hidden">
             <SensorChart/>
             <RecallBarChart />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )
      
      case "crop":
        return (
          <Tabs key={`tabs-${selectedModel}`} defaultValue="metrics">
            <TabsList className="mb-4 bg-zinc-800 border border-zinc-700">
              <TabsTrigger value="metrics" className="data-[state=active]:bg-zinc-700 text-zinc-300">Metrics</TabsTrigger>
            </TabsList>
            <TabsContent value="metrics" className="h-[350px]">
              <Card className="bg-zinc-900 border border-zinc-800 shadow-md h-full">
                <CardContent className="flex flex-row gap-4 justify-between items-center pt-6">
                  <img src="src/assets/MetricsOnData.jpg" alt="Metrics" className="w-1/2 object-contain h-full" />
                  <img src="src/assets/MetricsOnSoil.jpg" alt="Testing" className="w-1/2 h-full object-contain"/>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )
        
      default:
        return null;
    }
  }

  return (
    <div className="mt-6">
      <Card className="bg-black text-white border border-zinc-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-zinc-100">Model Performance</CardTitle>
          <CardDescription className="text-zinc-400">Select a model to view its performance metrics.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Select onValueChange={setSelectedModel} defaultValue="resnet">
              <SelectTrigger className="bg-zinc-900 border-zinc-700 text-zinc-300 focus:ring-zinc-600">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-zinc-300">
                <SelectItem value="resnet" className="focus:bg-zinc-800 focus:text-white">ResNet</SelectItem>
                <SelectItem value="fertilizer" className="focus:bg-zinc-800 focus:text-white">Fertilizer</SelectItem>
                <SelectItem value="crop" className="focus:bg-zinc-800 focus:text-white">Crop</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {renderTabs()}
        </CardContent>
      </Card>
    </div>
  )
}

export default ModelPerformance