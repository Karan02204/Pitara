import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gift, Sparkles, Heart, Truck, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../components/ui/button';
import GiftCard from '../components/gift/GiftCard';
import { fetchGifts } from '../services/api';

const Index = () => {
  // Fetch popular gifts from backend
  const { data: gifts = [] } = useQuery({
    queryKey: ['gifts', 'popular'],
    queryFn: () => fetchGifts({ popular: true }),
  });

  const popularGifts = gifts.slice(0, 4);
    const features = [
        { icon: Gift, title: 'Curated Selection', description: 'Hand-picked gifts for every occasion' },
        { icon: Sparkles, title: 'Custom Hampers', description: 'Create your own perfect gift basket' },
        { icon: Heart, title: 'Personal Touch', description: 'Add messages and premium wrapping' },
        { icon: Truck, title: 'Fast Delivery', description: 'Express shipping available' },
    ];
    const testimonials = [
        { name: 'Sarah M.', text: 'The most beautiful gift packaging I\'ve ever seen!', rating: 5 },
        { name: 'James L.', text: 'Custom hamper was a huge hit at the party.', rating: 5 },
        { name: 'Emily R.', text: 'Excellent quality and fast shipping.', rating: 5 },
    ];
    return (<div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/update_ribbon.png" 
            alt="Luxury gifts background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 blur-xl"/>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-32 right-20 w-32 h-32 rounded-full bg-secondary/10 blur-xl"/>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-40 right-40 w-16 h-16 rounded-full bg-accent/20 blur-lg"/>
        </div>

        <div className="container mx-auto px-4 pt-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm border border-primary/20">
              <Sparkles className="w-4 h-4"/>
              Premium Gift Collection
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-6xl md:text-8xl font-extrabold text-foreground mb-8 leading-tight tracking-tight">
              <span className="drop-shadow-lg">Gifts That Speak</span>
              <span className="block text-gradient drop-shadow-2xl mt-2" style={{ textShadow: '0 0 40px rgba(212, 175, 55, 0.3)' }}>From The Heart</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Discover our curated collection of luxury gifts, personalized with care. 
              Create custom hampers or choose from our handpicked selection.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button variant="hero" size="xl">
                  <Gift className="w-5 h-5"/>
                  Explore Gifts
                </Button>
              </Link>
              <Link to="/hampers">
                <Button variant="outline" size="xl">
                  <Sparkles className="w-5 h-5"/>
                  Create Hamper
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary"/>
          </motion.div>
        </motion.div> */}
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Pitara?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We make gift-giving an unforgettable experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (<motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-300 text-center">
                <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground"/>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>))}
          </div>
        </div>
      </section>

      {/* Popular Gifts Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Popular Gifts
              </h2>
              <p className="text-muted-foreground">
                Our most loved selections
              </p>
            </div>
            <Link to="/catalog">
              <Button variant="outline">
                View All
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularGifts.map((gift, index) => (<GiftCard key={gift.id} gift={gift} index={index}/>))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Loved by Customers
            </h2>
            <p className="text-muted-foreground">
              See what our happy customers have to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (<motion.div key={testimonial.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="p-6 rounded-2xl bg-card shadow-soft text-center">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-primary text-primary"/>))}
                </div>
                <p className="text-muted-foreground italic mb-4">"{testimonial.text}"</p>
                <p className="font-medium text-foreground">{testimonial.name}</p>
              </motion.div>))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-gold opacity-90"/>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Spread Joy?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Create a memorable gift that will be cherished forever
            </p>
            <Link to="/catalog">
              <Button size="xl" className="bg-white text-primary hover:bg-white/90 border-white shadow-lg">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>);
};
export default Index;
