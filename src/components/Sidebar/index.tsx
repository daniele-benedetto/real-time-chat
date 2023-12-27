'use client'

import { useAppSelector } from "@/redux/hooks"
import SidebarItem from "../SidebarItem"
import { RootState } from "@/redux/store"

export default function Sidebar() {

  const sidebar = useAppSelector((state: RootState) => state.sidebar.value)

  const fakeUsers = [
    {
      id: 1,
      name: 'John Doe',
      online: true,
    },
    {
      id: 2,
      name: 'Jane Doe',
      online: false,
    },
    {
      id: 3,
      name: 'Mario Rossi',
      online: true,
    }
  ]

  return (
    <section className={`w-full md:w-1/4 md:p-5 md:pr-0 h-screen md:h-[calc(100vh-120px)] md:relative absolute z-10 md:pt-0 pt-24 top-0 left-0 ${sidebar ? '-translate-x-0 md:-translate-x-0' : '-translate-x-full md:-translate-x-0'} transition duration-300 ease-in-out`}>
      <div className="flex flex-col h-full w-full bg-white p-5 md:rounded-md overflow-auto">
        <div className="flex flex-col">
          {fakeUsers.map(user => {
            return (
              <SidebarItem user={user} key={user.id} />
            )
          })}
        </div>
      </div>
    </section>
  )
}