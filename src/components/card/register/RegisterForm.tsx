"use client";

import { registerUser } from "@/services/authService";
import { RegisterFormData } from "@/types/registerFormData";
import { Role } from "@/types/role";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm() {

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const onSubmit = async (data: RegisterFormData) => {
        try {
        await registerUser(data);
            setSuccessMessage("Usuario registrado con éxito!");
            setTimeout(() => router.push("/auth/login"), 2000);
        } catch (error) {
            setErrorMessage("Error al registrar el usuario.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-4 text-black">Registrate!</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Name:</label>
                        <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                        placeholder="Ingrese su nombre"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700">Email:</label>
                        <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                        placeholder="Ingrese su Email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700">Password:</label>
                        <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                        placeholder="Eliga una contraseña"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700">Role:</label>
                        <select
                        {...register("role", { required: "Role is required" })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                        >
                        <option className="text-black" value="">Select Role</option>
                        <option className="text-black" value={Role.ADMIN}>Admin</option>
                        <option className="text-black" value={Role.CLIENT}>Client</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-600 transition"
                    >
                        Registrar ahora!
                    </button>
                </form>
                <div className="text-center mt-2 text-gray-600 text-sm">
                    ¿Tienes una cuenta?{" "}
                    <a href="/auth/login" className="text-purple-500 hover:underline">
                        inicia Sesion
                    </a>
                </div>
            </div>
        </div>
    );
}
