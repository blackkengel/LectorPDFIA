"use client"

import { useState } from "react"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"

type QA = {
  question: string
  answer: string
}

export default function AskBox({
  onAnswer,
  pdfPath,
}: {
  onAnswer: (qa: QA) => void
  pdfPath: string
}) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("question", message)
      formData.append("pdf_name", pdfPath)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}/ask`, {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      onAnswer({
        question: message,
        answer: data.answer || "No server response",
      })
    } catch (err) {
      onAnswer({
        question: message,
        answer: "Server connection error",
      })
    }finally {
      setLoading(false)
      setMessage("")
    }
  }

  return (
    <div className="p-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about the PDF..."
          className="flex-1 p-2 rounded border border-gray-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleSend()
            }
          }}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={`p-2 rounded flex items-center ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}

        >
          {loading ? (
            <span className="text-sm">Sending...</span>
          ) : (
            <PaperAirplaneIcon className="h-5 w-5" />
          )}

        </button>
      </div>
    </div>
  )
}
