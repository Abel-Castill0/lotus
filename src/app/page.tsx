import Hero from "@/components/layout/Hero";
import AboutUs from "@/components/layout/AboutUs";
import Novedades from "@/components/layout/Novedades";
import MasVendidos from "@/components/layout/MasVendidos";
import Proximamente from "@/components/layout/Proximamente";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Novedades />
      <MasVendidos />
      <Proximamente />
    </>
  );
}
