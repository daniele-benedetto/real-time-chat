'use server'

import RegisterForm from "@/components/RegisterForm"
import Link from "next/link"
import { MdOutlineMessage } from "react-icons/md"

export default async function Register() {
  
  return (
    <main className="flex h-screen bg-indigo-400 w-full justify-center items-center flex-col">
      <div className="flex flex-col items-center mb-5">
        <MdOutlineMessage color="white" size={80} />
        <h1 className="text-white text-3xl font-bold">Register to real time chat</h1>
      </div>
      <RegisterForm />
      <p className="text-white mt-5">Already have an account? <Link href="/login" className="underline">Login</Link></p>
    </main>
  )
}