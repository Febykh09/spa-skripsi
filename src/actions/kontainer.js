"use server";

import prisma from "../../lib/prisma";

export async function createKontainerData(form) {
  try {
    const result = await prisma.kontainer.create({
      data: {
        no_nota: form.no_nota,
        ukuran_kontainer: form.ukuran_kontainer,
        hari: +form.hari,
        perusahaan_id: form.perusahaan_id,
        jumlah_uang: +form.jumlah_uang,
        status_pembayaran: form.status_pembayaran,
        jenis_kontainer: form.jenis_kontainer,
        tanggal_mulai_m1: new Date(form.tanggal_mulai_m1),
        tanggal_selesai_m1: new Date(form.tanggal_selesai_m1),
        tanggal_mulai_m2: new Date(form.tanggal_mulai_m2),
        tanggal_selesai_m2: new Date(form.tanggal_selesai_m2),
        lo: +form.lo,
        kontainer_id: JSON.stringify(form.kontainer_id),
      },
    });

    return result;
  } catch (error) {
    throw new Error(error)
  }
}

export async function getAllKontainer() {
  const data = await prisma.kontainer.findMany({
    include: {
      Perusahaan: true,
    },
  });
  return data;
}

export async function getOneKontainer(id) {
  const data = await prisma.kontainer.findFirst({
    where: {
      id: id,
    },
    include: {
      Perusahaan: true,
    },
  });
  return data;
}
export async function updateOneKontainer(id, form) {
  try {
    const data = await prisma.kontainer.update({
      where: {
        id: id,
      },
      data: {
        no_nota: form.no_nota,
        ukuran_kontainer: form.ukuran_kontainer,
        hari: +form.hari,
        perusahaan_id: form.perusahaan_id,
        jumlah_uang: +form.jumlah_uang,
        status_pembayaran: form.status_pembayaran,
        jenis_kontainer: form.jenis_kontainer,
        tanggal_mulai_m1: new Date(form.tanggal_mulai_m1),
        tanggal_selesai_m1: new Date(form.tanggal_selesai_m1),
        tanggal_mulai_m2: new Date(form.tanggal_mulai_m2),
        tanggal_selesai_m2: new Date(form.tanggal_selesai_m2),
        lo: +form.lo,
        kontainer_id: JSON.stringify(form.kontainer_id),
      },
    });
    return data;
  } catch (error) {
    throw new Error(error)
  }
}

export async function deleteOneKontainer(id) {
  const data = await prisma.kontainer.delete({
    where: {
      id: id,
    },
  });
  return data;
}


export async function updateStatusPembayaranKontainer(id) {
  try {
    const dataFind = await prisma.kontainer.findFirst({
      where : {
        id : id
      }
    })
    const data = await prisma.kontainer.update({
      where: {
        id: id,
      },
      data: {
        status_pembayaran: !dataFind.status_pembayaran,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}