"use server";

import prisma from "../../lib/prisma";

export async function createLostKargoData(form) {
  try {
    const result = await prisma.lostKargo.create({
      data: {
        no_nota: form.no_nota,
        lokasi_id: form.lokasi_penumpukan,
        perusahaan_id: form.perusahaan_id,
        tanggal_mulai_penumpukan: new Date(form.tanggal_mulai_penumpukan),
        tanggal_selesai_penumpukan: new Date(form.tanggal_selesai_penumpukan),
        jenis_barang: form.jenis_barang,
        satuan: +form.satuan,
        jumlah_uang: +form.jumlah_uang,
        status_pembayaran: form.status_pembayaran,
      },
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllLostKargo() {
  const data = await prisma.lostKargo.findMany({
    include: {
      Perusahaan: true,
      Lokasi: true,
    },
  });
  return data;
}

export async function getOneLostKargo(id) {
  const data = await prisma.lostKargo.findFirst({
    where: {
      id: id,
    },
    include: {
      Perusahaan: true,
      Lokasi: true,
    },
  });
  return data;
}
export async function updateOneLostKargo(id, form) {
  try {
    const data = await prisma.lostKargo.update({
      where: {
        id: id,
      },
      data: {
        no_nota: form.no_nota,
        lokasi_id: form.lokasi_penumpukan,
        perusahaan_id: form.perusahaan_id,
        tanggal_mulai_penumpukan: new Date(form.tanggal_mulai_penumpukan),
        tanggal_selesai_penumpukan: new Date(form.tanggal_selesai_penumpukan),
        jenis_barang: form.jenis_barang,
        satuan: +form.satuan,
        jumlah_uang: +form.jumlah_uang,
        status_pembayaran: form.status_pembayaran,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error)
  }
}

export async function deleteOneLostKargo(id) {
  const data = await prisma.lostKargo.delete({
    where: {
      id: id,
    },
  });
  return data;
}



export async function updateStatusPembayaranLostKargo(id) {
  try {
    const dataFind = await prisma.lostKargo.findFirst({
      where : {
        id : id
      }
    })
    const data = await prisma.lostKargo.update({
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