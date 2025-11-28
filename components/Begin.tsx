"use client"

import { useState } from "react"
import UploadPDF from "./UploadPDF"
import AskBox from "./AskBox"
import Responses from "./Responses"

type QA = {
  question: string
  answer: string
}


export default function Begin() {

  const [answers, setAnswers] = useState<QA[]>([])
  const [pdfPath, setPdfPath] = useState<string>("/pdf/Descripcion_de_Funcionalidades.pdf")

  const handleNewAnswer = (qa: QA) => {
    setAnswers((prev) => [...prev, qa])
  }

  return (
    <div className="flex w-full h-screen">
      <div className="w-7/10 bg-white">
        <iframe
          src={pdfPath}
          className="w-full h-full"
        />
      </div>
      <div className="w-3/10 bg-gray-100 flex flex-col">
        <UploadPDF onUploaded={setPdfPath}/>
        <Responses answers={answers} />
        <AskBox onAnswer={handleNewAnswer} pdfPath={pdfPath}/>
      </div>
    </div>
  )
}
