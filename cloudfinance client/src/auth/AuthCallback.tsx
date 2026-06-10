import { replace, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const completeOAuthFlow = async () => {
      try {
        // get the session that supabase just set from the callback URL
        const { data: {session}, error } = await supabase.auth.getSession();

      if (error) {
        console.error('OAuth session retrieval failed:', error)
        navigate("/auth/login", {replace: true});
        return;
      }

      // Session will be picked up by the auth listener in the app root
       if (!session) {
        navigate("/auth/login", { replace: true });
        return
      } 

      // success: session exists. Navigate with replace is used to avoid double entries
      navigate('/dashboard', {replace: true})
      } catch (error) {
        console.error('OAuth callback error:', error);
        navigate('/auth/login', { replace: true});
      }
      
     
    };
   completeOAuthFlow();
  }, [navigate]);
  return (
    <div className="flex min-h-svh items-center justify-center bg-(--neutral)">
      <div className="relative h-19 w-19 animate-spin gap-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-5 w-5 rounded-full bg-(--primary)"></div>
        <div className="h-5 w-5 absolute left-1/2 -translate-x-1/2 bottom-0 rounded-full bg-(--primary)"></div>
        <div className="h-5 w-5 absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-slate-300"></div>
        <div className="h-5 w-5 absolute animate-spin right-0 -translate-y-1/2 top-1/2 rounded-full bg-slate-300"></div>
      </div>
    </div>
  );
}
