import Link from "next/link";
import React from "react";
import Image from "next/image";
import portadaImage from "/public/portada.png";

export default function Landing() {
  // La función Landing debe envolver todo el contenido y el return
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src={portadaImage}
          alt="Portada"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          loading="lazy"
          priority={false}
          className="bg-cover bg-center bg-no-repeat"
        />
      </div>

      <div className="absolute inset-0 bg-pink-100/80 sm:bg-transparent sm:from-pink-100/95 sm:to-pink-100/25 sm:bg-gradient-to-r"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Lo mejor para tu amigo
            <strong className="block font-extrabold text-teal-600">
              Encontralo aca
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-xl text-gray-700">
            Descubre un mundo para tu mascota, Alimentos completos balanceados,
            Juguetes y Accesorios, y la ropa de la mejor calidad para tu amigo
            de 4 patas!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/home"
              className="block w-full rounded-full bg-teal-600 px-12 py-3 text-sm font-medium text-grey-200 shadow hover:bg-orange-300 focus:outline-none focus:ring focus:ring-purple-300 sm:w-auto transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Ingresar
            </Link>

            <Link
              href="/userDashboard/appointments/newAppointment"
              className="block w-full rounded-full bg-teal-600 px-12 py-3 text-sm font-medium text-grey-200 shadow hover:bg-orange-300 focus:outline-none focus:ring focus:ring-pink-300 sm:w-auto transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Turnos Peluqueria
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 hidden lg:block">
        <img
          src="/api/placeholder/300/300"
          alt="Happy dog"
          className="w-64 h-64 object-cover rounded-tl-full"
          loading="lazy" // Lazy loading para esta imagen también
        />
      </div>
    </section>
  );
}
