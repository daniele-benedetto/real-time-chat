'use client'

import Avatar from "../Avatar"
import { MdOutlineMenu, MdClose, MdOutlineMessage } from "react-icons/md"
import type { RootState } from '@/redux/store'
import { setSidebar } from "@/redux/features/sidebar/sidebarSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useState } from "react"
import { useRouter } from "next/navigation"

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
            className="absolute top-14 right-4 bg-white w-48 shadow-lg p-5 rounded-md" 
            onMouseLeave={() => setLogoutMenu(false)} 
            onMouseEnter={() => setLogoutMenu(true)}
          >
            <button className="flex items-center" onClick={() => {
              localStorage.removeItem('user')
              router.push('/register')
            }}>
              <span className="mr-2">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}