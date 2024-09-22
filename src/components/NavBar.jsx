"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const NavBar = () => {
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
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="w-full px-5 flex flex-wrap items-center justify-between mx-auto py-4">
        <Link href="/" className="block py-2 px-1 text-white">
          Inicio
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
    </nav>
  );
};

export default NavBar;
