"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {  ChartContainer } from "@/components/ui/chart"
// import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import React from 'react'

const ModelPerformance = () => {
  // State to track selected model
  const [selectedModel, setSelectedModel] = useState("resnet")
  
  // Sample data - you would replace this with your actual data
  // const performanceData = [
  //   { date: "2025-04-01", resnetAccuracy: 0.92, resnetLoss: 0.08, cropAccuracy: 0.89, fertPrecision: 0.85, fertRecall: 0.83 },
  //   { date: "2025-04-05", resnetAccuracy: 0.93, resnetLoss: 0.07, cropAccuracy: 0.90, fertPrecision: 0.87, fertRecall: 0.84 },
  //   { date: "2025-04-10", resnetAccuracy: 0.94, resnetLoss: 0.06, cropAccuracy: 0.91, fertPrecision: 0.88, fertRecall: 0.86 },
  //   { date: "2025-04-15", resnetAccuracy: 0.95, resnetLoss: 0.05, cropAccuracy: 0.92, fertPrecision: 0.89, fertRecall: 0.87 },
  // ]

  

  const heatmapImage = "src/assets/heatmap.jpg" 

  const renderTabs = () => {
    switch (selectedModel) {
      // case "resnet":
      //   return (
      //     <Tabs defaultValue="accuracy">
      //       <TabsList className="mb-4">
      //         <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
      //         <TabsTrigger value="loss">Loss</TabsTrigger>
      //       </TabsList>
      //       <TabsContent value="accuracy" className="h-[350px]">
      //       <Card>
      //           <ChartContainer>
      //             <LineChart data={performanceData}>
      //               <CartesianGrid strokeDasharray="3 3" />
      //               <XAxis
      //                 dataKey="date"
      //                 tick={{ fontSize: 12 }}
      //                 tickFormatter={(value) => {
      //                   const date = new Date(value)
      //                   return `${date.getMonth() + 1}/${date.getDate()}`
      //                 }}
      //               />
      //               <YAxis
      //                 domain={[0, 1]}
      //                 tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
      //                 tick={{ fontSize: 12 }}
      //               />
      //               <Tooltip
      //                 formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`]}
      //                 labelFormatter={(label) => `Date: ${label}`}
      //               />
      //               <Legend />
      //               <Line
      //                 type="monotone"
      //                 dataKey="resnetAccuracy"
      //                 name="ResNet Accuracy"
      //                 stroke="#3b82f6"
      //                 strokeWidth={2}
      //                 dot={false}
      //                 activeDot={{ r: 6 }}
      //               />
      //             </LineChart>
      //           </ChartContainer>
      //           </Card>
      //       </TabsContent>
      //       <TabsContent value="loss" className="h-[350px]">
      //         <Card>
      //           <ChartContainer>
      //             <LineChart data={performanceData}>
      //               <CartesianGrid strokeDasharray="3 3" />
      //               <XAxis
      //                 dataKey="date"
      //                 tick={{ fontSize: 12 }}
      //                 tickFormatter={(value) => {
      //                   const date = new Date(value)
      //                   return `${date.getMonth() + 1}/${date.getDate()}`
      //                 }}
      //               />
      //               <YAxis domain={[0, 1]} tick={{ fontSize: 12 }} />
      //               <Tooltip
      //                 formatter={(value) => [Number(value).toFixed(3)]}
      //                 labelFormatter={(label) => `Date: ${label}`}
      //               />
      //               <Legend />
      //               <Line
      //                 type="monotone"
      //                 dataKey="resnetLoss"
      //                 name="ResNet Loss"
      //                 stroke="#ef4444"
      //                 strokeWidth={2}
      //                 dot={false}
      //                 activeDot={{ r: 6 }}
      //               />
      //             </LineChart>
                  
      //           </ChartContainer>
      //           </Card>
              
      //       </TabsContent>
      //     </Tabs>
      //   )
      
      case "fertilizer":
        return (
          <Tabs defaultValue="precision">
            <TabsList className="mb-4 bg-zinc-800 border border-zinc-700">
              <TabsTrigger value="precision" className="data-[state=active]:bg-zinc-700 text-zinc-300">Precision</TabsTrigger>
              <TabsTrigger value="heatmap" className="data-[state=active]:bg-zinc-700 text-zinc-300">Heatmap</TabsTrigger>
            </TabsList>
            <TabsContent value="precision" className="h-[350px]">
              <Card className="bg-zinc-900 border border-zinc-800 shadow-md">
                <CardContent className="flex flex-row gap-4 justify-between items-center pt-6 overflow-hidden">
                  <img src="src/assets/Precision.jpg" alt="Precision" className="w-1/2 h-full object-contain" />
                  <img src="src/assets/Recall_crop.jpg" alt="Recall" className="w-1/2 h-full object-contain" />
                </CardContent>
              </Card>
            </TabsContent>
      
            <TabsContent value="heatmap" className="h-[350px]">
              <Card className="bg-zinc-900 border border-zinc-800 shadow-md">
                <CardContent className="flex flex-col gap-4 justify-between items-center pt-6">
                  <img src={heatmapImage} alt="Fertilizer Recommendation Heatmap" className="max-h-full object-contain" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )
      
      case "crop":
        return (
          <Tabs defaultValue="metrics">
            <TabsList className="mb-4 bg-zinc-800 border border-zinc-700">
              <TabsTrigger value="metrics" className="data-[state=active]:bg-zinc-700 text-zinc-300">Metrics</TabsTrigger>
            </TabsList>
            <TabsContent value="metrics" className="h-[350px]">
              <Card className="bg-zinc-900 border border-zinc-800 shadow-md">
                <CardContent className="flex flex-col gap-4 justify-between items-center pt-6">
                  <img src="src/assets/MetricsTraining.jpg" alt="Metrics" className="max-h-full object-contain" />
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