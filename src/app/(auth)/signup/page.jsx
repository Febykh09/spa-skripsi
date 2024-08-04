import React from 'react'
import ContentSignUpPage from './content'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function SignUpPage() {
  const isTokenExist = cookies().get("token");
  const role = cookies().get("role")
  if (!isTokenExist?.value) {
    redirect("/admin/login");
  }
  if(role?.value !== "admin"){
    redirect("/login")
  }
  return (
   <ContentSignUpPage />
  )
}

export default SignUpPage
