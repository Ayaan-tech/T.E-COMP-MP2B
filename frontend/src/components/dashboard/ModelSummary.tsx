"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const ModelOverview = () => {
  return (
    <>
      <Card className="bg-black text-white border border-zinc-800 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-100">Total Predictions</CardTitle>
          <Activity className="h-4 w-4 text-zinc-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">2,845</div>
          <p className="text-xs text-zinc-400">+15.8% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-black text-white border border-zinc-800 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-100">Average Accuracy</CardTitle>
          <CheckCircle className="h-4 w-4 text-zinc-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">92.4%</div>
          <p className="text-xs text-zinc-400">+2.3% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-black text-white border border-zinc-800 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-100">Avg. Response Time</CardTitle>
          <Clock className="h-4 w-4 text-zinc-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">1.2s</div>
          <p className="text-xs text-zinc-400">-0.1s from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-black text-white border border-zinc-800 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-100">Error Rate</CardTitle>
          <AlertTriangle className="h-4 w-4 text-zinc-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">1.8%</div>
          <p className="text-xs text-zinc-400">-0.3% from last month</p>
        </CardContent>
      </Card>
    </>
  )
}

export default ModelOverview