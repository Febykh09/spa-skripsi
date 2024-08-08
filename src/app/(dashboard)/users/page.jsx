import { getAllUsers } from "@/actions/users";
import TableUsers from "@/components/parts/UsersPage/TableUsers";
import Link from "next/link";
import React from "react";

async function UsersPage() {
    const allUsers = await getAllUsers()
  return (
    <main className="w-full md:w-5/6 bg-[#FDFDFD] container mx-auto pl-16 pr-12 pt-12 min-h-screen">
      <h1 className="text-3xl font-bold leading-snug tracking-wide text-[#9F9F9F]">Users</h1>
      <div className="flex justify-end">
        <Link href={"/signup"}><button className="px-3 py-3 rounded-2xl bg-[#FFFFFF] border border-[#5F5F5F] hover:text-[#FFFFFF] hover:bg-[#2C71E1]">Buat Akun User</button></Link>
      </div>
      <TableUsers allUsers={allUsers} />
    </main>
  );
}

export default UsersPage;
