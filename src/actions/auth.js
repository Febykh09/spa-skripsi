"use server";
import { createJWT } from "@/utils/jwt";
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { createToken } from "@/utils/createPayloadToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAdminAccount(form) {
  // Enkripsi password dengan bcrypt
  const salt = await bcrypt.genSalt(+process.env.NEXT_PUBLIC_APP_SALT);
  const encryptedPassword = await bcrypt.hash(form.password, salt);

  const isEmailUnique = await prisma.user.findFirst({
    where: {
      email: form.email,
    },
  });

  if (isEmailUnique) {
    throw new Error("Email Sudah Dipakai!");
  }

  const response = await prisma.user.create({
    data: {
      email: form.email,
      password: encryptedPassword,
      role : "admin"
    },
  });

  return response;
}

export async function loginAdminAccount(form) {
  const isAccountExist = await prisma.user.findFirst({
    where: {
      email: form.email,
    },
  });
  if (!isAccountExist) {
    throw new Error("No Account Found!");
  }


  const isPasswordMatch = await bcrypt.compare(
    form.password,
    isAccountExist.password
  );

  if (!isPasswordMatch) {
    throw new Error("Invalid Credentials!");
  }


  if(isAccountExist.role !== "admin"){
    throw new Error("Unauthorized");
  }
  const payload = createToken(isAccountExist);
  const token = createJWT({ payload: payload });

  cookies().set("token", token, {
    expires: new Date(Date.now() + 3600 * 1000), // 1 jam
  });
  cookies().set("role", "admin", {
    expires: new Date(Date.now() + 3600 * 1000), // 1 jam
  });
}



export async function registerUserAccount(form) {
  // Enkripsi password dengan bcrypt
  const salt = await bcrypt.genSalt(+process.env.NEXT_PUBLIC_APP_SALT);
  const encryptedPassword = await bcrypt.hash(form.password, salt);

  const isEmailUnique = await prisma.user.findFirst({
    where: {
      email: form.email,
    },
  });

  if (isEmailUnique) {
    throw new Error("Email Sudah Dipakai!");
  }

  const response = await prisma.user.create({
    data: {
      email: form.email,
      password: encryptedPassword,
      role : "user"
    },
  });

  return response;
}

export async function loginUserAccount(form) {
  const isAccountExist = await prisma.user.findFirst({
    where: {
      email: form.email,
    },
  });
  if (!isAccountExist) {
    throw new Error("No Account Found!");
  }


  const isPasswordMatch = await bcrypt.compare(
    form.password,
    isAccountExist.password
  );

  if (!isPasswordMatch) {
    throw new Error("Invalid Credentials!");
  }

  // console.log(isAccountExist.role)
  if(isAccountExist.role !== "user"){
    throw new Error("Unauthorized");
  }
  const payload = createToken(isAccountExist);
  const token = createJWT({ payload: payload });

  cookies().set("token", token, {
    expires: new Date(Date.now() + 3600 * 1000), // 1 jam
  });
  cookies().set("role", "user", {
    expires: new Date(Date.now() + 3600 * 1000), // 1 jam
  });
}

export async function handleLogout(){
  cookies().delete("token")
  redirect("/login")
}
