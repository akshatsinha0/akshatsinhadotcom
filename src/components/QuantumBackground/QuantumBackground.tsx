import { useEffect, useRef } from 'react';
import {
  Engine,
  Scene,
  Vector3,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsShapeType,
  StandardMaterial,
  Color3,
  HavokPlugin
} from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok";
const QuantumBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const createQuantumScene = async () => {
      if (!canvasRef.current) return;
      // Initialize engine and scene
      const engine = new Engine(canvasRef.current, true);
      const scene = new Scene(engine);
      // Initialize Havok Physics
      const havokInstance = await HavokPhysics();
      const havokPlugin = new HavokPlugin(true, havokInstance);
      scene.enablePhysics(new Vector3(0, -0.5, 0), havokPlugin);
      // Create quantum particles
      Array.from({ length: 1000 }).forEach((_, i) => {
        const particle = MeshBuilder.CreateIcoSphere(`particle${i}`, {
          radius: 0.1,
          subdivisions: 2
        }, scene);
        particle.position = new Vector3(
          Math.random() * 10 - 5,
          Math.random() * 10,
          Math.random() * 10 - 5
        );
        new PhysicsAggregate(particle, PhysicsShapeType.SPHERE, {
          mass: 0.1,
          restitution: 0.9
        }, scene);
        const material = new StandardMaterial("quantumMat", scene);
        material.emissiveColor = new Color3(
          Math.random(),
          Math.random(),
          Math.random()
        );
        particle.material = material;
      });
      // Create floating platform
      const platform = MeshBuilder.CreateBox("platform", { size: 4 }, scene);
      platform.position.y = -2;
      new PhysicsAggregate(platform, PhysicsShapeType.BOX, { mass: 0 }, scene);
      engine.runRenderLoop(() => scene.render());
      return () => engine.dispose();
    };
    createQuantumScene();
  }, []);
  return <canvas ref={canvasRef} className="quantum-canvas" />;
};
export default QuantumBackground;