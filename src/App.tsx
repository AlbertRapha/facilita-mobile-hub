import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/mobile/ProtectedRoute";
import MobileLayout from "@/components/mobile/MobileLayout";

// Pages
import Login from "./pages/Login";
import Home from "./pages/cliente/Home";
import Busca from "./pages/cliente/Busca";
import Agenda from "./pages/cliente/Agenda";
import Mensagens from "./pages/cliente/Mensagens";
import Perfil from "./pages/cliente/Perfil";
import Dashboard from "./pages/prestador/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes with Mobile Layout */}
            <Route element={
              <ProtectedRoute>
                <MobileLayout />
              </ProtectedRoute>
            }>
              {/* Cliente Routes */}
              <Route path="/home" element={
                <ProtectedRoute allowedRoles={['cliente']}>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/busca" element={
                <ProtectedRoute allowedRoles={['cliente']}>
                  <Busca />
                </ProtectedRoute>
              } />
              
              {/* Shared Routes */}
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/mensagens" element={<Mensagens />} />
              <Route path="/perfil" element={<Perfil />} />
              
              {/* Prestador Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['prestador']}>
                  <Dashboard />
                </ProtectedRoute>
              } />
            </Route>

            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
