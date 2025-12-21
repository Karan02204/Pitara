import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="text-center">
            {/* Animated Gift Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.2
              }}
              className="mb-6 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(212, 175, 55, 0.3)',
                      '0 0 40px rgba(212, 175, 55, 0.5)',
                      '0 0 20px rgba(212, 175, 55, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="w-20 h-20 rounded-2xl gradient-gold flex items-center justify-center"
                >
                  <Gift className="w-10 h-10 text-primary-foreground" />
                </motion.div>
              </div>
            </motion.div>

            {/* Animated Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
                <span className="text-gradient">Pitara</span>
              </h1>
              <p className="text-muted-foreground text-sm">Loading your perfect gifts...</p>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="mt-8 mx-auto max-w-xs h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
