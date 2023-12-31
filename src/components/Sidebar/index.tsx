'use client'

import { useAppSelector } from "@/redux/hooks"
import SidebarItem from "../SidebarItem"
import { RootState } from "@/redux/store"
import User from "@/models/User"
import { useEffect, useState } from "react"
import socket from "@/lib/socket"
interface Props {
  users: User[]
}

export default function Sidebar({users}:Props) {

  const sidebar = useAppSelector((state: RootState) => state.sidebar.value)
  const user = useAppSelector((state: RootState) => state.user)

  const [usersList, setUsersList] = useState<User[]>([])

  useEffect(() => {
    if(user.id === 0) return

    socket.on('connected', (usersOnline:User[]) => {
      const updatedUsers = users.map(user => {
        usersOnline.map((userOnline: User) => {
          if(user.id == userOnline.id) {
            user.online = true
          }
        })
        return user
      })
      setUsersList(updatedUsers)
    })

    socket.on('disconnected', (usersOnline:User[]) => {
      const updatedUsers = users.map(user => {
        usersOnline.map((userOnline: User) => {
          if(user.id == userOnline.id) {
            user.online = true
          } else {
            user.online = false
          }
        })
        return user
      })
      setUsersList(updatedUsers)
    })

    socket.emit('connected', user)

  }, [user, users])

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      socket.emit('disconnected', user)
    })
  }, [user])

  return (
    <section className={`w-full md:w-1/4 md:p-5 md:pr-0 h-screen md:h-[calc(100vh-120px)] md:relative absolute z-10 md:pt-0 pt-24 top-0 left-0 ${sidebar ? '-translate-x-0 md:-translate-x-0' : '-translate-x-full md:-translate-x-0'} transition duration-300 ease-in-out`}>
      <div className="flex flex-col h-full w-full bg-white p-5 md:rounded-md overflow-auto">
        <div className="flex flex-col">
          {usersList.length > 0 && usersList.map(user => {
            return <SidebarItem user={user} key={user.id} />
          })}
        </div>
      </div>
    </section>
  )
}