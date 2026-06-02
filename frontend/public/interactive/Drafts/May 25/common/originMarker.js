// common/originMarker.js
import * as THREE from "https://esm.sh/three@0.160.0";
import { COLORS } from "./colors.js";

export function createOriginMarker(scene, radius = 0.06) {
  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 16, 16),
    new THREE.MeshBasicMaterial({ color: COLORS.ORIGIN })
  );
  scene.add(marker);
  return marker;
}