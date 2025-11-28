"use client"

type QA = {
  question: string
  answer: string
}

export default function Responses({ answers }: { answers: QA[] }) {
  return (
    <div className="p-4 space-y-4 overflow-y-auto">
      {answers.map((qa, idx) => (
        <div key={idx} className="bg-white p-3 rounded shadow">
          <p className="font-semibold text-gray-700">Question:</p>
          <p className="mb-2">{qa.question}</p>
          <p className="font-semibold text-gray-700">Answer:</p>
          <p>{qa.answer}</p>
        </div>
      ))}
    </div>
  )
}
