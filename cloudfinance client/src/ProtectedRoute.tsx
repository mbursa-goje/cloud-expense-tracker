import type { Session } from "@supabase/supabase-js"
import type { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./ui/LoadingSpinner";

type ProtectedRouteProps = PropsWithChildren & {
    session: Session | null; 
    isLoading: boolean;
}

// ProtectedRoute is the single decision point for auth-based navigation
// it reads the auth state and decides what to render
export default function ProtectedRoute({children, session, isLoading} : ProtectedRouteProps){
    if(isLoading){
        return <LoadingSpinner/>
    }

    // redirects or renders once loaded
    if(!session){
        return <Navigate to="/auth/login" replace/>
    }
    return <>{children}</>;
}