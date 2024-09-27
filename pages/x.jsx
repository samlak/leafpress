import React, { useState } from 'react'
import { Upload, FileText, MapPin, MessageSquare, ArrowRight, Send, CheckCircle, AlertTriangle, TrendingUp, TrendingDown, Edit2, Loader2, FileInput } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function LeafpressEnergyInsight() {
  const [file, setFile] = useState(null)
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [activeTab, setActiveTab] = useState("report")
  const [analysis, setAnalysis] = useState(null)
  const [location, setLocation] = useState(null)
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [editedLocation, setEditedLocation] = useState("")
  const [comparison, setComparison] = useState(null)
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isConfirmingLocation, setIsConfirmingLocation] = useState(false)
  const [isSavingLocation, setIsSavingLocation] = useState(false)
  const [isSendingMessage, setIsSendingMessage] = useState(false)

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }

  const handleSubmit = () => {
    if (file) {
      setIsAnalyzing(true)
      // Simulate analysis (replace with actual analysis logic)
      setTimeout(() => {
        setAnalysis({
          usage: 500,
          cost: 150,
          previousUsage: 420,
          previousCost: 126,
          breakdown: {
            lighting: 30,
            heating: 40,
            appliances: 20,
            other: 10
          },
          recommendations: [
            "Switch to LED bulbs to save up to 15% on lighting costs",
            "Improve insulation to reduce heating expenses by up to 20%",
            "Use smart power strips to eliminate standby power consumption"
          ]
        })
        setLocation("123 Green Street, Eco City")
        setIsAnalyzed(true)
        setActiveTab("report")
        setIsAnalyzing(false)
      }, 2000)
    }
  }

  const handleLocationConfirm = () => {
    setIsConfirmingLocation(true)
    // Simulate comparison (replace with actual comparison logic)
    setTimeout(() => {
      setComparison({
        averageUsage: 550,
        averageCost: 165,
        percentileLower: 60,
        topSavers: [
          "Using smart thermostats",
          "Installing solar panels",
          "Upgrading to energy-efficient appliances"
        ]
      })
      setIsConfirmingLocation(false)
    }, 1500)
  }

  const handleEditLocation = () => {
    setIsEditingLocation(true)
    setEditedLocation(location || "")
  }

  const handleSaveLocation = () => {
    setIsSavingLocation(true)
    // Simulate saving location (replace with actual save logic)
    setTimeout(() => {
      setLocation(editedLocation)
      setIsEditingLocation(false)
      setComparison(null) // Reset comparison when location changes
      setIsSavingLocation(false)
    }, 1000)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      setIsSendingMessage(true)
      setChat([...chat, { role: "user", content: message }])
      setMessage("")
      // Simulate AI response (replace with actual AI integration)
      setTimeout(() => {
        setChat(prev => [...prev, { role: "ai", content: "Based on your energy usage, I recommend focusing on reducing your heating consumption. Consider programmable thermostats and improving your home's insulation. This could lead to significant savings on your energy bill." }])
        setIsSendingMessage(false)
      }, 1000)
    }
  }

  const handleResetAnalysis = () => {
    setFile(null)
    setIsAnalyzed(false)
    setAnalysis(null)
    setLocation(null)
    setComparison(null)
    setChat([])
    setActiveTab("report")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-green-700">Leafpress Energy Insight</CardTitle>
          <CardDescription>Analyze and optimize your energy usage</CardDescription>
        </CardHeader>
        <CardContent>
          {!isAnalyzed ? (
            <div className="flex flex-col items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-green-500" />
                  <p className="mb-2 text-sm text-green-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-green-500">PDF or image file of your utility bill</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,image/*" />
              </label>
              {file && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">File selected: {file.name}</p>
                  <Button className="mt-2" onClick={handleSubmit} disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Submit for Analysis'
                    )}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="mb-4 flex justify-between items-center">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="report">Report</TabsTrigger>
                    <TabsTrigger value="compare">Compare</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                  </TabsList>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetAnalysis}
                  className="ml-4 whitespace-nowrap"
                >
                  <FileInput className="w-4 h-4 mr-2" />
                  Analyze New Bill
                </Button>
              </div>
              <TabsContent value="report" className="mt-4">
                {analysis && (
                  <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-green-700">Energy Usage Report</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-600">Current Usage</p>
                        <p className="text-2xl font-bold text-green-600">{analysis.usage} kWh</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Current Cost</p>
                        <p className="text-2xl font-bold text-green-600">${analysis.cost}</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2 text-green-700">Usage Breakdown</h4>
                      <div className="space-y-2">
                        {Object.entries(analysis.breakdown).map(([category, percentage]) => (
                          <div key={category}>
                            <div className="flex justify-between text-sm">
                              <span className="capitalize">{category}</span>
                              <span>{percentage}%</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2 text-green-700">Comparison to Last Month</h4>
                      <div className="flex items-center">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Usage</p>
                          <p className="text-lg font-semibold">
                            {analysis.usage > analysis.previousUsage ? (
                              <TrendingUp className="inline text-red-500 mr-1" />
                            ) : (
                              <TrendingDown className="inline text-green-500 mr-1" />
                            )}
                            {Math.abs(((analysis.usage - analysis.previousUsage) / analysis.previousUsage) * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Cost</p>
                          <p className="text-lg font-semibold">
                            {analysis.cost > analysis.previousCost ? (
                              <TrendingUp className="inline text-red-500 mr-1" />
                            ) : (
                              <TrendingDown className="inline text-green-500 mr-1" />
                            )}
                            {Math.abs(((analysis.cost - analysis.previousCost) / analysis.previousCost) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-green-700">Recommendations</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {analysis.recommendations.map((rec, index) => (
                          <li key={index} className="text-gray-600">{rec}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <p className="text-sm text-gray-500">Detected Location: {location}</p>
                      <Button className="mt-2" onClick={() => setActiveTab("compare")}>
                        Compare with Neighbors <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="compare" className="mt-4">
                {location && (
                  <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-green-700">Neighborhood Comparison</h3>
                    {!comparison ? (
                      <div>
                        <p className="text-gray-600 mb-2">Is this your correct address?</p>
                        {isEditingLocation ? (
                          <div className="flex items-center gap-2 mb-4">
                            <Input
                              type="text"
                              value={editedLocation}
                              onChange={(e) => setEditedLocation(e.target.value)}
                              placeholder="Enter your address"
                              className="flex-grow"
                            />
                            <Button onClick={handleSaveLocation} disabled={isSavingLocation}>
                              {isSavingLocation ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                'Save'
                              )}
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 mb-4">
                            <p className="font-medium">{location}</p>
                            <Button variant="outline" size="sm" onClick={handleEditLocation}>
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button onClick={handleLocationConfirm} disabled={isConfirmingLocation}>
                            {isConfirmingLocation ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Confirming...
                              </>
                            ) : (
                              'Confirm'
                            )}
                          </Button>
                          {!isEditingLocation && (
                            <Button variant="outline" onClick={handleEditLocation}>Edit</Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <p className="text-sm text-gray-600">Your Usage</p>
                            <p className="text-2xl font-bold text-green-600">{analysis.usage} kWh</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Neighborhood Average</p>
                            <p className="text-2xl font-bold text-blue-600">{comparison.averageUsage} kWh</p>
                          </div>
                        </div>
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-2 text-green-700">Usage Percentile</h4>
                          <p className="text-gray-600 mb-2">Your energy usage is lower than {comparison.percentileLower}% of your neighbors.</p>
                          <Progress value={comparison.percentileLower} className="h-2" />
                        </div>
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-2 text-green-700">Cost Comparison</h4>
                          <p className="text-gray-600">
                            Your energy cost (${analysis.cost}) is {' '}
                            {analysis.cost < comparison.averageCost ? (
                              <span className="text-green-600 font-semibold">
                                ${(comparison.averageCost - analysis.cost).toFixed(2)} less than
                              </span>
                            ) : (
                              <span className="text-red-600 font-semibold">
                                ${(analysis.cost - comparison.averageCost).toFixed(2)} more than
                              </span>
                            )}
                            {' '}the neighborhood average (${comparison.averageCost}).
                          </p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2 text-green-700">Top Energy-Saving Methods in Your Area</h4>
                          <ul className="list-disc list-inside space-y-2">
                            {comparison.topSavers.map((method, index) => (
                              <li key={index} className="text-gray-600">{method}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="chat" className="mt-4">
                <div className="bg-white rounded-lg shadow p-4 h-96 flex flex-col">
                  <div className="flex-1 overflow-y-auto mb-4">
                    {chat.map((msg, index) => (
                      <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {msg.content}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Ask about your energy usage..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} disabled={isSendingMessage}>
                      {isSendingMessage ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              </Tabs>
            </>
          )}
        </CardContent>
        <CardFooter className="text-sm text-gray-500">
          Leafpress Energy Insight - Empowering you to make informed energy decisions.
        </CardFooter>
      </Card>
    </div>
  )
}