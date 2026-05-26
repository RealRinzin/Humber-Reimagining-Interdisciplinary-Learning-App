// common/sceneShell.js
import * as THREE from "https://esm.sh/three@0.160.0";
import { OrbitControls } from "https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js";
import { COLORS } from "./colors.js";

export function createSceneShell() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.BACKGROUND);

  const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 50);
  camera.position.set(4, 3, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  return { scene, camera, renderer, controls };
}