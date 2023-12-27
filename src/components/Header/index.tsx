'use client'

import Avatar from "../Avatar"
import { MdOutlineMenu } from "react-icons/md"
import { MdClose } from "react-icons/md"
import type { RootState } from '@/redux/store'
import { setSidebar } from "@/redux/features/sidebar/sidebarSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
export default function Header() {

  const sidebar = useAppSelector((state: RootState) => state.sidebar.value)
  const dispatch = useAppDispatch()

  return (
    <header className="w-full md:p-5">
      <div className="bg-white flex w-full justify-between items-center p-5 md:rounded-md relative z-20">
        <div className="flex items-center">
          <button className="md:hidden mr-5" onClick={() => dispatch(setSidebar(!sidebar))}>
            {sidebar ? <MdClose size={24} /> : <MdOutlineMenu size={24} />}
          </button>
          <h1 className="text-xl font-bold">Real time chat</h1>
        </div>
        <div className="flex items-center">
          <Avatar name="J" />
        </div>
      </div>
    </header>
  )
}