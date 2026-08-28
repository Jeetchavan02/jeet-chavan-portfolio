import * as THREE from 'three'
import React from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: { [key: string]: THREE.Mesh }
  materials: { [key: string]: THREE.MeshStandardMaterial }
}

export function MacbookModel({ htmlContent, ...props }: JSX.IntrinsicElements['group'] & { htmlContent?: React.ReactNode }) {
  const { nodes, materials } = useGLTF('/macbookpro.glb') as any

  // Smooth face gradients across all meshes automatically
  React.useMemo(() => {
    Object.values(nodes).forEach((node: any) => {
      if (node.isMesh) {
        node.geometry.computeVertexNormals();
        if (node.material) {
          node.material.roughness = Math.max(node.material.roughness, 0.35);
        }
      }
    });
  }, [nodes]);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_10.geometry} material={materials.PaletteMaterial001} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_16.geometry} material={materials.zhGRTuGrQoJflBD} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_20.geometry} material={materials.PaletteMaterial002} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_22.geometry} material={materials.lmWQsEjxpsebDlK} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_30.geometry} material={materials.LtEafgAVRolQqRw} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_32.geometry} material={materials.iyDJFXmHelnMTbD} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_34.geometry} material={materials.eJObPwhgFzvfaoZ} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_38.geometry} material={materials.nDsMUuDKliqGFdU} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_42.geometry} material={materials.CRQixVLpahJzhJc} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_48.geometry} material={materials.YYwBgwvcyZVOOAA} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_54.geometry} material={materials.SLGkCohDDelqXBu} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_58.geometry} material={materials.WnHKXHhScfUbJQi} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_66.geometry} material={materials.fNHiBfcxHUJCahl} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_74.geometry} material={materials.LpqXZqhaGCeSzdu} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_82.geometry} material={materials.gMtYExgrEUqPfln} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_96.geometry} material={materials.PaletteMaterial003} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_107.geometry} material={materials.JvMFZolVCdpPqjj} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_123.geometry} material={materials.sfCQkHOWyrsLmor} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_127.geometry} material={materials.ZCDwChwkbBfITSW} rotation={[Math.PI / 2, 0, 0]} />
      
      {htmlContent && (
        <Html
          transform
          wrapperClass="html-screen"
          position={[0, 10.5, -12.2]}
          rotation={[-0.25, 0, 0]}
          scale={1.22} // Tuned to perfectly fit the inner glass without spilling onto the bezels
          zIndexRange={[100, 0]}
        >
          <div
            style={{
              width: '980px',
              height: '610px',
              background: 'transparent',
              overflow: 'hidden',
              borderRadius: '24px',
            }}
          >
            {htmlContent}
          </div>
        </Html>
      )}
    </group>
  )
}

useGLTF.preload('/macbookpro.glb')
