import { useEffect, useState } from 'react'
import { FileInput } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Chat from "@/components/chat"
import Compare from "@/components/compare"
import Report from "@/components/report"
import Upload from "@/components/upload"

export default function LeafpressEnergyInsight() {
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [activeTab, setActiveTab] = useState("report")
  const [analysis, setAnalysis] = useState(null)
  const [location, setLocation] = useState(null)
  const [comparison, setComparison] = useState(null)
  const [utilityFile, setUtilityFile] = useState(null)

  useEffect(() => {
    const utilityFileUrl = localStorage.getItem('utilityFileUrl');
    const userLocation = localStorage.getItem('userLocation');
    const billAnalysis = localStorage.getItem('billAnalysis');
    const comparisonData = localStorage.getItem('comparisonData');

    if (utilityFileUrl && billAnalysis) {
      setUtilityFile(utilityFileUrl);
      setAnalysis(billAnalysis);
      setLocation(userLocation);
      setComparison(comparisonData)
      setIsAnalyzed(true);
    }
  }, [])
  
  const handleResetAnalysis = () => {
    setIsAnalyzed(false)
    setAnalysis(null)
    setLocation(null)
    setComparison(null)
    setActiveTab("report")
    setUtilityFile(null)

    localStorage.removeItem('utilityFileUrl');
    localStorage.removeItem('userLocation');
    localStorage.removeItem('billAnalysis');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-green-700 flex justify-between">
            <div className=''>Leafpress Energy Insight</div>
            <div className=''>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetAnalysis}
              className="whitespace-nowrap"
            >
              <FileInput className="w-4 h-4 mr-2" />
              Analyze New Bill
            </Button>
          </div>
          </CardTitle>
          <CardDescription>Analyze and optimize your energy usage</CardDescription>
        </CardHeader>
        <CardContent>
          {!isAnalyzed ? (
            <Upload 
              setIsAnalyzed={setIsAnalyzed}
              setActiveTab={setActiveTab}
              setAnalysis={setAnalysis}
              setLocation={setLocation}
              setUtilityFile={setUtilityFile}
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
                    location={location}
                    setLocation={setLocation}
                    comparison={comparison}
                    setComparison={setComparison}
                    utilityFile={utilityFile}
                  />
                )}
              </TabsContent>
              <TabsContent value="chat" className="mt-4">
                <Chat utilityFile={utilityFile}/>
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