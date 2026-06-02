import type { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren & {
    session: any; 
    authReady: boolean;
}
export default function ProtectedRoute({children, session, authReady} : ProtectedRouteProps){
    if(!authReady){
        return null;
    }
    if(!session){
        return <Navigate to="/auth/login" replace/>
    }
    return <>{children}</>;
}