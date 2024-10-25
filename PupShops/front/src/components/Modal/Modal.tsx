import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  if (!isOpen) return null;

  const handleLoginClick = () => setIsLoginMode(true);
  const handleSignUpClick = () => setIsLoginMode(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {isLoginMode ? (
          // Pantalla de Login
          <div>
            <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
            <form>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full mb-4 p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Iniciar Sesión
              </button>
            </form>
            <p className="mt-4 text-sm">
              ¿No tienes una cuenta?{" "}
              <button
                onClick={handleSignUpClick}
                className="text-blue-500 hover:underline"
              >
                Regístrate
              </button>
            </p>
          </div>
        ) : (
          // Pantalla de Registro
          <div>
            <h2 className="text-2xl font-bold mb-4">Regístrate</h2>
            <form>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full mb-4 p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Registrarse
              </button>
            </form>
            <p className="mt-4 text-sm">
              ¿Ya tienes una cuenta?{" "}
              <button
                onClick={handleLoginClick}
                className="text-green-500 hover:underline"
              >
                Iniciar Sesión
              </button>
            </p>
          </div>
        )}

        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
