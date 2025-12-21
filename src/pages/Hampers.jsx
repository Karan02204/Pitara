import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, X, ShoppingCart, Sparkles, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../components/ui/button';
import GiftCard from '../components/gift/GiftCard';
import { fetchGifts } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { toast } from '../hooks/use-toast';
import { cn } from '../lib/utils';
import LottieAnimation from '../components/animations/LottieAnimation';
import { getAnimation } from '../config/animations';
const hamperSizes = [
    { value: 'small', label: 'Small Hamper', maxItems: 3, basePrice: 25 },
    { value: 'medium', label: 'Medium Hamper', maxItems: 5, basePrice: 40 },
    { value: 'large', label: 'Large Hamper', maxItems: 8, basePrice: 60 },
];
const Hampers = () => {
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState(hamperSizes[1]);
    const [selectedGifts, setSelectedGifts] = useState([]);
    const [hamperName, setHamperName] = useState('');

    // Fetch gifts from backend
    const { data: gifts = [], isLoading } = useQuery({
        queryKey: ['gifts'],
        queryFn: () => fetchGifts({}),
    });
    const toggleGift = (gift) => {
        setSelectedGifts(prev => {
            const giftId = gift._id || gift.id;
            const isSelected = prev.find(g => (g._id || g.id) === giftId);
            if (isSelected) {
                return prev.filter(g => (g._id || g.id) !== giftId);
            }
            if (prev.length >= selectedSize.maxItems) {
                toast({
                    title: "Hamper is full!",
                    description: `You can only add ${selectedSize.maxItems} items to a ${selectedSize.label.toLowerCase()}.`,
                    variant: "destructive"
                });
                return prev;
            }
            return [...prev, gift];
        });
    };
    const removeGift = (giftId) => {
        setSelectedGifts(prev => prev.filter(g => (g._id || g.id) !== giftId));
    };
    const calculateTotal = () => {
        const itemsTotal = selectedGifts.reduce((sum, gift) => sum + gift.basePrice, 0);
        return itemsTotal + selectedSize.basePrice;
    };
    const handleAddHamperToCart = () => {
        if (selectedGifts.length === 0) {
            toast({
                title: "Empty hamper",
                description: "Please add some items to your hamper first.",
                variant: "destructive"
            });
            return;
        }
        addItem({
            id: `hamper-${Date.now()}`,
            name: hamperName || `Custom ${selectedSize.label}`,
            basePrice: calculateTotal(),
            image: selectedGifts[0].image,
            quantity: 1,
            customization: {
                size: selectedSize.value,
                wrapping: 'luxury',
            },
            isHamper: true,
            hamperItems: selectedGifts.map(g => g.name),
        });
        
        // TODO: Add your Lottie animation here for hamper creation
        // const hamperAnimation = getAnimation('hamperCreated');
        
        toast({
            title: "Hamper added to cart!",
            description: `Your custom hamper with ${selectedGifts.length} items has been added.`,
        });
        // Reset
        setSelectedGifts([]);
        setHamperName('');
    };
    return (<div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4"/>
            Create Your Own
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Custom Gift Hamper
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Build a unique gift hamper by selecting your favorite items. Perfect for any occasion!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Gift Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Size Selection */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-6 shadow-soft">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                1. Choose Hamper Size
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {hamperSizes.map((size) => (<button key={size.value} onClick={() => {
                setSelectedSize(size);
                if (selectedGifts.length > size.maxItems) {
                    setSelectedGifts(prev => prev.slice(0, size.maxItems));
                }
            }} className={cn("p-4 rounded-xl border-2 transition-all duration-200 text-center", selectedSize.value === size.value
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50")}>
                    <Package className={cn("w-6 h-6 mx-auto mb-2", selectedSize.value === size.value ? "text-primary" : "text-muted-foreground")}/>
                    <span className="font-medium text-foreground block">{size.label}</span>
                    <span className="text-xs text-muted-foreground">Up to {size.maxItems} items</span>
                    <span className="block mt-1 text-sm font-semibold text-primary">+₹{size.basePrice}</span>
                  </button>))}
              </div>
            </motion.div>

            {/* Gift Selection */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                2. Select Items ({selectedGifts.length}/{selectedSize.maxItems})
              </h3>
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">Loading gifts...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gifts.map((gift, index) => (
                    <GiftCard 
                      key={gift._id || gift.id} 
                      gift={gift} 
                      index={index} 
                      isHamperMode 
                      isSelected={selectedGifts.some(g => (g._id || g.id) === (gift._id || gift.id))} 
                      onAddToHamper={toggleGift}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Hamper Summary */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="sticky top-24 bg-card rounded-2xl p-6 shadow-medium">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Your Hamper
              </h3>

              {/* Hamper Name */}
              <div className="mb-4">
                <label className="text-sm text-muted-foreground block mb-2">
                  Hamper Name (Optional)
                </label>
                <input type="text" placeholder="e.g., Birthday Surprise" value={hamperName} onChange={(e) => setHamperName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
              </div>

              {/* Selected Items */}
              <div className="space-y-2 mb-6 min-h-[120px]">
                <AnimatePresence mode="popLayout">
                  {selectedGifts.length === 0 ? (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground text-sm text-center py-8">
                      Select items to add to your hamper
                    </motion.p>) : (selectedGifts.map((gift) => (<motion.div key={gift._id || gift.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                        <img src={gift.image} alt={gift.name} className="w-10 h-10 rounded-lg object-cover"/>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {gift.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ₹{gift.basePrice}
                          </p>
                        </div>
                        <button onClick={() => removeGift(gift._id || gift.id)} className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors">
                          <X className="w-3 h-3"/>
                        </button>
                      </motion.div>)))}
                </AnimatePresence>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items Total</span>
                  <span className="text-foreground">
                    ₹{selectedGifts.reduce((sum, g) => sum + g.basePrice, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hamper & Wrapping</span>
                  <span className="text-foreground">₹{selectedSize.basePrice}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">₹{calculateTotal()}</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button variant="hero" className="w-full mt-6" onClick={handleAddHamperToCart} disabled={selectedGifts.length === 0}>
                <ShoppingCart className="w-4 h-4"/>
                Add Hamper to Cart
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>);
};
export default Hampers;
