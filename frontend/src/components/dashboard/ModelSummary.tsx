"use client"
import { fetchModelHistory } from "@/lib/api"

import React,{ useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react"

type ModelRecord = {
  id: string
  timestamp: string
  modelName: string
  input: string
  response: string
  accuracy: number
  processingTime: number
}
const ModelOverview = () => {
  const [records, setRecords] = useState<ModelRecord[]>([])
  useEffect(() =>{
    const loadData = async () => {
      try {
        const response = await fetchModelHistory();
        
        setRecords(response)
      } catch (error) {
        console.error("Failed to fetch model history:", error)
      }
    }

    loadData()
  }, [])

  const avgProcessingTime = records.length > 0
    ? records.reduce((sum, record) => sum + record.processingTime, 0) / records.length
    : 0

  
  const avgAccuracy = records.length > 0
    ? records.reduce((sum, record) => sum + record.accuracy, 0) / records.length
    : 0
  return (
    <>
      <Card className="bg-black text-white border border-zinc-800 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-100">Total Predictions</CardTitle>
          <Activity className="h-4 w-4 text-zinc-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{records.length}</div>
          <p className="text-xs text-zinc-400">+15.8% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-black text-white border border-zinc-800 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-100">Average Accuracy</CardTitle>
          <CheckCircle className="h-4 w-4 text-zinc-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{(avgAccuracy*100).toFixed(1)}%</div>
          <p className="text-xs text-zinc-400">+2.3% from last month</p>
        </CardContent>
      </Card>
     
        <Card className="bg-black text-white border border-zinc-800 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-100">Avg Response time</CardTitle>
          <Clock className="h-4 w-4 text-zinc-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{avgProcessingTime.toFixed(2)}ms</div>
          <p className="text-xs text-zinc-400">-0.1s from last month</p>
        </CardContent>
      </Card>
     
      <Card className="bg-black text-white border border-zinc-800 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-100">Error Rate</CardTitle>
          <AlertTriangle className="h-4 w-4 text-zinc-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{((1 - avgAccuracy) * 100).toFixed(1)}%</div>
          <p className="text-xs text-zinc-400">-0.3% from last month</p>
        </CardContent>
      </Card>
    </>
  )
}

export default ModelOverview