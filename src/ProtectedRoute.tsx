import type { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren & {
    session: any; 
}
export default function ProtectedRoute({children, session} : ProtectedRouteProps){
    if(!session){
        return <Navigate to="/auth/login"/>
    }
    return <>{children}</>;
}