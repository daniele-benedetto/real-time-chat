'use client'

import { MdOutlineSend } from "react-icons/md"
import { createMessage } from "@/app/api/message/create"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import formattedDate from "@/utils/formatDate"

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
});

interface Props {
  id: number,
  name: string
}

export default function ChatPanel({id, name}: Props) {

  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string>('')

  const handleSubmit = async (formData: {user_id: number, content: string}) => {
    if(!formData.content) return

    const id = Math.floor(Math.random() * 100000)
    const time = formattedDate(new Date())

    const data = {
      ...formData,
      id,
      time,
      name
    }

    socket.emit('chat message', data)
    const result = await createMessage(Object.entries(data))

    if (result?.error) {
      setError(result.error)
    }

    if(result?.success) {
      setError(null)
    }
  }

  useEffect(() => { 

    socket.on('connect', () => {
        console.log('Connesso al server Socket.IO');
    });

    // Ricevi messaggi dal server
    socket.on('newMessage', (message) => {
        console.log('Messaggio ricevuto:', message);
    });
  }, [])

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
