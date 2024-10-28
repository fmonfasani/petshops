"use client";

import React, { useState, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import pups from "../../../public/pups.png";
import SearchBar from "../SerchBar/SerchBar";
import Modal from "../Modal/Modal";
import { UserContext } from "@/context/userContext";

export default function Navbar() {
  const router = useRouter();
  const { isLogged, logOut, openModal, closeModal, isModalOpen } =
    useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLoginClick = () => {
    console.log("Abriendo modal de inicio de sesión");
    openModal();
  };

  const handleLogoutClick = () => {
    console.log("Cerrando sesión");
    logOut();
    closeModal();
    router.push("/home");
  };

  const modalContent = isLogged ? (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">¿Deseas cerrar sesión?</h2>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleLogoutClick}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Confirmar
        </button>
        <button
          onClick={closeModal}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  ) : (
    <div className="p-6">
      {/* Aquí puedes agregar el contenido del modal para usuarios no logueados */}
      <h2 className="text-xl font-semibold mb-4">Inicia sesión</h2>
      {/* Contenido adicional para login */}
    </div>
  );

  return (
    <header className="bg-gray-100 shadow-md mt-6 fixed top-0 left-0 w-full z-50">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="block text-teal-600 cursor-pointer"
        >
          <div className="p-0">
            <Image alt="logo" src={pups} width={100} height={100} />
          </div>
        </div>

        {/* Barra de búsqueda */}
        <SearchBar />

        {/* Navegación */}
        <div className="flex items-center flex-1 justify-between space-x-12">
          <nav
            aria-label="Global"
            className="hidden md:flex gap-6 text-sm flex-1"
          >
            <button
              className="text-gray-500 transition hover:text-gray-500/75"
              onClick={() => router.push("/products")}
            >
              Productos
            </button>
            <button
              className="text-gray-500 transition hover:text-gray-500/75"
              onClick={() => router.push("/cart")}
            >
              Carrito
            </button>
            <button
              className="text-gray-500 transition hover:text-gray-500/75"
              onClick={() => router.push("/aboutUs")}
            >
              Quiénes Somos
            </button>
            <button
              className="text-gray-500 transition hover:text-gray-500/75"
              onClick={() => router.push("/contact")}
            >
              Contacto
            </button>
          </nav>

          {/* Botones de Login / Logout */}
          <div className="flex items-center space-x-4">
            {isLogged ? (
              <button
                onClick={openModal}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Cerrar sesión
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                Inicio
              </button>
            )}
          </div>
        </div>

        {/* Botón para menú móvil */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <GiHamburgerMenu className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Modal Component con contenido condicional */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </header>
  );
}
