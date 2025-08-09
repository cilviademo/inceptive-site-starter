import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Kits from "./pages/Kits";
import Beats from "./pages/Beats";
import Bundles from "./pages/Bundles";
import ProductDetail from "./pages/ProductDetail";
import KitsFree from "./pages/KitsFree";
import Genre from "./pages/Genre";
import Playbook from "./pages/Playbook";
import BlogHowToMix808s from "./pages/BlogHowToMix808s";
import License from "./pages/License";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Support from "./pages/Support";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import { PlayerProvider } from "@/context/PlayerContext";
import MiniPlayer from "@/components/player/MiniPlayer";
import GlobalSearch from "@/components/search/GlobalSearch";
import ExitIntent from "@/components/marketing/ExitIntent";
import AppLifecycle from "@/components/system/AppLifecycle";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PlayerProvider>
        <BrowserRouter>
          <AppLifecycle />
          <GlobalSearch />
          <ExitIntent />
          <SiteHeader />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/kits" element={<Kits />} />
            <Route path="/beats" element={<Beats />} />
            <Route path="/bundles" element={<Bundles />} />
            <Route path="/kits/free" element={<KitsFree />} />
            <Route path="/genre/:slug" element={<Genre />} />
            <Route path="/playbook" element={<Playbook />} />
            <Route path="/blog/how-to-mix-808s" element={<BlogHowToMix808s />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/license" element={<License />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/support" element={<Support />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SiteFooter />
          <MiniPlayer />
        </BrowserRouter>
      </PlayerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
