import "./App.css";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ExpensesPage from "./pages/dashboard/ExpensesPage";
import CloudAssetsPage from "./pages/dashboard/CloudAssetsPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import AuthShell from "./auth/AuthShell";

import DashboardOverview from "./pages/dashboard/DashboardOverview";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthCallback from "./auth/AuthCallback";
import { useSupabaseAuth } from "./hooks/supabaseAuth";

function App() {
  // const queryClient = useQueryClient();
  // const {data: session, isLoading: authLoading} = useQuery({
  //   queryKey: ["supabase-session"],
  //   queryFn: async () => {
  //     const {data, error} = await supabase.auth.getSession();
  //     if (error) {throw error}
  //     return data.session;
  //   }
  // })


  
  // const mrWait = (ms: number) =>
  //   new Promise((resolve) => setTimeout(resolve, ms));

  // const queryClient = useQueryClient()
  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     (_event, session) => {
  //       queryClient.setQueryData(["supabase-session"], session)
  //     },
  //   );

  //   return () => {
  //     authListener.subscription.unsubscribe();
  //   };
  // }, [queryClient]);

  const {session, isLoading } = useSupabaseAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/register" element={<AuthShell mode="register" />} />
        <Route path="/auth/login" element={<AuthShell mode="login" />} />
        <Route path="auth/callback" element={<AuthCallback/>}/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoading={isLoading} session={session ?? null}>
              <DashboardHome session={session} />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview/>}/>
          <Route path="expenses" element={<ExpensesPage />}></Route>
          <Route path="cloud-assets" element={<CloudAssetsPage />}></Route>
          <Route path="reports" element={<ReportsPage />}></Route>
          
        </Route>

        {/* Catch all 404 errors */}
        <Route path="*" element={<Navigate to="/auth/login" replace/>}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
