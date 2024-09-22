"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
export default function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Para hacer referencia al dropdown

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Manejar clics fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Cerrar dropdown si se hace clic fuera
      }
    };

    // Agregar evento de clic global
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el evento al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div className="w-full h-lvh bg-image flex justify-center">
      <div className="w-full h-full bg-image flex">
        <div className="text-white w-full flex items-center py-20 justify-center">
          <div className="flex-col justify-center flex bg-blur rounded-lg my-2 px-10 w-full">
            <h1 className="text-center my-10 text-5xl font-medium">
              ALGORITMOS CONGRUENCIALES
            </h1>
            <ul className="flex p-4 space-x-8 rtl:space-x-reverse flex-row text-3xl font-light justify-center">
              <li>
                <Link
                  href="/Multiplicativo"
                  className="block py-2 px-1 text-white hover:bg-zinc-700 rounded"
                  aria-current="page"
                >
                  Multiplicativo
                </Link>
              </li>
              <li>
                <Link
                  href="/Aditivo"
                  className="block py-2 px-1 text-white hover:bg-zinc-700 rounded"
                >
                  Aditivo
                </Link>
              </li>

              {/* Dropdown que aparecerá al hacer clic */}
              <li className="relative inline-block" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="py-2 px-4 text-white hover:bg-zinc-700 rounded"
                >
                  No Lineal
                </button>

                {/* Dropdown - submenú vertical */}
                {showDropdown && (
                  <ul
                    className={`absolute top-full right-0 bg-zinc-700 mt-2 shadow-lg p-2 rounded`}
                  >
                    <li className="py-2 px-4 text-white hover:bg-zinc-600 rounded">
                      <Link href="/NoLineal/Cuadratico">Cuadrático</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
