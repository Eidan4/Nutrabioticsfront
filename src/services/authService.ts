import { useAuthStore } from "@/store/authStore";
import { RegisterFormData } from "@/types/registerFormData";
import { AuthResponse } from "@/types/user/authResponse";
import { LoginFormData } from "@/types/user/loginFormData";
import axios from "axios";


export const LoginUser = async (loginData: LoginFormData): Promise<AuthResponse> => {
    try {
        const response = await axios.post("http://localhost:9000/api/auth/login", loginData, {
            headers: { "Content-Type": "application/json" },
        });
        
        const { token, user } = response.data;
        useAuthStore.getState().setAuth(token, user);

        return response.data;
    } catch (error) {
        console.error("Error en el login:", error);
        throw error;
    }
};

export const registerUser = async (registerData: RegisterFormData): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:9000/api/auth/register", registerData, {
        headers: { "Content-Type": "application/json" },
      });
  
      return ;
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
};