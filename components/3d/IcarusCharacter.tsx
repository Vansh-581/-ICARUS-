'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Preload model at module level
useGLTF.preload('/Icarus_model_3d.glb');

interface IcarusCharacterProps {
  scrollProgressRef: React.MutableRefObject<number>;
  isMobile?: boolean;
}

const VERT_PREAMBLE = /* glsl */ `
uniform float uTime;
uniform float uScroll;
`;

const VERT_INJECT = /* glsl */ `
float normY = (transformed.y + 1.0) * 0.5;
float normX = abs(transformed.x) / 0.775;

float wingY = smoothstep(0.42, 0.78, normY);
float wingX = smoothstep(0.12, 0.55, normX);
float wingMask = wingY * wingX;

float ff1 = sin(uTime * 2.2 + transformed.x * 6.0);
float ff2 = cos(uTime * 1.8 + transformed.y * 4.0);

float featherY = (ff1 * 0.006 + ff2 * 0.004) * wingMask;
float featherZ = cos(uTime * 1.8 + transformed.x * 4.0) * 0.004 * wingMask;

float flapFreq = 1.2 + uScroll * 0.4;
float flapAmp  = (0.045 + uScroll * 0.045) * wingY;
float flapAngle = sin(uTime * flapFreq) * flapAmp;

float leverY = smoothstep(0.45, 1.0, normY) * (normY - 0.45) * 2.0;
float flapY  = flapAngle * leverY * sign(transformed.x);
float flapZ  = -flapAngle * leverY * 0.25;

transformed.y += featherY + flapY;
transformed.z += featherZ + flapZ;
`;

const FRAG_PREAMBLE = /* glsl */ `
uniform float uTime;
uniform float uScroll;
`;

const FRAG_INJECT = /* glsl */ `
float pulse   = sin(uTime * 1.2) * 0.5 + 0.5;
float glowAmt = (0.08 + uScroll * 0.2 + pulse * 0.05);
vec3 goldTint = vec3(0.92, 0.75, 0.25);
gl_FragColor.rgb += goldTint * glowAmt;
`;

export default function IcarusCharacter({
  scrollProgressRef,
  isMobile = false,
}: IcarusCharacterProps) {
  const { scene } = useGLTF('/Icarus_model_3d.glb');
  const groupRef  = useRef<THREE.Group>(null);
  const shaderRef = useRef<THREE.WebGLProgramParametersWithUniforms | null>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const mat = (child.material as THREE.MeshStandardMaterial).clone();

      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uTime   = { value: 0 };
        shader.uniforms.uScroll = { value: 0 };

        shader.vertexShader = shader.vertexShader
          .replace('void main() {', `${VERT_PREAMBLE}\nvoid main() {`)
          .replace('#include <project_vertex>', `${VERT_INJECT}\n#include <project_vertex>`);

        shader.fragmentShader = shader.fragmentShader
          .replace('void main() {', `${FRAG_PREAMBLE}\nvoid main() {`)
          .replace('#include <tonemapping_fragment>', `${FRAG_INJECT}\n#include <tonemapping_fragment>`);

        shaderRef.current = shader;
      };

      mat.needsUpdate       = true;
      mat.roughness         = 0.22;
      mat.metalness         = 1;
      mat.envMapIntensity   = 2.2;
      mat.color             = new THREE.Color('#f5d062');
      mat.emissive          = new THREE.Color('#5c4200');
      mat.emissiveIntensity = 0.18;
      child.material        = mat;
      child.castShadow      = false;
      child.receiveShadow   = false;
    });

    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = scrollProgressRef.current; // read ref directly — no React dep

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value   = t;
      shaderRef.current.uniforms.uScroll.value = p;
    }

    if (!groupRef.current) return;

    groupRef.current.position.y =
      (isMobile ? -0.2 : -0.5) + p * 8 + Math.sin(t * 0.6) * 0.045;

    groupRef.current.rotation.y =
      p * 0.25 + Math.sin(t * 0.18) * 0.08;

    groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.03;

    const breathe = 1 + Math.sin(t * 0.5) * 0.012;
    groupRef.current.scale.setScalar(breathe * (isMobile ? 0.84 : 1));
  });

  return (
    <group ref={groupRef} position={[0, isMobile ? -0.2 : -0.5, 0]}>
      <primitive object={clonedScene} scale={[2.8, 2.8, 2.8]} />
    </group>
  );
}
