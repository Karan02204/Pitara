import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart, calculateItemPrice } from '../contexts/CartContext';
const Cart = () => {
    const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
    const sizeLabels = { small: 'Small', medium: 'Medium', large: 'Large' };
    const wrappingLabels = { standard: 'Standard', premium: 'Premium', luxury: 'Luxury' };
    if (items.length === 0) {
        return (<div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground"/>
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any gifts yet
            </p>
            <Link to="/catalog">
              <Button variant="gold">
                Browse Gifts
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>);
    }
    return (<div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Your Cart
            </h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <Button variant="ghost" onClick={clearCart} className="text-muted-foreground">
            Clear all
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (<motion.div key={item.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: index * 0.05 }} className="bg-card rounded-2xl p-4 md:p-6 shadow-soft flex gap-4">
                  {/* Image */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                    {item.isHamper && (<div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                        <Package className="w-3 h-3 text-secondary-foreground"/>
                      </div>)}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {item.name}
                        </h3>
                        {item.isHamper && item.hamperItems && (<p className="text-xs text-muted-foreground mt-1">
                            Contains: {item.hamperItems.join(', ')}
                          </p>)}
                      </div>
                      <button onClick={() => removeItem(item.id)} className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors">
                        <Trash2 className="w-4 h-4"/>
                      </button>
                    </div>

                    {/* Customization Details */}
                    {!item.isHamper && (<div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {sizeLabels[item.customization.size]}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {wrappingLabels[item.customization.wrapping]} wrap
                        </span>
                        {item.customization.ribbon && (<span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            + Ribbon
                          </span>)}
                      </div>)}

                    {item.customization.message && (<p className="text-xs text-muted-foreground mt-2 italic">
                        "{item.customization.message}"
                      </p>)}

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                          <Minus className="w-3 h-3"/>
                        </button>
                        <span className="w-8 text-center font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                          <Plus className="w-3 h-3"/>
                        </button>
                      </div>
                      <span className="font-display text-xl font-bold text-primary">
                        ₹{Math.round(calculateItemPrice(item))}
                      </span>
                    </div>
                  </div>
                </motion.div>))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-24 bg-card rounded-2xl p-6 shadow-medium">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
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
                  <span className="text-foreground">₹{Math.round(totalPrice * 0.18)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-display text-2xl font-bold text-primary">
                    ₹{Math.round(totalPrice * 1.18)}
                  </span>
                </div>
              </div>

              <Link to="/checkout">
                <Button variant="hero" className="w-full">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4"/>
                </Button>
              </Link>

              <Link to="/catalog" className="block mt-4 text-center">
                <Button variant="ghost" className="text-muted-foreground">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>);
};
export default Cart;
