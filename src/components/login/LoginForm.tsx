"use client";

import { LoginUser } from "@/services/authService";
import { LoginFormData } from "@/types/user/loginFormData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorModal from "@/components/modal/ErrorModal"; // Importamos el modal de error

export default function LoginForm() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false); // Estado para manejar el modal

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await LoginUser(data);

            if (response.user.role === "ADMIN") {
                router.push("/admin/orders");
            } else {
                router.push("/");
            }
        } catch (error) {
            setErrorMessage("Email o contraseña incorrectos.");
            setShowModal(true); // Mostrar el modal cuando haya error
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="flex justify-center mb-4">
                    <img
                        src="https://nutrabiotics.info/_next/static/media/logo-header.b7d59532.png"
                        alt="Logo"
                        className="w-20"
                    />
                </div>
                <h2 className="text-2xl font-bold text-center">¡Bienvenido de nuevo!</h2>
                <p className="text-gray-500 text-center mb-6">
                    Inicia sesión con tus credenciales para continuar
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <input
                            type="email"
                            {...register("email", { required: "Email es requerido" })}
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                        {errors.email?.message && (
                            <p className="text-red-500 text-sm mt-1">
                                {String(errors.email.message)}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            {...register("password", { required: "Contraseña es requerida" })}
                            placeholder="Contraseña"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {String(errors.password.message)}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-600 transition"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <div className="text-center mt-2 text-gray-600 text-sm">
                    ¿No tienes una cuenta?{" "}
                    <a href="/auth/register" className="text-purple-500 hover:underline">
                        Comienza ahora
                    </a>
                </div>
            </div>

            {/* Modal de error */}
            {showModal && (
                <ErrorModal
                    message={errorMessage}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}
