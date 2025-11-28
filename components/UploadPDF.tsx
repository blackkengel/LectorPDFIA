"use client"

import { useState } from "react"
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid"

export default function UploadPDF({ onUploaded }: { onUploaded: (path: string) => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleUpload = async () => {
    if (!file) {
      setStatus("Select a PDF file first")
      return
    }

    setLoading(true)
    setStatus("Uploading File...")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}/upload`, {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      
      if (data.success) {
        const pdfName = data.url.split("/").pop()
        const publicUrl = data.url;
        console.log("data-res",data);
        setStatus(`uploaded file: ${pdfName}`)
        onUploaded(publicUrl)
      } else {
        setStatus("Error uploading file")
      }
    } catch (err) {
      setStatus("Server connection error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border-b">
      <h2 className="font-bold mb-2">Upload PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-2 w-full"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded flex items-center space-x-2"
      >
        <ArrowUpTrayIcon className="h-5 w-5" />
        <span>{loading ? "Uploading..." : "Upload"}</span>
      </button>
      {status && <p className="text-sm mt-2">{status}</p>}
    </div>
  )
}
