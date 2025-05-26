declare module 'vanta/dist/vanta.clouds.min' {
  import * as THREE from 'three';
  interface VantaCloudsSettings {
    el: HTMLElement | string;
    THREE?: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    cloudColor?: number;
    skyColor?: number;
    sunColor?: number;
    sunGlareColor?: number;
    sunlightColor?: number;
    speed?: number;
  }

  interface VantaEffect {
    destroy: () => void;
    setOptions: (options: VantaCloudsSettings) => void;
  }

  const CLOUDS: (settings: VantaCloudsSettings) => VantaEffect;
  export default CLOUDS;
}
