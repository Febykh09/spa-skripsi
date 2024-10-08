
import { getAllLokasi } from '@/actions/lokasi'
import { getAllPerusahaan } from '@/actions/perusahaan'
import TambahLostKargoForm from "@/components/parts/LostKargoPage/forms/TambahLostKargoForm"
import React from 'react'

async function TambahLostKargoPage() {
  const dataPerusahaan = await getAllPerusahaan() 
  const dataLokasi = await getAllLokasi()
  return (
    <main className="w-5/6 bg-[#FDFDFD] p-10 min-h-screen">
        <TambahLostKargoForm lokasiData={dataLokasi? dataLokasi : []} perusahaan_data={dataPerusahaan? dataPerusahaan : []}/>
    </main>
  )
}

export default TambahLostKargoPage