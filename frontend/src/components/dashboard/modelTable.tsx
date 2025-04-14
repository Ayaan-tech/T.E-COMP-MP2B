"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search } from "lucide-react"
import { fetchModelHistory } from "@/lib/api"
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

type ModelRecord = {
  id: string
  timestamp: string
  modelName: string
  input: string
  response: string
  accuracy: number
  processingTime: number
}

export function ModelTable() {
  const [records, setRecords] = useState<ModelRecord[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchModelHistory()
        setRecords(data)
      } catch (error) {
        console.error("Failed to fetch model history:", error)
        // For demo purposes, you might add some mock data here
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredRecords = records.filter(
    (record) =>
      record.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.input.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.response.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getBadgeClass = (accuracy: number) => {
    if (accuracy > 0.85) return "bg-green-600 hover:bg-green-700 text-white"
    if (accuracy > 0.7) return "bg-amber-500 hover:bg-amber-600 text-white"
    return "bg-red-500 hover:bg-red-600 text-white"
  }

  // Export data to CSV
  const handleExportCSV = () => {
    // Create header row and map each record into a CSV row
    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += "ID,Timestamp,Model Name,Input,Response,Accuracy,Processing Time\n"
    records.forEach(record => {
      const row = [
        record.id,
        new Date(record.timestamp).toLocaleString(),
        record.modelName,
        record.input,
        record.response,
        (record.accuracy * 100).toFixed(1) + "%",
        record.processingTime + "ms",
      ].join(",")
      csvContent += row + "\n"
    })
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "model_history.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Export data to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF()
    const tableColumn = ["ID", "Timestamp", "Model", "Input", "Response", "Accuracy", "Processing Time"]
    const tableRows: (string | number)[][] = []
    
    records.forEach(record => {
      const rowData = [
        record.id,
        new Date(record.timestamp).toLocaleString(),
        record.modelName,
        record.input,
        record.response,
        (record.accuracy * 100).toFixed(1) + "%",
        record.processingTime + "ms"
      ]
      tableRows.push(rowData)
    })

    // Add title and table to PDF using autoTable
    doc.text("Model Predictions", 14, 15)
    
    autoTable(doc, {
      startY: 20,
      head: [tableColumn],
      body: tableRows,
    });
    doc.save("model_history.pdf")
  }

  return (
    <Card className="bg-black border border-zinc-800 text-white shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-white">Model Predictions</CardTitle>
        <CardDescription className="text-zinc-400">Recent predictions from your AI models</CardDescription>
        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search predictions..."
              className="pl-8 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Export Button with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800">
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900 text-zinc-300 border border-zinc-700">
              <DropdownMenuItem onClick={handleExportCSV} className="hover:bg-zinc-800 cursor-pointer">
                Export to CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportPDF} className="hover:bg-zinc-800 cursor-pointer">
                Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-zinc-800 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-900">
              <TableRow className="hover:bg-zinc-800 border-b border-zinc-800">
                <TableHead className="text-zinc-300 font-medium">Model</TableHead>
                <TableHead className="text-zinc-300 font-medium">Input</TableHead>
                <TableHead className="text-zinc-300 font-medium">Response</TableHead>
                <TableHead className="text-zinc-300 font-medium">Accuracy</TableHead>
                <TableHead className="text-zinc-300 font-medium">Processing Time</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow className="hover:bg-zinc-900 border-b border-zinc-800">
                  <TableCell colSpan={6} className="text-center py-8 text-zinc-400">
                    Loading model data...
                  </TableCell>
                </TableRow>
              ) : filteredRecords.length === 0 ? (
                <TableRow className="hover:bg-zinc-900 border-b border-zinc-800">
                  <TableCell colSpan={6} className="text-center py-8 text-zinc-400">
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record) => (
                  <TableRow key={record.id} className="hover:bg-zinc-900 border-b border-zinc-800">
                    <TableCell>
                      <div className="font-medium text-white">{record.modelName}</div>
                      <div className="text-xs text-zinc-400">{new Date(record.timestamp).toLocaleString()}</div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-zinc-300">{record.input}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-zinc-300">{record.response}</TableCell>
                    <TableCell>
                      <Badge className={getBadgeClass(record.accuracy)}>
                        {(record.accuracy * 100).toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-300">{record.processingTime}ms</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-zinc-900 text-zinc-300 border border-zinc-700">
                          <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">View details</DropdownMenuItem>
                          <DropdownMenuItem onClick={handleExportPDF} className="hover:bg-zinc-800 cursor-pointer">Export result</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
