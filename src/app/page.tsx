import Chat from "@/components/Chat"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import getMessages from "./api/message/getAll"
import getUsers from "./api/user/getAll"
import { attachSocketToServer } from "@/lib/redis"

export default async function Home() {
  const messages = await getMessages()
  const users = await getUsers()
  const server = attachSocketToServer()

  console.log(server)



  return (
    <main className="flex h-screen flex-wrap bg-indigo-400">
      <Header />
      <Sidebar users={users ? users : []} />
      <Chat messages={messages ? messages : []} />
    </main>
  )
}