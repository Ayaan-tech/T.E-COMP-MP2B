"use client"

import React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,

} from "@/components/ui/chart"

const recallData = [
  { fertilizer: "Balanced NPK Fertilizer", recall: 0.81 },
  { fertilizer: "Compost", recall: 0.16 },
  { fertilizer: "DAP", recall: 0.73 },
  { fertilizer: "General Purpose Fertilizer", recall: 0.28 },
  { fertilizer: "Gypsum", recall: 0.13 },
  { fertilizer: "Lime", recall: 0.33 },
  { fertilizer: "Muriate of Potash", recall: 0.27 },
  { fertilizer: "Organic Fertilizer", recall: 0.06 },
  { fertilizer: "Urea", recall: 0.06 },
  { fertilizer: "Water Retaining Fertilizer", recall: 0.63 },
]

const chartConfig = {
  recall: {
    label: "Recall",
    color: "#4ade80", // Light green color
  },
} satisfies ChartConfig

const RecallBarChart = ({width}) => {
  return (
    <Card className='w-1/2 bg-white'>
      <CardHeader>
        <CardTitle>Recall per Class</CardTitle>
        <CardDescription>
          Showing recall metrics for different fertilizer types
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={recallData}
            margin={{
              left: 10,
              right: 10,
              top: 10,
              bottom: 50,
            }}
            height={300}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="fertilizer"
              tickLine={false}
              axisLine={true}
              angle={-45}
              textAnchor="end"
              height={70}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(value) => value.toFixed(1)}
              label={{ 
                value: "recall", 
                angle: -90, 
                position: "insideLeft",
                style: { textAnchor: "middle" }
              }}
            />
            <Tooltip
              formatter={(value) => [`${Number(value).toFixed(2)}`, "Recall"]}
              labelFormatter={(label) => label}
            />
            <Bar
              dataKey="recall"
              fill="#4ade80"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default RecallBarChart