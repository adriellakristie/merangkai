import { useState, useEffect, useRef } from 'react';
import * as LottieModule from 'lottie-react';
import introAnimation from '../animations/merangkai.json';

const Lottie = LottieModule.default?.default || LottieModule.default || LottieModule;

console.log('LottieModule:', LottieModule);
console.log('Lottie:', Lottie);
console.log('typeof Lottie:', typeof Lottie);


const IntroSplash = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const lottieRef = useRef();

  const handleAnimationComplete = () => {
    setIsFadingOut(true);
    // wait for fade transition to finish before unmounting
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 500); // matches the CSS transition duration below
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff', // match your page bg
        zIndex: 9999,
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: isFadingOut ? 'none' : 'auto'
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={introAnimation}
        loop={false}
        autoplay={true}
        onComplete={handleAnimationComplete}
style={{ width: '100%', height: '100%', transform: 'scale(1.05)' }}      />
    </div>
  );
};

export default IntroSplash;