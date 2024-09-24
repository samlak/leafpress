import { useState } from 'react'
import { UploadIcon, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Upload({
  setIsAnalyzed,
  setActiveTab,
  setAnalysis,
  setLocation
}) {
  const [file, setFile] = useState(null)

  const [isAnalyzing, setIsAnalyzing] = useState(false)

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

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className="w-10 h-10 mb-3 text-green-500" />
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
  )
}