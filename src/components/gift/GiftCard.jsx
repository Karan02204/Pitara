import { motion } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import GiftCustomizationModal from './GiftCustomizationModal';
import { cn } from '../../lib/utils';
const GiftCard = ({ gift, index, onAddToHamper, isHamperMode, isSelected }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    return (<>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} whileHover={{ y: -5 }} className={cn("group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300", isSelected && "ring-2 ring-primary")}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <img src={gift.image} alt={gift.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
          
          {/* Like Button */}
          <button onClick={() => setIsLiked(!isLiked)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-background">
            <Heart className={cn("w-4 h-4 transition-colors", isLiked ? "fill-secondary text-secondary" : "text-muted-foreground")}/>
          </button>

          {/* Popular Badge */}
          {gift.popular && (<div className="absolute top-3 left-3 px-3 py-1 rounded-full gradient-gold text-xs font-medium text-primary-foreground">
              Popular
            </div>)}

          {/* Quick Add Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0">
            {isHamperMode ? (<Button variant={isSelected ? "secondary" : "gold"} className="w-full" onClick={() => onAddToHamper?.(gift)}>
                <Plus className="w-4 h-4"/>
                {isSelected ? 'Added' : 'Add to Hamper'}
              </Button>) : (<Button variant="gold" className="w-full" onClick={() => setIsModalOpen(true)}>
                <Plus className="w-4 h-4"/>
                Add to Cart
              </Button>)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
              {gift.name}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {gift.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {gift.category}
            </span>
            <span className="font-display text-xl font-semibold text-primary">
              ₹{gift.basePrice}
            </span>
          </div>
        </div>
      </motion.div>

      <GiftCustomizationModal gift={gift} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </>);
};
export default GiftCard;
