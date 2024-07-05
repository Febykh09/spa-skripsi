import { getAllAlatBerat } from "@/actions/alat_berat";
import { getAllKontainer } from "@/actions/kontainer";
import { getAllLostKargo } from "@/actions/lost_kargo";
import DashboardCard from "@/components/atom/DashboardCard";
import MainContent from "@/components/parts/DashboardPage/MainContent";

export const revalidate = 0
export default async function Home() {
  const responseLostKargo = await getAllLostKargo()
  const responseKontainer = await getAllKontainer()
  const responseAlatBerat = await getAllAlatBerat()

  return (
    <main className="w-full md:w-5/6 bg-[#FDFDFD] container mx-auto pl-16 pr-12 pt-12 min-h-screen">
     <MainContent responseAlatBerat={responseAlatBerat} responseKontainer={responseKontainer} responseLostKargo={responseLostKargo}/>
    </main>
  );
}
