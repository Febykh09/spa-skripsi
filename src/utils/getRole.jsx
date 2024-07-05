"use client"
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'

function getRole() {
    const [role, setRole] = useState("")
    useEffect(() => {
        const roleInit = Cookies.get("role")
        setRole(roleInit)
    },[])
  return {role}
}

export default getRole
