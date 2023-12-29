'use client'

import Avatar from "../Avatar"
import { MdOutlineMenu, MdClose, MdOutlineMessage } from "react-icons/md"
import type { RootState } from '@/redux/store'
import { setSidebar } from "@/redux/features/sidebar/sidebarSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MdLogout } from "react-icons/md"
import socket from "@/lib/socket"

export default function Header() {

  const router = useRouter()
  const sidebar = useAppSelector((state: RootState) => state.sidebar.value)
  const user = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const [logoutMenu, setLogoutMenu] = useState(false)

  return (
    <header className="w-full md:p-5">
      <div className="bg-white flex w-full justify-between items-center p-5 md:rounded-md relative z-20">
        <div className="flex items-center">
          <button className="md:hidden mr-5" onClick={() => dispatch(setSidebar(!sidebar))}>
            {sidebar ? <MdClose size={24} /> : <MdOutlineMenu size={24} />}
          </button>
          <div className="flex items-center">
            <MdOutlineMessage size={32} />
          </div>
        </div>
        <div className="flex items-center" onMouseLeave={() => setLogoutMenu(false)} onMouseEnter={() => setLogoutMenu(true)}>
          <Avatar name={user.name} backgroundColor={user.backgroundColor} textColor={user.textColor} />
        </div>
        {logoutMenu && (
          <div 
            className="absolute top-14 right-4 bg-white w-48 shadow-lg rounded-md" 
            onMouseLeave={() => setLogoutMenu(false)} 
            onMouseEnter={() => setLogoutMenu(true)}
          >
            <button className="flex items-center w-full border justify-between p-5" onClick={() => {
              localStorage.removeItem('user')
              socket.emit('disconnected', user)
              router.push('/login')
            }}>
              <span>Logout</span>
              <MdLogout size={24} />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}