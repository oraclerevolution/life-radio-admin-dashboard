
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import ActualitesPage from "./pages/actualites";
import PodcastsPage from "./pages/podcasts";
import ReplaysPage from "./pages/replays";
import VideosPage from "./pages/videos";
import StatistiquesPage from "./pages/statistiques";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/actualites" element={<ActualitesPage />} />
          <Route path="/podcasts" element={<PodcastsPage />} />
          <Route path="/replays" element={<ReplaysPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/statistiques" element={<StatistiquesPage />} />
          {/* Rediriger les utilisateurs de /index vers la page d'accueil */}
          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
