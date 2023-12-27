'use client'

import { useEffect, useRef, useState } from 'react'
import ChatItem from '../ChatItem'
import ChatPanel from '../ChatPanel'
import Message from '@/models/Message'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { redirect } from 'next/navigation'
import { setUser } from '@/redux/features/user/userSlice'
import Loader from '../Loader'

interface Props {
  messages: Message[]
}

export default function Chat({
  messages
}:Props) {

  const dispatch = useAppDispatch()
  const chatContainerRef = useRef(null)
  const { id } = useAppSelector(state => state.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}')
    if (!localUser.id) {
      redirect('/register')
    } else {
      dispatch(setUser(localUser))
    }

    if (chatContainerRef.current) {
      (chatContainerRef.current as HTMLElement).scrollTop = (chatContainerRef.current as HTMLElement).scrollHeight;
    }

    setTimeout(() => {
      setLoading(false)
    }, 100)
  }, [dispatch]);

  return (
    <section className="w-full h-[calc(100vh-80px)] md:h-[calc(100vh-120px)] md:p-5 md:pt-0 md:w-3/4">
      <div className="flex flex-col w-full bg-white p-5 md:rounded-md h-full">
        <div className="flex flex-col h-full overflow-auto" ref={chatContainerRef}>
          {loading && <Loader />}
          {!loading && messages && messages.length > 0 && messages.map(message => (
            <ChatItem message={message} key={message.id} id={id} />
          ))}
          {(!loading && !messages) && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-4xl font-bold text-gray-400">No messages found</h1>
            </div>
          )}
        </div>
        <ChatPanel id={id} />
      </div>
    </section>
  )
}