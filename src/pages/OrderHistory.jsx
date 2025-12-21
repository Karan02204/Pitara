import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_URL } from '../config/api';
import Navbar from '../components/layout/Navbar';

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/users/orders`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!res.ok) throw new Error('Failed to fetch orders');
        
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-playfair font-bold text-neutral-900 mb-8">Order History</h1>
        
        {loading ? (
          <div className="text-center py-12">Loading orders...</div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-neutral-600 mb-4">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-100">
                <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-100 flex flex-wrap justify-between items-center bg-gradient-to-r from-neutral-50 to-white">
                  <div>
                    <span className="text-sm text-neutral-500 block">Order Placed</span>
                    <span className="font-medium text-neutral-900">{formatDate(order.createdAt)}</span>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-500 block">Total</span>
                    <span className="font-medium text-neutral-900">{formatPrice(order.totalPrice)}</span>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-500 block">Order Number</span>
                    <span className="font-mono text-neutral-900">#{order.orderNumber}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize transition-all duration-300
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-purple-100 text-purple-800' : 
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-neutral-50 last:border-0">
                        <div>
                          <p className="font-medium text-neutral-900">{item.name}</p>
                          <p className="text-sm text-neutral-500">Qty: {item.quantity} {item.customization?.size && `• Size: ${item.customization.size}`}</p>
                        </div>
                        <p className="font-medium text-neutral-900">{formatPrice(item.itemTotal)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
