import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import GiftCard from '../components/gift/GiftCard';
import { categories } from '../data/gifts';
import { fetchGifts } from '../services/api';
import { cn } from '../lib/utils';

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Fetch gifts from backend API
  const { data: gifts = [], isLoading, error } = useQuery({
    queryKey: ['gifts', selectedCategory],
    queryFn: () => fetchGifts({ category: selectedCategory }),
  });

  const filteredGifts = gifts
    .filter(gift => {
      const matchesSearch = gift.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gift.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.basePrice - b.basePrice;
        case 'price-desc':
          return b.basePrice - a.basePrice;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    return (<div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Gift Catalog
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Browse our curated collection of premium gifts, each customizable to your needs
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
            <input type="text" placeholder="Search gifts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"/>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (<button key={category} onClick={() => setSelectedCategory(category)} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all duration-200", selectedCategory === category
                ? "gradient-gold text-primary-foreground shadow-gold"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground")}>
                {category}
              </button>))}
          </div>

          {/* Sort */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 bg-card rounded-xl border border-border p-1 shadow-sm">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground ml-2"/>
              <div className="flex gap-1">
                <button
                  onClick={() => setSortBy('name')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    sortBy === 'name'
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  Name
                </button>
                <button
                  onClick={() => setSortBy('price-asc')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    sortBy === 'price-asc'
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  Price ↑
                </button>
                <button
                  onClick={() => setSortBy('price-desc')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    sortBy === 'price-desc'
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  Price ↓
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading gifts...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-20"
          >
            <p className="text-destructive text-lg mb-2">
              Failed to load gifts
            </p>
            <p className="text-muted-foreground text-sm">
              {error.message || 'Please try again later'}
            </p>
          </motion.div>
        )}

        {/* Results Count */}
        {!isLoading && !error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-sm text-muted-foreground text-center mb-8">
            Showing {filteredGifts.length} {filteredGifts.length === 1 ? 'gift' : 'gifts'}
          </motion.p>
        )}

        {/* Gift Grid */}
        {!isLoading && !error && (
          filteredGifts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGifts.map((gift, index) => (
                <GiftCard key={gift._id || gift.id} gift={gift} index={index}/>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No gifts found matching your criteria.
              </p>
              <button onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
              }} className="mt-4 text-primary hover:underline">
                Clear filters
              </button>
            </motion.div>
          )
        )}
      </div>
    </div>);
};
export default Catalog;
