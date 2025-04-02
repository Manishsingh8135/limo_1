import { NavbarV1 } from "@/components/navbar/v1/Navbar";
import { Hero } from "@/components/hero/v1";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <NavbarV1 />
      <Hero />
    </main>
  );
}
