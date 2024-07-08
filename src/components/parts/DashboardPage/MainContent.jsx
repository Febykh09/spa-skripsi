"use client";
import DashboardCard from "@/components/atom/DashboardCard";
import { convertToRupiah } from "@/utils/formatCurrency";
import React, { useState } from "react";

function MainContent({
  responseLostKargo,
  responseKontainer,
  responseAlatBerat,
}) {
  const [filterBulan, setFilterBulan] = useState("");
  const [filterTahun, setFilterTahun] = useState("");

  const handleFilterBulan = (event) => {
    setFilterBulan(event.target.value);
  };

  const handleFilterTahun = (event) => {
    setFilterTahun(event.target.value);
  };

  const filterByBulan = (data, tanggalField) => {
    if (filterBulan === "" && filterTahun === "") {
      return data;
    } else {
      return data.filter((item) => {
        const tanggal = new Date(item[tanggalField]);
        const monthValue = tanggal.getMonth() + 1;
        const yearValue = tanggal.getFullYear().toString();

        let monthMatches = true;
        let yearMatches = true;

        if (filterBulan !== "") {
          monthMatches = monthValue.toString() === filterBulan;
        }

        if (filterTahun !== "") {
          yearMatches = yearValue === filterTahun;
        }

        return monthMatches && yearMatches;
      });
    }
  };

  const calculateTotalTagihan = (filteredData) => {
    return filteredData.reduce((total, item) => total + item.jumlah_uang, 0);
  };

  const filteredLostKargo = filterByBulan(
    responseLostKargo,
    "tanggal_selesai_penumpukan"
  );
  const filteredKontainer = filterByBulan(
    responseKontainer,
    "tanggal_selesai_m2"
  );
  const filteredAlatBerat = filterByBulan(
    responseAlatBerat,
    "tanggal_selesai_penumpukan"
  );

  const totalLostKargoTagihan = calculateTotalTagihan(filteredLostKargo);
  const totalKontainerTagihan = calculateTotalTagihan(filteredKontainer);
  const totalAlatBeratTagihan = calculateTotalTagihan(filteredAlatBerat);

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold leading-snug tracking-wide text-[#9F9F9F]">
          Dashboard
        </h1>
        <div className="flex flex-row gap-x-4">
          <select
            className="rounded-2xl px-4 py-3.5 border"
            id="bulan"
            name="bulan"
            value={filterBulan}
            onChange={handleFilterBulan}
            >
            <option value="">Bulan</option>
            <option value="1">Januari</option>
            <option value="2">Februari</option>
            <option value="3">Maret</option>
            <option value="4">April</option>
            <option value="5">Mei</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">Agustus</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
          </select>

          <select
            className="rounded-2xl px-4 py-3.5 border"
            id="tahun"
            name="tahun"
            value={filterTahun}
            onChange={handleFilterTahun}
            >
            <option value="">Tahun</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
          </select>
        </div>
      </div>
      
      <ul className="grid md:grid-cols-3 gap-10 mt-10 justify-between">
        <li>
          <DashboardCard
            title={"Lost Kargo"}
            jumlah={filteredLostKargo.length}
            link={"/lost_kargo"}
            icon={"/icon/lost kargo.png"}
          />
        </li>
        <li>
          <DashboardCard
            title={"Kontainer"}
            jumlah={filteredKontainer.length}
            link={"/kontainer"}
            icon={"/icon/kontainer.png"}
          />
        </li>
        <li>
          <DashboardCard
            title={"Alat Berat"}
            jumlah={filteredAlatBerat.length}
            link={"/alat_berat"}
            icon={"/icon/alat berat.png"}
          />
        </li>
      </ul>

    <div className="flex flex-col gap-y-12">
      <h3 className="text-2xl font-semibold leading-snug text-[#202020] mt-24">
        Tagihan
      </h3>
      <div className="flex flex-col gap-y-8">
        {/* Title */}
        <div className="flex flex-row gap-x-64 items-center border-b-2 pb-3">
          <h4 className="text-lg font-semibold leading-normal text-[#202020]">Lost Kargo</h4>
          <h4 className="text-lg font-semibold leading-normal text-[#202020]">Kontainer</h4>
          <h4 className="text-lg font-semibold leading-normal text-[#202020]">Alat Berat</h4>
        </div>

        {/* Content */}
        <div className="flex flex-row gap-x-[230px]">
          <p className="text-base font-medium leading-relaxed tracking-wider text-[#3C3C3C]">{convertToRupiah(totalLostKargoTagihan)}</p>
          <p className="text-base font-medium leading-relaxed tracking-wider text-[#3C3C3C]">{convertToRupiah(totalKontainerTagihan)}</p>
          <p className="text-base font-medium leading-relaxed tracking-wider text-[#3C3C3C]">{convertToRupiah(totalAlatBeratTagihan)}</p>
        </div>
      </div>
    </div>  
  </div>
  );
}

export default MainContent;
