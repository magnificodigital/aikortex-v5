import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-muted-foreground">
        Carregando...
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;
  return <Navigate to={profile?.role === "willy" ? "/admin" : "/agency"} replace />;
};

export default Index;
