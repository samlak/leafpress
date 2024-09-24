import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Chat() {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])

  const [isSendingMessage, setIsSendingMessage] = useState(false)

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

  return (
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
  )
}