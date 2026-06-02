// common/renderModes.js
import * as THREE from "https://esm.sh/three@0.160.0";
import { COLORS } from "./colors.js";

export function createRenderable(geometry) {
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: COLORS.OBJECT,
    wireframe: true
  });
  const mesh = new THREE.Mesh(geometry, cubeMaterial);
  mesh.matrixAutoUpdate = false;

  const edges = new THREE.EdgesGeometry(geometry);
  const outline = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: COLORS.OUTLINE })
  );
  outline.matrixAutoUpdate = false;
  outline.visible = false;

  return { mesh, outline };
}

export function createRenderableLightable(geometry) {
  const material = new THREE.MeshStandardMaterial({
  color: 0xcccccc,
  roughness: 0.35,    // LOWER makes highlights sharper
  metalness: 0.0
});

  const mesh = new THREE.Mesh(geometry, material);
  mesh.matrixAutoUpdate = false;

  const edges = new THREE.EdgesGeometry(geometry);
  const outline = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: COLORS.OUTLINE })
  );
  outline.matrixAutoUpdate = false;
  outline.visible = false;

  return { mesh, outline };
}

export function setWireframeMode({ mesh, outline }, isWireframe) {
  mesh.material.wireframe = isWireframe;
  outline.visible = !isWireframe;
}

export function createXZPlane(planeSize = 20){
  //const planeSize = 20;

const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0x555555,
  side: THREE.DoubleSide,
  shininess: 10
});

const groundPlane = new THREE.Mesh(planeGeometry, planeMaterial);

// Rotate plane from XY → XZ
groundPlane.rotation.x = -Math.PI / 2;

// Move it so Y = 0
groundPlane.position.y = 0;


return groundPlane;
}