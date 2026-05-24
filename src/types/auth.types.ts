export type AuthMode = "register" | "login";

export interface AuthFormValues{
    fullName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    terms?: boolean;
}