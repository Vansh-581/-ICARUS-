'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/Icarus_model_3d.glb');

interface IcarusCharacterProps {
  scrollProgressRef: React.MutableRefObject<number>;
  isMobile?: boolean;
  isLow?: boolean;
}

// ── Vertex shader injection — organic feather displacement ────
const VERT_UNIFORMS = `
uniform float uTime;
uniform float uScroll;
`;

const VERT_INJECT = `
  float normY = (transformed.y + 1.0) * 0.5;
  float normX = abs(transformed.x) / 0.78;
  float wingY = smoothstep(0.40, 0.80, normY);
  float wingX = smoothstep(0.10, 0.55, normX);
  float mask  = wingY * wingX;

  // Micro-feather ripple
  float r1 = sin(uTime * 2.4 + transformed.x * 7.0 + transformed.y * 3.5);
  float r2 = cos(uTime * 1.9 + transformed.y * 4.5);
  transformed.y += (r1 * 0.007 + r2 * 0.004) * mask;
  transformed.z += cos(uTime * 1.7 + transformed.x * 5.0) * 0.005 * mask;

  // Wing flap — accelerates with scroll progress
  float freq  = 1.25 + uScroll * 0.5;
  float amp   = (0.05 + uScroll * 0.06) * wingY;
  float flap  = sin(uTime * freq * 6.2831) * amp;
  float lever = smoothstep(0.46, 1.0, normY) * (normY - 0.46) * 2.2;
  transformed.y += flap * lever * sign(transformed.x);
  transformed.z -= flap * lever * 0.28;
`;

// ── Fragment shader injection — gold glow + rim shimmer ───────
const FRAG_UNIFORMS = `
uniform float uTime;
uniform float uScroll;
`;

const FRAG_INJECT = `
  // Pulsing core glow
  float pulse = sin(uTime * 1.1) * 0.5 + 0.5;

  // Gold tint strengthens as character ascends
  float glow = 0.12 + uScroll * 0.28 + pulse * 0.06;
  gl_FragColor.rgb += vec3(0.90, 0.72, 0.18) * glow;

  // Edge rim brightening (fake fresnel) — creates halo effect on wings
  // vNormal is in view space; dot with view direction approximates fresnel
  float fresnel = 1.0 - clamp(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0, 1.0);
  fresnel = pow(fresnel, 2.2);
  gl_FragColor.rgb += vec3(1.0, 0.85, 0.3) * fresnel * (0.3 + uScroll * 0.5);

  // Feather iridescence — subtle blue-gold shift on grazing angles
  float iri = pow(fresnel, 4.0);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.6, 0.75, 1.0), iri * 0.12);
`;

export default function IcarusCharacter({
  scrollProgressRef, isMobile = false, isLow = false,
}: IcarusCharacterProps) {
  const { scene }  = useGLTF('/Icarus_model_3d.glb');
  const groupRef   = useRef<THREE.Group>(null);
  const shaderRef  = useRef<THREE.WebGLProgramParametersWithUniforms | null>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const base = child.material as THREE.MeshStandardMaterial;
      const mat  = base.clone();

      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uTime   = { value: 0 };
        shader.uniforms.uScroll = { value: 0 };

        shader.vertexShader = shader.vertexShader
          .replace('void main() {', `${VERT_UNIFORMS}\nvoid main() {`)
          .replace('#include <project_vertex>', `${VERT_INJECT}\n#include <project_vertex>`);

        shader.fragmentShader = shader.fragmentShader
          .replace('void main() {', `${FRAG_UNIFORMS}\nvoid main() {`)
          .replace('#include <tonemapping_fragment>', `${FRAG_INJECT}\n#include <tonemapping_fragment>`);

        shaderRef.current = shader;
      };

      // Richer gold material settings
      mat.color             = new THREE.Color(isLow ? '#d4a520' : '#f0c040');
      mat.metalness         = 1.0;
      mat.roughness         = isLow ? 0.35 : 0.18;
      mat.emissive          = new THREE.Color('#6b4a00');
      mat.emissiveIntensity = isLow ? 0.15 : 0.28;
      // No env map in scene → set to 0 so the uniform is never sampled
      mat.envMapIntensity   = 0;
      mat.needsUpdate       = true;

      child.material      = mat;
      child.castShadow    = false;
      child.receiveShadow = false;
      child.frustumCulled = false; // always in view — skip bounds check
    });

    return clone;
  }, [scene, isLow]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = scrollProgressRef.current;

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value   = t;
      shaderRef.current.uniforms.uScroll.value = p;
    }

    if (!groupRef.current) return;

    // Rise with scroll, gentle sinusoidal hover
    groupRef.current.position.y =
      (isMobile ? -0.25 : -0.55) + p * 8.2 + Math.sin(t * 0.58) * 0.05;

    // Subtle yaw (side-to-side rotation)
    groupRef.current.rotation.y = p * 0.28 + Math.sin(t * 0.16) * 0.09;

    // Very gentle roll
    groupRef.current.rotation.z = Math.sin(t * 0.19) * 0.035;

    // Subtle breath scale
    const breathe = 1 + Math.sin(t * 0.48) * 0.011;
    groupRef.current.scale.setScalar(breathe * (isMobile ? 0.82 : 1));
  });

  return (
    <group ref={groupRef} position={[0, isMobile ? -0.25 : -0.55, 0]}>
      <primitive object={clonedScene} scale={[2.8, 2.8, 2.8]} />
    </group>
  );
}
