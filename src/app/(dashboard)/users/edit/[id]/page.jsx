import React from "react";
import { getOneUser } from "@/actions/users";
import EditUserForm from "@/components/parts/UsersPage/form/EditUserForm";
export const revalidate = 0
async function EditUsersPage({ params }) {
  const dataUser = await getOneUser(params.id);
  return (
    <main className="w-5/6 bg-gray-200 p-10 min-h-screen">
      <EditUserForm
        defaultData={dataUser ? dataUser : []}
      />
    </main>
  );
}

export default EditUsersPage;
