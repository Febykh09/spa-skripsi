
import { getAllPerusahaan } from '@/actions/perusahaan'
import TambahKontainerForm from '@/components/parts/KontainerPage/forms/TambahKontainerForm'

import React from 'react'

async function TambahKontainer() {
  const dataPerusahaan = await getAllPerusahaan() 
  return (
    <main className="w-5/6 bg-[#FDFDFD] p-10 min-h-screen">
        <TambahKontainerForm perusahaan_data={dataPerusahaan? dataPerusahaan : []}/>
    </main>
  )
}

export default TambahKontainer