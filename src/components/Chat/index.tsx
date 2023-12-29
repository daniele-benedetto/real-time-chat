'use client'

import { useEffect, useRef, useState } from 'react'
import ChatItem from '../ChatItem'
import ChatPanel from '../ChatPanel'
import Message from '@/models/Message'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { redirect } from 'next/navigation'
import { setUser } from '@/redux/features/user/userSlice'
import Loader from '../Loader'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
})

interface Props {
  messages: Message[]
}

export default function Chat({
  messages
}:Props) {

  const dispatch = useAppDispatch()
  const chatContainerRef = useRef(null)
  const { id, name } = useAppSelector(state => state.user)
  const [loading, setLoading] = useState(true)
  const [messagesList, setMessagesList] = useState<Message[]>([])

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}')
    if (!localUser.id) {
      redirect('/register')
    } else {
      dispatch(setUser(localUser))
    }

    setLoading(false)
  }, [dispatch])

  useEffect(() => {
    setMessagesList(messages)
  }, [messages])

  useEffect(() => {
    if (chatContainerRef.current) {
      (chatContainerRef.current as HTMLElement).scrollTop = (chatContainerRef.current as HTMLElement).scrollHeight
    }
  }, [messagesList])

  useEffect(() => {
    
    socket.on('chat message', (message) => {
      setMessagesList((messagesList) => {
        if (!messagesList.find((item) => item.id === message.id)) {
          return [...messagesList, message]
        }
        return messagesList
      })

      if (chatContainerRef.current) {
        (chatContainerRef.current as HTMLElement).scrollTop = (chatContainerRef.current as HTMLElement).scrollHeight
      }
    })

  }, [])

  return (
    <section className="w-full h-[calc(100vh-80px)] md:h-[calc(100vh-120px)] md:p-5 md:pt-0 md:w-3/4">
      <div className="flex flex-col w-full bg-white p-5 md:rounded-md h-full">
        <div className="flex flex-col h-full overflow-auto" ref={chatContainerRef}>
          {loading && <Loader />}
          {!loading && messagesList && messagesList.length > 0 && messagesList.map(message => (
            <ChatItem message={message} key={message.id} id={id} />
          ))}
          {(!loading && messagesList.length === 0) && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-4xl font-bold text-gray-400">No messages found</h1>
            </div>
          )}
        </div>
        <ChatPanel id={id} name={name} />
      </div>
    </section>
  )
}