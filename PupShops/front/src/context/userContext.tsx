"use client";
import React, { createContext, useState } from "react";
import {
  ILoginResponse,
  ILoginUser,
  IUserRegister,
  IUserResponse,
  IUserContextType,
} from "../Interfaces/interfaces";
import { login, fetchRegisterUser } from "@/utils/fetchUser";
import { fetchAdminCreateUser } from "@/utils/fetchAdminCreateUser";

// Crear contexto con valores iniciales
export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  isAdmin: false,
  setIsAdmin: () => {},
  setIsLogged: () => {},
  signIn: async () => false,
  signUp: async () => false,
  signUpRegister: async () => false,
  logOut: () => {},
  token: null,
  setToken: () => {},
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  // Estado del modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Funciones para abrir y cerrar el modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Función para iniciar sesión
  const signIn = async (credentials: ILoginUser): Promise<boolean> => {
    try {
      const data: ILoginResponse = await login(credentials);
      if (data.success) {
        if (typeof window !== "undefined") {
          const userData = {
            token: data.token,
            user: data.findUser,
          };
          localStorage.setItem("authData", JSON.stringify(userData));

          setUser({
            succes: true,
            token: data.token,
            user: data.findUser,
          });

          setToken(data.token);
          setIsLogged(true);

          if (data.findUser) {
            setIsAdmin(data.findUser.isAdmin);
          } else {
            setIsAdmin(false);
          }

          return true;
        }
        console.error("Window object is not available");
        return false;
      } else {
        console.error("Login failed. User may not exist.");
        return false;
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      return false;
    }
  };

  // Función para registrarse (corregida y agregada)
  const signUp = async (user: IUserRegister): Promise<boolean> => {
    try {
      const data = await fetchRegisterUser(user);
      if (data) {
        await signIn({ email: user.email, password: user.password });
        return true;
      }
      console.error(`Registration failed: ${JSON.stringify(data)}`);
      return false;
    } catch (error) {
      console.error(
        `Error during sign up: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      return false;
    }
  };

  // Función para registro administrativo (corregida y agregada)
  const signUpRegister = async (userAdmin: IUserRegister): Promise<boolean> => {
    try {
      let token: string | null = null;

      if (typeof window !== "undefined") {
        const storedAuthData = localStorage.getItem("authData");
        token = storedAuthData ? JSON.parse(storedAuthData).token : null;
      }

      if (!token) {
        console.error(
          "No se encontró un token válido para realizar el registro."
        );
        return false;
      }

      const data = await fetchAdminCreateUser(userAdmin, token);

      if (
        data &&
        typeof data === "string" &&
        data.includes("Cuenta creada correctamente")
      ) {
        return true;
      } else {
        console.error("Registro fallido:", data);
        return false;
      }
    } catch (error) {
      console.error("Error durante el registro de administrador:", error);
      return false;
    }
  };

  // Función para cerrar sesión
  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authData");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("purchasedItems");
      setUser(null);
      setToken(null);
      setIsLogged(false);
      setIsAdmin(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        token,
        setToken,
        isAdmin,
        setIsAdmin,
        signIn,
        signUp,
        signUpRegister,
        logOut,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
