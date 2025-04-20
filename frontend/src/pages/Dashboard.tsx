import ModelOverview from '@/components/dashboard/ModelSummary'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ModelTable } from '@/components/dashboard/modelTable'
import ModelPerformance from '@/components/dashboard/modelPerformance'

import MorphingText from '@/components/eldoraui/morphingText'

const Dashboard = () => {
  const texts = [
    "AI Dashboard",
    "Usage Tracking",
    "Data Insights",
    
    
]
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-zinc-950 min-h-screen">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-[700] text-gray-100 mb-2"> <MorphingText texts={texts} clas /></h1>
        <p className="text-lg text-zinc-400">Monitor and analyze performance of your agricultural AI models</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ModelOverview/>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="models" className="data-[state=active]:bg-black data-[state=active]:text-white text-zinc-400">Models</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-black data-[state=active]:text-white text-zinc-400">Performance</TabsTrigger>
        
        </TabsList>
        <TabsContent value="models" className="mt-4">
          <ModelTable/>
        </TabsContent>
        <TabsContent value="performance" className="mt-4">
          <ModelPerformance />
        </TabsContent>
       
      </Tabs>
    </div>
  )
}

export default Dashboard