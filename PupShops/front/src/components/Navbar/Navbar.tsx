"use client";

import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from "next/image";
import pups from "../../../public/pups.png";
import SearchBar from "../SerchBar/SerchBar";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAppointmentOpen, setAppointmentOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeAllMenus = () => {
    setAppointmentOpen(false);
    setIsProfileOpen(false);
  };

  const handleMenuClick = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    current: boolean
  ) => {
    if (current) {
      setter(false);
    } else {
      closeAllMenus();
      setter(true);
    }
  };

  const handleProfileMenuClick = (route: string) => {
    router.push(route);
    closeAllMenus();
  };

  const handleAppointmentMenuClick = (route: string) => {
    router.push(route);
    closeAllMenus();
  };

  return (
    <header className="bg-gray-100 shadow-md mt-6 fixed top-0 left-0 w-full z-50">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div
          onClick={() => router.push("/")}
          className="block text-teal-600 cursor-pointer"
        >
          <div className="p-0">
            <Image alt="logo" src={pups} width={100} height={100} />
          </div>
        </div>
        <SearchBar />
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
            {/* Menu Peluquería */}
            <div className="relative group">
              <button
                className="text-gray-500 transition hover:text-gray-500/75"
                onClick={() =>
                  handleMenuClick(setAppointmentOpen, isAppointmentOpen)
                }
              >
                Peluquería
              </button>
              {isAppointmentOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() =>
                      handleAppointmentMenuClick(
                        "/userDashboard/appointments/newAppointment"
                      )
                    }
                  >
                    Nuevo turno
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() =>
                      handleAppointmentMenuClick("/userDashboard/appointments")
                    }
                  >
                    Historial de turnos
                  </button>
                </div>
              )}
            </div>

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
              Quienes Somos
            </button>
            <button
              className="text-gray-500 transition hover:text-gray-500/75"
              onClick={() => router.push("/contact")}
            >
              Contacto
            </button>
            <div className="relative group">
              <button
                className="text-gray-500 transition hover:text-gray-500/75"
                onClick={() => handleMenuClick(setIsProfileOpen, isProfileOpen)}
              >
                Perfil
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() =>
                      handleProfileMenuClick("/userDashboard/register")
                    }
                  >
                    Registrarse
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() =>
                      handleProfileMenuClick("/userDashboard/login")
                    }
                  >
                    Ingresar
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleProfileMenuClick("/ProfilePage")}
                  >
                    Panel de Usuario
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <GiHamburgerMenu className="text-gray-500" />
          </button>
          {isOpen && (
            <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-lg z-50">
              <div className="flex flex-col items-end bg-gray-100">
                <button
                  className="flex justify-end w-full p-2 text-gray-700 hover:bg-gray-200"
                  onClick={toggleMenu}
                >
                  <IoClose />
                </button>
                <button
                  className="flex justify-end w-full p-2 text-gray-700 hover:bg-gray-200"
                  onClick={() =>
                    handleMenuClick(setAppointmentOpen, isAppointmentOpen)
                  }
                >
                  Peluquería
                </button>
                {isAppointmentOpen && (
                  <div className="flex flex-col">
                    <button
                      className="flex justify-end w-full p-2 text-gray-700 hover:bg-gray-200"
                      onClick={() =>
                        handleAppointmentMenuClick(
                          "/userDashboard/appointments/newAppointment"
                        )
                      }
                    >
                      Nuevo turno
                    </button>
                    <button
                      className="flex justify-end w-full p-2 text-gray-700 hover:bg-gray-200"
                      onClick={() =>
                        handleAppointmentMenuClick(
                          "/userDashboard/appointments"
                        )
                      }
                    >
                      Historial de turnos
                    </button>
                  </div>
                )}

                <button
                  className="flex justify-end w-full p-2 text-gray-700 hover:bg-gray-200"
                  onClick={() => router.push("/cart")}
                >
                  Carrito
                </button>
                <button
                  className="flex justify-end w-full p-2 text-gray-700 hover:bg-gray-200"
                  onClick={() => router.push("/aboutUs")}
                >
                  Quienes Somos
                </button>
                <button
                  className="flex justify-end w-full p-2 text-gray-700 hover:bg-gray-200"
                  onClick={() => router.push("/contact")}
                >
                  Contacto
                </button>
                <div className="relative group">
                  <button
                    className="flex justify-end w-full p-2 text-gray-700 hover:bg-gray-200"
                    onClick={() =>
                      handleMenuClick(setIsProfileOpen, isProfileOpen)
                    }
                  >
                    Perfil
                  </button>
                  {isProfileOpen && (
                    <div className="flex flex-col pl-4 bg-gray-100 items-end">
                      <button
                        className="p-2 text-gray-700 hover:bg-gray-200 w-full text-right"
                        onClick={() =>
                          handleProfileMenuClick("/userDashboard/register")
                        }
                      >
                        Registrarse
                      </button>
                      <button
                        className="p-2 text-gray-700 hover:bg-gray-200 w-full text-right"
                        onClick={() =>
                          handleProfileMenuClick("/userDashboard/login")
                        }
                      >
                        Iniciar sesion
                      </button>
                      <button
                        className="p-2 text-gray-700 hover:bg-gray-200 w-full text-right"
                        onClick={() => handleProfileMenuClick("/ProfilePage")}
                      >
                        Panel de Usuario
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
