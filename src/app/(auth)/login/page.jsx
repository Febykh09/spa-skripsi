import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ContentLoginPage from "./content";

function LoginPage() {
  const isTokenExist = cookies().get("token");
  if (isTokenExist?.value) {
    redirect("/");
  }
  return (
    <>
      <ContentLoginPage />
    </>
  );
}

export default LoginPage;
