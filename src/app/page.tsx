import { NavbarV1 } from "@/components/navbar/v1/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <NavbarV1/>
      <h1 className="container mx-auto px-4 pt-40 text-4xl font-serif font-medium text-foreground">Welcome to All American Limousine</h1>
    </div>
  );
}
