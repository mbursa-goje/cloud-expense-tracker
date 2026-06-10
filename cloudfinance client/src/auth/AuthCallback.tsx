import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";
import LoadingSpinner from "@/ui/LoadingSpinner";

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
   <LoadingSpinner/>
  );
}
