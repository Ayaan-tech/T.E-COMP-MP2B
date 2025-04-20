"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import React from "react"
import '@/index.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  
} from "@/components/ui/chart"

const chartData = [
  { Fertilizer: "Balanced-NPK", precision: 0.4 },
  { Fertilizer: "Compost", precision: 0.3 },
  { Fertilizer: "DAP", precision: 0.25 },
  { Fertilizer: "General", precision: 0.4 },
  { Fertilizer: "Gypsum", precision: 0.5 },
  { Fertilizer: "Lime", precision: 0.3 },
  { Fertilizer: "Potash", precision: 0.2 },
  { Fertilizer: "Organic", precision: 0.6 },
  { Fertilizer: "Urea", precision: 0.3},
  { Fertilizer: "Water", precision: 0.5 },
]

const chartConfig = {
  precision: {
    label: "Precision",
    color: "blue",
  },
} satisfies ChartConfig

const SensorChart = () => {
  return (
    <Card className='w-1/2'>
      <CardHeader>
        <CardTitle>Precision Chart</CardTitle>
        <CardDescription>
          Precision over Actual Model vs IOT Sensor Data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            height={220}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Fertilizer"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis 
              domain={[0, 1]}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Tooltip
              formatter={(value) => [`${(Number(value) * 100).toFixed(0)}%`, "Precision"]} 
              labelFormatter={(label) => `${label} Fertilizer`}
            />
            <Area
              dataKey="precision"
              type="natural"
              fill="#3b82f6"
              fillOpacity={0.4}
              stroke="#3b82f6"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              March - April 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default SensorChart