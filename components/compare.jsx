import { useState } from 'react'
import { Edit2, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Compare({
  location,
  setLocation,
  comparison, 
  setComparison,
  utilityFile
}) {
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [editedLocation, setEditedLocation] = useState("")

  const [isConfirmingLocation, setIsConfirmingLocation] = useState(false)
  const [isSavingLocation, setIsSavingLocation] = useState(false)

  const analyseComparision = async () => {
    setIsConfirmingLocation(true)
    const response = await fetch("/api/compare", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: location, 
        imageURL: utilityFile
      }),
    });

    const data = await response.json();

    setIsConfirmingLocation(false)
    if(!data.status) {
      toast({
        variant: "destructive",
        description: data.error,
      });
    }

    setComparison(data.data)

    localStorage.setItem('comparisonData', data.data);
  }

  const handleEditLocation = () => {
    setIsEditingLocation(true)
    setEditedLocation(location || "")
  }

  const handleSaveLocation = () => {
    setIsSavingLocation(true)
    
    setTimeout(() => {
      setLocation(editedLocation)
      setIsEditingLocation(false)
      setComparison(null)
      setIsSavingLocation(false)
    }, 1000)
  }

  return (
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
            <Button onClick={analyseComparision} disabled={isConfirmingLocation}>
              {isConfirmingLocation ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Comparing...
                </>
              ) : (
                'Compare'
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <ReactMarkdown
            className="markdown markdown_style leading-tight"
            remarkPlugins={[remarkGfm]}
          >
            {comparison}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}