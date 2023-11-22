"use client";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sphere from "./sphere";
import useScreenSize from "@/hooks/use-screen-size";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Color } from "three";

const SphereCanvas = () => {
  const windowSize = useScreenSize();
  const meshRef = useRef<THREE.Mesh>(null!);
  const timeline = useRef<GSAPTimeline>();
  const [mouseDown, setMouseDown] = useState(false);
  const updateColor = (e: ThreeEvent<PointerEvent>) => {
    if (!mouseDown) {
      return;
    }
    const rgb = [
      Math.round((e.pageX / windowSize.width) * 255),
      Math.round((e.pageY / windowSize.height) * 255),
      160,
    ];
    const color = new Color(`rgb(${rgb.join(",")})`);
    !Array.isArray(meshRef.current.material) &&
      gsap.to(meshRef.current.material.color, {
        r: color.r,
        g: color.g,
        b: color.b,
      });
  };

  useLayoutEffect(() => {
    console.log({ mesh: meshRef.current });
    let ctx = gsap.context(() => {
      timeline.current = gsap.timeline({ defaults: { duration: 1 } });
      timeline.current?.fromTo(
        meshRef.current?.scale,
        { z: 0, x: 0, y: 0 },
        { z: 1, x: 1, y: 1 }
      );
      timeline.current?.fromTo("#sphere-title", { opacity: 0 }, { opacity: 1 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <h1
        id="sphere-title"
        className="z-20 absolute text-5xl left-2/4 top-1/4 -translate-x-2/4 translate-y-3/4"
      >
        Give it a spin
      </h1>
      <Canvas
        style={{
          width: windowSize.width,
          height: windowSize.height,
        }}
        camera={{
          isPerspectiveCamera: true,
          position: [0, 0, 20],
          fov: 45,
          aspect: windowSize.width / windowSize.height,
        }}
        className="absolute top-0 left-0 z-10 overflow-hidden"
      >
        <pointLight
          args={[0xffffff, 1, 100]}
          intensity={225}
          position={[0, 10, 10]}
        />
        <Sphere
          onPointerDown={() => setMouseDown(true)}
          onPointerUp={() => setMouseDown(false)}
          onPointerMove={updateColor}
          position={[0, 0, 0]}
          ref={meshRef}
        />
        <OrbitControls
          autoRotate
          autoRotateSpeed={12}
          enablePan={false}
          enableZoom={false}
          enableDamping
        />
      </Canvas>
    </>
  );
};

export default SphereCanvas;
