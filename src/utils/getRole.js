"use server";

import { cookies } from "next/headers";

export const getRole = async () => {
    const role = cookies().get("role").value
    // console.log("role >>",role)
    return role
};
