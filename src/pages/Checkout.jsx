import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, Check, Lock, LogIn } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart, calculateItemPrice } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../hooks/use-toast';
import { createOrder } from '../services/api';
import { cn } from '../lib/utils';
import LottieAnimation from '../components/animations/LottieAnimation';
import { getAnimation } from '../config/animations';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to complete your order.",
        variant: "destructive"
      });
    }
  }, [user]);

  const tax = totalPrice * 0.18;
  const total = totalPrice + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        customerInfo: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address: {
            street: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            zipCode: shippingInfo.zip,
            country: 'USA'
          }
        },
        items: items.map(item => {
          const orderItem = {
            name: item.name,
            basePrice: item.basePrice,
            quantity: item.quantity,
            customization: item.customization,
            itemTotal: calculateItemPrice(item)
          };
          
          // Only add giftId if it's a valid MongoDB ObjectId (not a custom hamper)
          if (item._id && !item.isHamper) {
            orderItem.giftId = item._id;
          }
          
          return orderItem;
        }),
        totalPrice: total,
        notes: ''
      };

      // Submit order to backend
      const response = await createOrder(orderData);

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsProcessing(false);
      clearCart();

      // TODO: Add your Lottie animation here for order success
      // Example: Show celebration animation in a modal or overlay
      // const orderAnimation = getAnimation('orderSuccess');

      toast({
        title: "Order placed successfully!",
        description: `Order #${response.order.orderNumber} - You will receive a confirmation email shortly.`,
      });

      navigate('/');
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Order failed",
        description: error.message || "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    }
  };
    
    // Redirect if cart is empty
    if (items.length === 0) {
        navigate('/cart');
        return null;
    }

    // Show login prompt if not authenticated
    if (!user) {
        return (
            <div className="min-h-screen pt-24 pb-20 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto text-center"
                    >
                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <LogIn className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                                Login Required
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Please log in or create an account to complete your order and track your purchases.
                            </p>
                            <div className="space-y-3">
                                <Link to="/login" className="block">
                                    <Button className="w-full" size="lg">
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Log In
                                    </Button>
                                </Link>
                                <Link to="/register" className="block">
                                    <Button variant="outline" className="w-full" size="lg">
                                        Create Account
                                    </Button>
                                </Link>
                                <Link to="/cart" className="block">
                                    <Button variant="ghost" className="w-full" size="sm">
                                        Back to Cart
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }
    return (<div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Checkout
          </h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {[
            { num: 1, label: 'Shipping', icon: Truck },
            { num: 2, label: 'Payment', icon: CreditCard },
        ].map((s, index) => (<div key={s.num} className="flex items-center">
                <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full transition-all", step >= s.num
                ? "gradient-gold text-primary-foreground"
                : "bg-muted text-muted-foreground")}>
                  {step > s.num ? (<Check className="w-4 h-4"/>) : (<s.icon className="w-4 h-4"/>)}
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
                {index < 1 && (<div className={cn("w-12 h-0.5 mx-2", step > s.num ? "bg-primary" : "bg-border")}/>)}
              </div>))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {step === 1 && (<motion.form initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleShippingSubmit} className="bg-card rounded-2xl p-6 shadow-soft space-y-6">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Shipping Information
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">
                      First Name *
                    </label>
                    <input type="text" required value={shippingInfo.firstName} onChange={(e) => setShippingInfo(prev => ({ ...prev, firstName: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">
                      Last Name *
                    </label>
                    <input type="text" required value={shippingInfo.lastName} onChange={(e) => setShippingInfo(prev => ({ ...prev, lastName: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">
                      Email *
                    </label>
                    <input type="email" required value={shippingInfo.email} onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">
                      Phone
                    </label>
                    <input type="tel" value={shippingInfo.phone} onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Address *
                  </label>
                  <input type="text" required value={shippingInfo.address} onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">
                      City *
                    </label>
                    <input type="text" required value={shippingInfo.city} onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">
                      State *
                    </label>
                    <input type="text" required value={shippingInfo.state} onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">
                      ZIP *
                    </label>
                    <input type="text" required value={shippingInfo.zip} onChange={(e) => setShippingInfo(prev => ({ ...prev, zip: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                  </div>
                </div>

                <Button variant="hero" className="w-full" type="submit">
                  Continue to Payment
                </Button>
              </motion.form>)}

            {step === 2 && (<motion.form initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handlePaymentSubmit} className="bg-card rounded-2xl p-6 shadow-soft space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Payment Details
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4"/>
                    Secure checkout
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Card Number *
                  </label>
                  <input type="text" required placeholder="1234 5678 9012 3456" value={paymentInfo.cardNumber} onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Name on Card *
                  </label>
                  <input type="text" required value={paymentInfo.nameOnCard} onChange={(e) => setPaymentInfo(prev => ({ ...prev, nameOnCard: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">
                      Expiry Date *
                    </label>
                    <input type="text" required placeholder="MM/YY" value={paymentInfo.expiry} onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiry: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">
                      CVV *
                    </label>
                    <input type="text" required placeholder="123" value={paymentInfo.cvv} onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button variant="hero" className="flex-1" type="submit" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : `Pay ₹${Math.round(total)}`}
                  </Button>
                </div>
              </motion.form>)}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-24 bg-card rounded-2xl p-6 shadow-medium">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {items.map((item) => (<div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover"/>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{Math.round(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">₹{Math.round(tax)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">₹{Math.round(total)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>);
};
export default Checkout;
