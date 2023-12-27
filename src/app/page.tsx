import Chat from "@/components/Chat";
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import getMessages from "./api/message/getAll";

export default async function Home() {
  const messages = await getMessages()

  return (
    <main className="flex h-screen flex-wrap bg-indigo-400">
      <Header />
      <Sidebar />
      <Chat messages={messages ? messages : []} />
    </main>
  )
}