import React, { useState, ReactNode, useContext } from "react";
import { signIn } from "next-auth/react"; // Importar signIn de next-auth
import { UserContext } from "@/context/userContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { signUp } = useContext(UserContext);

  if (!isOpen) return null;

  const handleLoginClick = () => {
    setIsLoginMode(true);
  };

  const handleSignUpClick = () => {
    setIsLoginMode(false);
  };

  // Función para manejar el submit del formulario de registro
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await signUp({ name, email, password });
      if (success) {
        onClose();
      } else {
        alert("Error al registrarse. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  // Función para iniciar sesión con proveedores externos
  const handleProviderLogin = (provider: string) => {
    signIn(provider);
  };

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="mt-4">
              <p className="text-sm mb-2">O inicia sesión con:</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleProviderLogin("google")}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Google
                </button>
                <button
                  onClick={() => handleProviderLogin("github")}
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                >
                  GitHub
                </button>
                <button
                  onClick={() => handleProviderLogin("facebook")}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Facebook
                </button>
              </div>
            </div>
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
            <form onSubmit={handleSignUpSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
