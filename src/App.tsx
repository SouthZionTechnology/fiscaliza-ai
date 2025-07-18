import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import Home from "./pages/Home";
import Deputies from "./pages/Deputies";
import SuspiciousSpending from "./pages/SuspiciousSpending";
import Ranking from "./pages/Ranking";
import Explore from "./pages/Explore";
import DeputyProfile from "./pages/DeputyProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen w-full">
          <Sidebar />
          <main className="flex-1 ml-64">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deputados" element={<Deputies />} />
              <Route path="/alertas" element={<SuspiciousSpending />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/explorar" element={<Explore />} />
              <Route path="/deputado/:id" element={<DeputyProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
