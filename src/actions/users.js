"use server"
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";

export async function getAllUsers() {
  const allData = await prisma.user.findMany();
  return allData;
}

export async function getOneUser(id) {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  return user;
}


export async function deleteOneUser(id) {
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return user;
}



export async function updateOneUser(id, newData) {
  try {
    // Pastikan user dengan ID yang diberikan ada di database
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }
    if (newData.password) {
      let newPassword = "";
      // Enkripsi password dengan bcrypt
      const salt = await bcrypt.genSalt(+process.env.NEXT_PUBLIC_APP_SALT);
      const encryptedPassword = await bcrypt.hash(newData.password, salt);
      newPassword = encryptedPassword

      // Lakukan update data user
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          email: newData.email,
          role: newData.role,
          password : newPassword
        },
      });

      return updatedUser;
    } else {
      // Lakukan update data user
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          email: newData.email,
          role: newData.role,
        },
      });

      return updatedUser;
    }
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}
