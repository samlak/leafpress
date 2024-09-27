import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat } from 'ai/react';
import Markdown from 'markdown-to-jsx'

export default function Chat({ utilityFile }) {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])

  const handleOnError = () => {
    setIsSendingMessage(false)
  }

  const handleOnFinish = () => {
    setIsSendingMessage(false)
  }

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    onError: handleOnError,
    // onResponse: handleOnResponse,
    onFinish: handleOnFinish
  });

  const [isSendingMessage, setIsSendingMessage] = useState(false)

  const handleSendMessage = (event) => {
    setIsSendingMessage(true)

    handleSubmit(event, {
      data: { imageUrl: utilityFile },
    });
  }


  return (
    <div className="bg-white rounded-lg shadow p-4 h-96 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
              <Markdown>
                {msg.content}
              </Markdown>
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Ask about your energy usage..."
          value={input}
          onChange={handleInputChange}
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