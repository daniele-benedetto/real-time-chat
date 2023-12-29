'use client'

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import checkUser  from "@/app/api/auth/check"
import Loader from "../Loader"

type Props = {
    children: React.ReactNode
}

const AuthorizationProvider = ({ 
    children 
}: Props): React.ReactElement | null => {

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

    if(isAuthorized === null) return <Loader />

    if(isAuthorized === false) router.push(loginRedirectPath)

    return (
        <>
            {children}
        </>
    )
}

export default AuthorizationProvider