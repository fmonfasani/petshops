"use client";

import CardListCatFood from "@/components/CardList/CardListCatFood";
import CardListDogFood from "@/components/CardList/CardListDogFood";
import Carousel from "@/components/Carousel/Carousel";
import Testimonials from "@/components/Testimonials/Testimonials";
import Modal from "@/components/Modal/Modal";
import LoginPage from "@/components/Forms/FormsUser/LoginUser";
import RegisterUser from "@/components/Forms/FormsUser/RegisterUser";
import React, { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";

export default function HomeContainer() {
  const { isModalOpen, openModal, closeModal } = useContext(UserContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  return (
    <div>
      <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {isLoginMode ? <LoginPage setToken={() => {}} /> : <RegisterUser />}
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="mt-4 text-blue-500"
          >
            {isLoginMode
              ? "¿No tienes una cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </Modal>
      </div>
      <Carousel />
      <CardListDogFood />
      <CardListCatFood />
      <Testimonials />
    </div>
  );
}
