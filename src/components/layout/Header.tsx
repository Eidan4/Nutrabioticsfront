"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const isAdmin = user?.role === "ADMIN";
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
    setMenuOpen(false);
  };

  return (
    <header className="text-black p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center">
        <Link href="/">
          <Image 
            src="https://nutrabiotics.info/_next/static/media/logo-header.b7d59532.png" 
            alt="Logo" 
            width={100} 
            height={50} 
            className="object-contain"
          />
        </Link>
        </h1>

        {/* Menú para Desktop */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/">Home</Link>
          <Link href="/store">Tienda</Link>

          {!user ? (
            <Link href="/auth/login">Iniciar Sesión</Link>
          ) : (
            <>
              {isAdmin && <Link href="/admin/orders">Admin</Link>}
              <button
                onClick={handleLogout}
                className="text-black rounded"
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </nav>

        {/* Botón Menú Mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Menú desplegable para mobile */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col items-center bg-white text-black p-4 space-y-4">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/store" onClick={() => setMenuOpen(false)}>Tienda</Link>

          {!user ? (
            <Link href="/auth/login" onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link>
          ) : (
            <>
              {isAdmin && (
                <Link href="/admin/orders" onClick={() => setMenuOpen(false)}>Admin</Link>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded"
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}