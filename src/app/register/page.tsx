'use server'

import RegisterForm from "@/components/RegisterForm"

export default async function Register() {
  
  return (
    <main className="flex h-screen bg-indigo-400 w-full justify-center items-center">
      <RegisterForm />
    </main>
  )
}