# Quick Start: Adding Your First Lottie Animation

## 3 Simple Steps

### Step 1: Get Animation (2 minutes)
1. Go to https://lottiefiles.com/
2. Search "celebration" or "success"
3. Click Download → Lottie JSON
4. Save as `order-success.json`

### Step 2: Add to Project (1 minute)
1. Put the file in: `public/animations/order-success.json`

### Step 3: Configure (2 minutes)
Open `src/config/animations.js`:

```javascript
// Add this at the top
import orderSuccessAnimation from '/animations/order-success.json';

// Update the animations object
export const animations = {
  orderSuccess: orderSuccessAnimation,  // ← Add this line
  // ... rest of your animations
};
```

## That's it! 🎉

Now you can use it anywhere:

```javascript
import LottieAnimation from '../components/animations/LottieAnimation';
import { getAnimation } from '../config/animations';

function MyComponent() {
  const { data } = getAnimation('orderSuccess');
  
  return (
    <LottieAnimation
      animationData={data}
      width={300}
      height={300}
    />
  );
}
```

## Where to Add Animations

I've marked 3 spots with `TODO` comments:

1. **Checkout.jsx** (line ~104) - Order success
2. **GiftCustomizationModal.jsx** (line ~45) - Add to cart  
3. **Hampers.jsx** (line ~77) - Hamper created

Just search for `TODO: Add your Lottie animation` in these files!

## Need Help?

Check the full guide: `lottie_setup_guide.md`
