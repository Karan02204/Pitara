import { useEffect } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { API_URL } from "./config/api";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Hampers from "./pages/Hampers";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to handle global order status updates
const OrderStatusUpdater = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const statusProgression = ['pending', 'processing', 'shipped', 'delivered'];
    
    const updateOrderStatuses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Fetch user's orders
        const res = await fetch(`${API_URL}/users/orders`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!res.ok) return;
        
        const orders = await res.json();
        
        // Update each order's status
        orders.forEach(order => {
          // Don't change if already delivered or cancelled
          if (order.status === 'delivered' || order.status === 'cancelled') {
            return;
          }
          
          const currentIndex = statusProgression.indexOf(order.status);
          if (currentIndex < statusProgression.length - 1) {
            const newStatus = statusProgression[currentIndex + 1];
            
            // Update backend
            fetch(`${API_URL}/orders/${order._id}/status`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ status: newStatus })
            }).catch(err => console.error('Failed to update status:', err));
          }
        });
      } catch (err) {
        console.error('Failed to fetch orders for status update:', err);
      }
    };

    // Run immediately on mount
    updateOrderStatuses();

    // Then run every 10 seconds
    const interval = setInterval(updateOrderStatuses, 10000);

    return () => clearInterval(interval);
  }, [user]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <OrderStatusUpdater />
          <LoadingScreen />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Index />}/>
                <Route path="/catalog" element={<Catalog />}/>
                <Route path="/hampers" element={<Hampers />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/checkout" element={<Checkout />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/orders" element={<OrderHistory />}/>
                <Route path="*" element={<NotFound />}/>
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
