"use client"
import { TrendingUp } from "lucide-react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const batchData = [
  { batch: 0, loss: 2.5, accuracy: 44 },
  { batch: 1, accuracy: 31 },
  { batch: 2, loss: 7, accuracy: 93 },
  { batch: 5, loss: 0, accuracy: 100 },
  { batch: 6, loss: 0, accuracy: 100 },
  { batch: 7, loss: 0, accuracy: 100 },
  { batch: 8, loss: 7, accuracy: 93 },
  { batch: 9, loss: 7, accuracy: 93 },
  { batch: 10, loss: 5, accuracy: 100 },
  { batch: 11, loss: 0, accuracy: 100 },
  { batch: 12, loss: 0, accuracy: 100 },
  { batch: 13, loss: 13, accuracy: 87 },
  { batch: 14, loss: 19, accuracy: 81 },
  { batch: 15, loss: 7, accuracy: 93 },
  { batch: 16, loss: 0, accuracy: 100 },
  { batch: 17, loss: 0, accuracy: 100 },
  { batch: 18, loss: 0, accuracy: 100 },
  { batch: 19, loss: 0, accuracy: 100 },
  { batch: 20, loss: 0, accuracy: 100 },
  { batch: 21, loss: 0, accuracy: 100 },
  { batch: 22, loss: 0, accuracy: 100 },
  { batch: 23, loss: 19, accuracy: 81 },
  { batch: 24, loss: 20, accuracy: 81 },
  { batch: 25, loss: 7, accuracy: 93 },
  { batch: 26, loss: 13, accuracy: 87 },
  { batch: 27, loss: 0, accuracy: 100 },
  { batch: 28, loss: 0, accuracy: 100 },
  { batch: 29, loss: 0, accuracy: 100 },
  { batch: 30, loss: 13, accuracy: 87 },
  { batch: 31, loss: 19, accuracy: 81 },
  { batch: 32, loss: 19, accuracy: 81 },
  { batch: 33, loss: 38, accuracy: 62 },
  { batch: 34, loss: 35, accuracy: 75 },
  { batch: 35, loss: 7, accuracy: 93 },
  { batch: 36, loss: 19, accuracy: 81 },
  { batch: 37, loss: 19, accuracy: 81 },
  { batch: 38, loss: 0, accuracy: 100 },
  { batch: 39, loss: 0, accuracy: 100 },
  { batch: 40, loss: 0, accuracy: 100 },
  { batch: 41, loss: 13, accuracy: 87 },
  { batch: 42, loss: 19, accuracy: 81 },
  { batch: 43, loss: 19, accuracy: 81 },
  { batch: 44, loss: 19, accuracy: 81 },
  { batch: 45, loss: 38, accuracy: 62 },
  { batch: 46, loss: 60, accuracy: 31 },
  { batch: 47, loss: 19, accuracy: 81 },
  { batch: 48, loss: 38, accuracy: 62 },
  { batch: 49, loss: 20, accuracy: 80 },
  { batch: 50, loss: 5 , accuracy: 95 }
]

const CombinedMetricsChart = () =>{

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ResNet Model Metrics on Labeled Dataset</CardTitle>
        <CardDescription>
          Batch-wise Loss and Accuracy during training
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={batchData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="batch" label={{ value: 'Batch Number', position: 'insideBottomRight', offset: -5 }} />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="#ff0000" 
                domain={[0, 5]}
                label={{ value: 'Loss', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#0000ff" 
                domain={[0, 100]}
                label={{ value: 'Accuracy (%)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip 
                formatter={(value, name) => {
                  return [[`${name} :-`,` ${Number(value).toFixed(2)}`]];
                }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="loss" 
                stroke="#ff0000" 
                name="Loss"
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="accuracy" 
                stroke="#0000ff" 
                name="Accuracy"
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Model converges with 90% accuracy <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Training Results - 50 Batches
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CombinedMetricsChart;