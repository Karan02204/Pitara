import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift as GiftIcon, Package, Ribbon, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../contexts/CartContext';
import { toast } from '../../hooks/use-toast';
import { cn } from '../../lib/utils';
import LottieAnimation from '../animations/LottieAnimation';
import { getAnimation } from '../../config/animations';
const sizes = [
    { value: 'small', label: 'Small', multiplier: 1 },
    { value: 'medium', label: 'Medium', multiplier: 1.5 },
    { value: 'large', label: 'Large', multiplier: 2 },
];
const wrappings = [
    { value: 'standard', label: 'Standard', price: 0, description: 'Simple elegant wrapping' },
    { value: 'premium', label: 'Premium', price: 5, description: 'Satin ribbon & tissue' },
    { value: 'luxury', label: 'Luxury', price: 15, description: 'Gift box with gold accents' },
];
const GiftCustomizationModal = ({ gift, isOpen, onClose }) => {
    const { addItem } = useCart();
    const [customization, setCustomization] = useState({
        size: 'medium',
        wrapping: 'standard',
        message: '',
        ribbon: false,
    });
    const [quantity, setQuantity] = useState(1);
    const calculatePrice = () => {
        const sizeMultiplier = sizes.find(s => s.value === customization.size)?.multiplier || 1;
        const wrappingPrice = wrappings.find(w => w.value === customization.wrapping)?.price || 0;
        const ribbonPrice = customization.ribbon ? 3 : 0;
        return (gift.basePrice * sizeMultiplier + wrappingPrice + ribbonPrice) * quantity;
    };
    const handleAddToCart = () => {
        addItem({
            id: `${gift.id}-${Date.now()}`,
            name: gift.name,
            basePrice: gift.basePrice,
            image: gift.image,
            quantity,
            customization,
        });
        
        // TODO: Add your Lottie animation here for add to cart
        // const cartAnimation = getAnimation('addToCart');
        
        toast({
            title: "Added to cart!",
            description: `${gift.name} has been added to your cart.`,
        });
        onClose();
    };
    return (<AnimatePresence>
      {isOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="bg-card rounded-2xl shadow-medium max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="relative">
              <img src={gift.image} alt={gift.name} className="w-full h-48 object-cover rounded-t-2xl"/>
              <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                <X className="w-4 h-4"/>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  {gift.name}
                </h2>
                <p className="text-muted-foreground mt-1">{gift.description}</p>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary"/>
                  <span className="font-medium text-foreground">Size</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (<button key={size.value} onClick={() => setCustomization(prev => ({ ...prev, size: size.value }))} className={cn("py-3 rounded-lg border-2 font-medium transition-all duration-200", customization.size === size.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 text-muted-foreground")}>
                      {size.label}
                      <span className="block text-xs opacity-70">
                        {size.multiplier === 1 ? 'Base' : `×${size.multiplier}`}
                      </span>
                    </button>))}
                </div>
              </div>

              {/* Wrapping Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <GiftIcon className="w-4 h-4 text-primary"/>
                  <span className="font-medium text-foreground">Gift Wrapping</span>
                </div>
                <div className="space-y-2">
                  {wrappings.map((wrap) => (<button key={wrap.value} onClick={() => setCustomization(prev => ({ ...prev, wrapping: wrap.value }))} className={cn("w-full p-3 rounded-lg border-2 text-left transition-all duration-200", customization.wrapping === wrap.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50")}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{wrap.label}</span>
                        <span className="text-primary font-semibold">
                          {wrap.price === 0 ? 'Free' : `+₹${wrap.price}`}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{wrap.description}</p>
                    </button>))}
                </div>
              </div>

              {/* Ribbon Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <Ribbon className="w-4 h-4 text-primary"/>
                  <div>
                    <span className="font-medium text-foreground">Add Premium Ribbon</span>
                    <p className="text-xs text-muted-foreground">Elegant satin ribbon</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-primary font-medium">+₹3</span>
                  <button onClick={() => setCustomization(prev => ({ ...prev, ribbon: !prev.ribbon }))} className={cn("w-12 h-6 rounded-full transition-colors duration-200", customization.ribbon ? "bg-primary" : "bg-muted")}>
                    <div className={cn("w-5 h-5 rounded-full bg-primary-foreground shadow-sm transition-transform duration-200", customization.ribbon ? "translate-x-6" : "translate-x-0.5")}/>
                  </button>
                </div>
              </div>

              {/* Personal Message */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary"/>
                  <span className="font-medium text-foreground">Personal Message (Optional)</span>
                </div>
                <textarea placeholder="Add a heartfelt message..." value={customization.message} onChange={(e) => setCustomization(prev => ({ ...prev, message: e.target.value }))} className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" rows={3}/>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Quantity</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                    +
                  </button>
                </div>
              </div>

              {/* Total & Add to Cart */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-display text-3xl font-bold text-primary">
                    ₹{Math.round(calculatePrice())}
                  </span>
                </div>
                <Button variant="hero" className="w-full" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>)}
    </AnimatePresence>);
};
export default GiftCustomizationModal;
