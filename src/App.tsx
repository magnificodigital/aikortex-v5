import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AgencyLayout from "@/components/AgencyLayout";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";
import AgencyHome from "./pages/agency/Home.tsx";
import Placeholder from "./pages/agency/Placeholder.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/agency"
              element={
                <ProtectedRoute>
                  <AgencyLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AgencyHome />} />
              <Route path="agents" element={<Placeholder title="Agentes" />} />
              <Route path="flows" element={<Placeholder title="Flows" />} />
              <Route path="apps" element={<Placeholder title="Apps" />} />
              <Route path="messages" element={<Placeholder title="Mensagens" />} />
              <Route path="clients" element={<Placeholder title="Clientes" />} />
              <Route path="crm" element={<Placeholder title="Vendas" />} />
              <Route path="meetings" element={<Placeholder title="Reuniões" />} />
              <Route path="partners" element={<Placeholder title="Partners Dashboard" />} />
              <Route path="settings" element={<Placeholder title="Configurações" />} />
            </Route>
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="willy">
                  <Admin />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
