"use client"
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'

function useRole() {
    const [role, setRole] = useState("")
    useEffect(() => {
        const roleInit = Cookies.get("role")
        setRole(roleInit)
    },[])
  return {role}
}

export default useRole
