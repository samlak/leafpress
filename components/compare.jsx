import { useState } from 'react'
import { Edit2, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export default function Compare({
  analysis,
  location,
  setLocation
}) {
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [editedLocation, setEditedLocation] = useState("")
  const [comparison, setComparison] = useState(null)

  const [isConfirmingLocation, setIsConfirmingLocation] = useState(false)
  const [isSavingLocation, setIsSavingLocation] = useState(false)

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
  )
}