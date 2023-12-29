'use server'

import LoginForm from "@/components/LoginForm"
import Link from "next/link"
import { MdOutlineMessage } from "react-icons/md"

export default async function Login() {
  
  return (
    <main className="flex h-screen bg-indigo-400 w-full justify-center items-center flex-col">
      <div className="flex flex-col items-center mb-5">
        <MdOutlineMessage color="white" size={80} />
        <h1 className="text-white text-3xl font-bold">Login at real time chat</h1>
      </div>
      <LoginForm />
      <p className="text-white mt-5">Don&apos;t have an account? <Link href="/register" className="underline">Register</Link></p>
    </main>
  )
}