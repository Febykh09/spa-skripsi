"use server"
import prisma from "../../lib/prisma"

export async function getAllLokasi(){
    const data = await prisma.lokasi.findMany()
    return data
}