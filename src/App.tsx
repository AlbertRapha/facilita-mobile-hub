import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import ProtectedRoute from "@/components/mobile/ProtectedRoute";

// Pages
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Cliente
import ClientLayout from "./pages/cliente/ClientLayout";
import Home from "./pages/cliente/Home";
import Busca from "./pages/cliente/Busca";
import Agenda from "./pages/cliente/Agenda";
import Mensagens from "./pages/cliente/Mensagens";
import Perfil from "./pages/cliente/Perfil";
import ServiceDetails from './pages/cliente/ServiceDetails';
import ReviewService from './pages/cliente/ReviewService';

// Shared
import ConversationView from './pages/shared/ConversationView';
import RequestDetails from './pages/shared/RequestDetails';

// Prestador
import PrestadorLayout from "./pages/prestador/PrestadorLayout";
import Dashboard from "./pages/prestador/Dashboard";
import PrestadorAgenda from "./pages/prestador/PrestadorAgenda";
import Catalogo from "./pages/prestador/Catalogo";

// Admin
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<SplashScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Cliente Routes */}
              <Route path="/client" element={
                <ProtectedRoute allowedRoles={['cliente']}>
                  <ClientLayout />
                </ProtectedRoute>
              }>
                <Route path="home" element={<Home />} />
                <Route path="busca" element={<Busca />} />
                <Route path="agenda" element={<Agenda />} />
                <Route path="mensagens" element={<Mensagens />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="service/:id" element={<ServiceDetails />} />
                <Route path="review/:requestId" element={<ReviewService />} />
              </Route>
              
              {/* Prestador Routes */}
              <Route path="/prestador" element={
                <ProtectedRoute allowedRoles={['prestador']}>
                  <PrestadorLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="agenda" element={<PrestadorAgenda />} />
                <Route path="catalogo" element={<Catalogo />} />
                <Route path="perfil" element={<Perfil />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['administrador']}>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<AdminDashboard />} />
              </Route>

              {/* Shared Routes */}
              <Route 
                path="/conversation/:requestId" 
                element={
                  <ProtectedRoute>
                    <ConversationView />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/request/:id" 
                element={
                  <ProtectedRoute>
                    <RequestDetails />
                  </ProtectedRoute>
                } 
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
