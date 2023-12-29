import Chat from "@/components/Chat"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import getMessages from "./api/message/getAll"
import getUsers from "./api/user/getAll"
import AuthorizationProvider from "@/components/AuthProvider"

export default async function Home() {
  const messages = await getMessages()
  const users = await getUsers()

  return (
    <AuthorizationProvider>
      <main className="flex h-screen flex-wrap bg-indigo-400">
        <Header />
        <Sidebar users={users ? users : []} />
        <Chat messages={messages ? messages : []} />
      </main>
    </AuthorizationProvider>
  )
}