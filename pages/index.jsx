import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Chat from "@/components/chat"
import Compare from "@/components/compare"
import Report from "@/components/report"
import Upload from "@/components/upload"

export default function LeafpressEnergyInsight() {
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [activeTab, setActiveTab] = useState("report")
  const [analysis, setAnalysis] = useState(null)
  const [location, setLocation] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-green-700">Leafpress Energy Insight</CardTitle>
          <CardDescription>Analyze and optimize your energy usage</CardDescription>
        </CardHeader>
        <CardContent>
          {!isAnalyzed ? (
            <Upload 
              setIsAnalyzed={setIsAnalyzed}
              setActiveTab={setActiveTab}
              setAnalysis={setAnalysis}
              setLocation={setLocation}
            />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="report">Report</TabsTrigger>
                <TabsTrigger value="compare">Compare</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>
              <TabsContent value="report" className="mt-4">
                {analysis && (
                  <Report 
                    setActiveTab={setActiveTab}
                    analysis={analysis}
                    location={location}
                  />
                )}
              </TabsContent>
              <TabsContent value="compare" className="mt-4">
                {location && (
                  <Compare 
                    analysis={analysis}
                    location={location}
                    setLocation={setLocation}
                  />
                )}
              </TabsContent>
              <TabsContent value="chat" className="mt-4">
                <Chat />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
        <CardFooter className="text-sm text-gray-500">
          Leafpress Energy Insight - Empowering you to make informed energy decisions.
        </CardFooter>
      </Card>
    </div>
  )
}