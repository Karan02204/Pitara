import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';

/**
 * LottieAnimation Component
 * 
 * Easy-to-use wrapper for Lottie animations
 * 
 * @param {string} animationData - Your Lottie JSON animation file
 * @param {number} width - Animation width (default: 200)
 * @param {number} height - Animation height (default: 200)
 * @param {boolean} loop - Whether to loop the animation (default: false)
 * @param {boolean} autoplay - Whether to autoplay (default: true)
 * @param {string} trigger - When to play: 'mount', 'click', 'hover' (default: 'mount')
 * @param {function} onComplete - Callback when animation completes
 */
const LottieAnimation = ({ 
  animationData, 
  width = 200, 
  height = 200, 
  loop = false,
  autoplay = true,
  trigger = 'mount',
  onComplete,
  className = ''
}) => {
  const [play, setPlay] = useState(autoplay && trigger === 'mount');
  const [lottieRef, setLottieRef] = useState(null);

  useEffect(() => {
    if (trigger === 'mount' && autoplay && lottieRef) {
      lottieRef.play();
    }
  }, [trigger, autoplay, lottieRef]);

  const handleClick = () => {
    if (trigger === 'click' && lottieRef) {
      lottieRef.goToAndPlay(0);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover' && lottieRef) {
      lottieRef.goToAndPlay(0);
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  if (!animationData) {
    return null;
  }

  return (
    <div 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={className}
      style={{ width, height, cursor: trigger === 'click' ? 'pointer' : 'default' }}
    >
      <Lottie
        lottieRef={setLottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay && trigger === 'mount'}
        onComplete={handleComplete}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieAnimation;
