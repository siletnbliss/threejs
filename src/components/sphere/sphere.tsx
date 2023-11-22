"use client";
import { ThreeElements } from "@react-three/fiber";
import { forwardRef } from "react";

const Sphere = forwardRef<THREE.Mesh, ThreeElements["mesh"]>(function Sphere(
  props,
  ref
) {
  return (
    <mesh {...props} ref={ref}>
      <sphereGeometry args={[3, 64, 64]} />
      <meshStandardMaterial roughness={0.5} color="#00ff83" />
    </mesh>
  );
});

export default Sphere;
