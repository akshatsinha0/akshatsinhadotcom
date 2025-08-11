import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import './VantaBackground.css';
const VantaBackground: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  type VantaEffectInstance = { destroy: () => void };
  const [vantaEffect, setVantaEffect] = useState<VantaEffectInstance | null>(null);
  useEffect(() => {
    if (vantaRef.current && !vantaEffect) {
      const effect = CLOUDS({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        cloudColor: 0x1a2333,
        skyColor: 0x0f172a,
        sunColor: 0x667eea,
        sunGlareColor: 0x764ba2,
        sunlightColor: 0xf093fb,
        speed: 1.2
      });
      setVantaEffect(effect);
    }
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);
  return <div ref={vantaRef} className="vanta-container" />;
};
export default VantaBackground;