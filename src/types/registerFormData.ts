import { Role } from "./role";

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    role: Role;
}