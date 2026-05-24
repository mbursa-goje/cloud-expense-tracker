import "./App.css";
import AuthShell from "./auth/AuthShell";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace/>}/>
        <Route path="/auth/register" element={<AuthShell mode="register"/>}/>
        <Route path="/auth/login" element={<AuthShell mode="login"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
