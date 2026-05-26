import "./App.css";
import AuthShell from "./auth/AuthShell";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [session, setSession] = useState<any>(null);
  const mrWait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const fetchSession = async () => {
    try {
      const [currentSession] = await Promise.all([
        supabase.auth.getSession(),
        mrWait(600),
      ]);
      setSession(currentSession.data.session);
      console.log(currentSession.data.session);
    } catch (error) {
      console.error("Error fetching session:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (_event === "INITIAL_SESSION") {
          return;
        }
        setSession(session);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
     (
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route
            path="/auth/register"
            element={<AuthShell mode="register" />}
          />
          <Route path="/auth/login" element={<AuthShell mode="login" />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute session={session}>
                <Dashboard session={session} />
              </ProtectedRoute>
            }
          />
        </Routes>
      )
    </BrowserRouter>
  );
}

export default App;
