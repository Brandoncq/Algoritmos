"use client"; // Permite el uso de hooks del cliente

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function ClientNav() {
  const pathname = usePathname();

  // Solo mostrar NavBar si la ruta no es "/"
  if (pathname === "/") {
    return null;
  }

  return <NavBar />;
}
