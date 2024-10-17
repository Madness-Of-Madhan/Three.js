import { Canvas, useFrame } from "@react-three/fiber";
import {OrbitControls, Sparkles} from "@react-three/drei";
import { useRef } from "react";

const RotatingCube = () => {
    const meshRef = useRef(null);
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x += 0.01;
        }
    });

    return (
        <mesh ref={meshRef}>
            <cylinderGeometry args={[1, 1, 1, 32]} />
            <meshLambertMaterial color="#468585" emissive="#468585" />
            <Sparkles count={100} scale={1} size={6} speed={0.002} noise={0.2} color={'black'} />
        </mesh>
    );
};

const App = () => {
    return (
        <Canvas style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
            <directionalLight position={[1, 1, 1]} intensity={10} color="#9CDBA6" />
            <color attach="background" args={['#F0F0F0']} />
            <RotatingCube />
        </Canvas>
    );
};

export default App;