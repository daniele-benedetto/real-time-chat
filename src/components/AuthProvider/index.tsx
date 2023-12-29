'use client'

import React, { useEffect, useState } from "react"
import { useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/navigation"
import checkUser  from "@/app/api/auth/check"

//Types
type Props = {
    children: React.ReactNode
}

const AuthorizationProvider = ({ 
    children 
}: Props) => {

    const router = useRouter()
    const loginRedirectPath = '/login'

    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user') || '{}' ).token

        if(!token) {
            router.push(loginRedirectPath)
        }
        
        async function checkUserAuth() {
            const result = await checkUser(token || '')
            if (result?.error) {
                setIsAuthorized(false)
            } else {
                setIsAuthorized(true)
            }
        }
        checkUserAuth()
    }, [])

    if(isAuthorized === null) {
        return null
    }

    if(isAuthorized === false) {
        router.push(loginRedirectPath)
    }

    return (
        <>
            {children}
        </>
    )
}

export default AuthorizationProvider