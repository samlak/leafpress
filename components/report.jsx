import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Report({
  setActiveTab,
  analysis,
  location
}) {

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-green-700">Energy Usage Report</h3>
      
      <div>
        <ReactMarkdown
          className="markdown markdown_style leading-tight"
          remarkPlugins={[remarkGfm]}
        >
          {analysis}
        </ReactMarkdown>
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