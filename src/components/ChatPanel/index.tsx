'use client'

import { MdOutlineSend } from "react-icons/md"
import { createMessage } from "@/app/api/message/create"
import { useState } from "react"

interface Props {
  id: number
}

export default function ChatPanel({id}: Props) {

  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string>('')

  const handleSubmit = async (formData: {user_id: number, content: string}) => {
    if(!formData.content) return
    const result = await createMessage(Object.entries(formData));

    if (result?.error) {
      setError(result.error)
    }
  }

  return(
    <div className="flex flex-row items-center justify-between p-5">
      <input 
        type="text" className="w-full border border-gray-300 rounded-md p-3 roudend-md" 
        placeholder="Type a message..." 
        value={message} 
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit({user_id: id, content: message})
            setMessage('')
          }
        }}
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button className="bg-indigo-500 text-white rounded-md p-3 ml-2">
        <MdOutlineSend size={24} />
      </button>
      {error && <small className="text-red-500 input-error-anim">{error}</small>}
    </div>
  )
}
