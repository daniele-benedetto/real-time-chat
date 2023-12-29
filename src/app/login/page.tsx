'use server'

import LoginForm from "@/components/LoginForm"
import Link from "next/link"

export default async function Login() {
  
  return (
    <main className="flex h-screen bg-indigo-400 w-full justify-center items-center flex-col">
      <h1 className="text-white text-3xl font-bold mb-5">Login at real time chat</h1>
      <LoginForm />
      <p className="text-white mt-5">Don&apos;t have an account? <Link href="/register" className="underline">Register</Link></p>
    </main>
  )
}