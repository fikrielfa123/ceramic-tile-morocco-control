
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Batches from "./pages/Batches";
import QualityControl from "./pages/QualityControl";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/batches" element={<Batches />} />
            <Route path="/batches/:batchId" element={<Batches />} />
            <Route path="/batches/action/:action" element={<Batches />} />
            <Route path="/batches/new" element={<Batches />} />
            <Route path="/batches/measurement/:batchId" element={<Batches />} />
            <Route path="/batches/defect/:batchId" element={<Batches />} />
            <Route path="/batches/report/:batchId" element={<Batches />} />
            <Route path="/quality-control" element={<QualityControl />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
