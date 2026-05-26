// common/axes.js
import * as THREE from "https://esm.sh/three@0.160.0";
import { COLORS } from "./colors.js";

export function addAxes(scene, length = 3) {
  const axes = new THREE.AxesHelper(length);
  scene.add(axes);

  scene.add(makeAxisLabel("X", COLORS.X, new THREE.Vector3(length + 0.2, 0, 0)));
  scene.add(makeAxisLabel("Y", COLORS.Y, new THREE.Vector3(0, length + 0.2, 0)));
  scene.add(makeAxisLabel("Z", COLORS.Z, new THREE.Vector3(0, 0, length + 0.2)));

  return axes;
}

function makeAxisLabel(text, color, position) {
  const padding = 8;
  const font = "bold 28px system-ui";

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = font;

  const width = Math.ceil(ctx.measureText(text).width) + padding * 2;
  const height = 40 + padding * 2;
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.fillText(text, padding, height / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;

  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, transparent: true })
  );

  const worldH = 0.6;
  sprite.scale.set((width / height) * worldH, worldH, 1);
  sprite.position.copy(position);

  return sprite;
}
