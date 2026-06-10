import type { Session } from "@supabase/supabase-js"
import type { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren & {
    session: Session | null; 
    isLoading: boolean;
}

// ProtectedRoute is the single decision point for auth-based navigation
// it reads the auth state and decides what to render
export default function ProtectedRoute({children, session, isLoading} : ProtectedRouteProps){
    if(isLoading){
        return  <div className="flex min-h-svh items-center justify-center bg-(--neutral)">
        <div className="relative h-19 w-19 animate-spin gap-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-5 w-5 rounded-full bg-(--primary)"></div>
          <div className="h-5 w-5 absolute left-1/2 -translate-x-1/2 bottom-0 rounded-full bg-(--primary)"></div>
          <div className="h-5 w-5 absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-slate-300"></div>
          <div className="h-5 w-5 absolute animate-spin right-0 -translate-y-1/2 top-1/2 rounded-full bg-slate-300"></div>
        </div>
      </div>
    }

    // redirects or renders once loaded
    if(!session){
        return <Navigate to="/auth/login" replace/>
    }
    return <>{children}</>;
}