/**
 * Animation Configuration
 * 
 * Place your Lottie JSON files in the /public/animations folder
 * Then import and configure them here
 * 
 * HOW TO ADD ANIMATIONS:
 * 1. Download Lottie JSON from https://lottiefiles.com
 * 2. Place the JSON file in /public/animations/
 * 3. Import it below
 * 4. Add to the animations object
 */

// Example: Import your animation JSON files
// import orderSuccessAnimation from '/animations/order-success.json';
// import addToCartAnimation from '/animations/add-to-cart.json';
// import hamperAnimation from '/animations/hamper.json';

/**
 * Animation Registry
 * 
 * Add your animations here with descriptive names
 * Set to null initially - replace with your imported animation data
 */
export const animations = {
  // Order & Checkout Animations
  orderSuccess: null,        // Play when order is placed successfully
  paymentProcessing: null,   // Show during payment processing
  
  // Cart Animations
  addToCart: null,           // Play when item added to cart
  removeFromCart: null,      // Play when item removed from cart
  emptyCart: null,           // Show when cart is empty
  
  // Hamper Animations
  hamperCreated: null,       // Play when custom hamper is created
  hamperBuilding: null,      // Show while building hamper
  
  // User Actions
  userRegistered: null,      // Play on successful registration
  userLogin: null,           // Play on successful login
  
  // Loading States
  loading: null,             // General loading animation
  giftLoading: null,         // Loading gifts
  
  // Success/Error States
  success: null,             // General success
  error: null,               // General error
  
  // Decorative
  celebration: null,         // General celebration
  sparkles: null,            // Decorative sparkles
};

/**
 * Animation Settings
 * 
 * Configure default settings for each animation
 */
export const animationSettings = {
  orderSuccess: {
    width: 300,
    height: 300,
    loop: false,
    autoplay: true,
    trigger: 'mount'
  },
  
  addToCart: {
    width: 150,
    height: 150,
    loop: false,
    autoplay: true,
    trigger: 'mount'
  },
  
  hamperCreated: {
    width: 250,
    height: 250,
    loop: false,
    autoplay: true,
    trigger: 'mount'
  },
  
  loading: {
    width: 100,
    height: 100,
    loop: true,
    autoplay: true,
    trigger: 'mount'
  },
  
  // Add more settings as needed
};

/**
 * Get animation data and settings
 */
export const getAnimation = (name) => {
  return {
    data: animations[name],
    settings: animationSettings[name] || {
      width: 200,
      height: 200,
      loop: false,
      autoplay: true,
      trigger: 'mount'
    }
  };
};
