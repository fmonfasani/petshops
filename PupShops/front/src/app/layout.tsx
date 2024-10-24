"use client";

import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/cartContext";
import NavbarContainer from "@/components/Navbar/NavbarContainer";
import Chatbot from "../components/ChatBot/chatbot";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <CartProvider>
            <NavbarContainer />
            {children}
            <Footer />
            <Chatbot />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
