import "./App.css";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ExpensesPage from "./pages/dashboard/ExpensesPage";
import CloudAssetsPage from "./pages/dashboard/CloudAssetsPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import AuthShell from "./auth/AuthShell";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [session, setSession] = useState<any>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);
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
      setAuthReady(true);
    }
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // if (_event === "INITIAL_SESSION") {
        //   return;
        // }
        setSession(session);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/register" element={<AuthShell mode="register" />} />
        <Route path="/auth/login" element={<AuthShell mode="login" />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute authReady={authReady} session={session}>
              <DashboardHome session={session} />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview/>}/>
          <Route path="expenses" element={<ExpensesPage />}></Route>
          <Route path="cloud-assets" element={<CloudAssetsPage />}></Route>
          <Route path="reports" element={<ReportsPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
