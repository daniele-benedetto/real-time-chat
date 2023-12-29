'use server'

import RegisterForm from "@/components/RegisterForm"
import Link from "next/link"

export default async function Register() {
  
  return (
    <main className="flex h-screen bg-indigo-400 w-full justify-center items-center flex-col">
      <h1 className="text-white text-3xl font-bold mb-5">Register to real time chat</h1>
      <RegisterForm />
      <p className="text-white mt-5">Already have an account? <Link href="/login" className="underline">Login</Link></p>
    </main>
  )
}