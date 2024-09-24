import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function Report({
  setActiveTab,
  analysis,
  location
}) {

  return (
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
  )
}