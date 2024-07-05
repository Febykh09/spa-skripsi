"use client"
import { deleteOneUser } from '@/actions/users';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function TableUsers({ allUsers }) {
  const router = useRouter()
  const handleDelete = async (id) => {
    const response = await deleteOneUser(id)
    if (response){
      alert("Success Delete")
      router.refresh()
    }
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded my-6">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Role</th>
            <th className="py-3 px-6 text-left">Created At</th>
            <th className="py-3 px-6 text-left">Updated At</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td className="py-3 px-6 text-left whitespace-nowrap">{user.id}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-left">{user.role}</td>
              <td className="py-3 px-6 text-left">{moment(user.createdAt).format("l")}</td>
              <td className="py-3 px-6 text-left">{moment(user.updatedAt).format("l")}</td>
              <td className="py-3 px-6 text-left">
                <Link href={`/users/edit/${user.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </Link>
                <button onClick={() => handleDelete(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableUsers;
