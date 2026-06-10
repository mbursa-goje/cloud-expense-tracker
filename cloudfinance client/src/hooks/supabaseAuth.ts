import { useEffect, useState } from "react";
import type { Session } from '@supabase/supabase-js'
import {supabase} from '../lib/supabase'

interface AuthState {
    session: Session | null;
    isLoading: boolean;
    isError: boolean;
}


export function useSupabaseAuth(){
    const [authState, setAuthState ] = useState<AuthState>({
        session: null,
        isLoading: true,
        isError: false
    })

   useEffect(()=>{
    let isMounted = true;

     const getInitialAuthSession = async () => {
        try {
        const { data: {session}, error} = await supabase.auth.getSession()
        if(!isMounted) return;
        if(error) throw error
        setAuthState({ session, isLoading: false, isError: false })
    } catch (error) {
        if (!isMounted) return;

        console.error('Auth initialization error:', error)
        setAuthState({ session: null, isLoading: false, isError: true})
    }
    }
    getInitialAuthSession()

    // Listen for auth state changes
    const { data: {subscription }} = supabase.auth.onAuthStateChange(
        (event, session) => {
            if (!isMounted) return

            console.log('Auth state changed:', event, session?.user?.email)
            setAuthState({session, isLoading: false, isError: false})
        }
    );

    return () => {
        isMounted =  false;
        subscription?.unsubscribe();
    }
   }, []);

   return authState
    
}