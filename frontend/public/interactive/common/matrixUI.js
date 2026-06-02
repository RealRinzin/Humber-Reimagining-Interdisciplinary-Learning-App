// common/matrixUI.js
import { COLORS, SIZE } from "./colors.js";

const font_size = SIZE.font;
const lineHeight_size = SIZE.lineHeight;
const marginTop_size = SIZE.marginTop;
// ======================================================
// SCALE MATRIX UI
// ======================================================
export function createScaleMatrixUI(gui, title = "Scale Matrix") {
  const div = document.createElement("div");
  div.style.fontFamily = "monospace";
  //div.style.fontSize = "12px";
  div.style.fontSize = font_size;
  div.style.marginTop = marginTop_size;
  div.style.lineHeight = lineHeight_size;
  gui.domElement.appendChild(div);

  function c(value, color) {
    return `<span style="color:${color}">${value}</span>`;
  }

  return function updateScaleMatrix(sx, sy, sz) {
    div.innerHTML = `
<b>${title}</b><br>
${c(sx.toFixed(2), COLORS.X)} &nbsp; ${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("0.00", COLORS.NEUTRAL)}<br>
${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c(sy.toFixed(2), COLORS.Y)} &nbsp; ${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("0.00", COLORS.NEUTRAL)}<br>
${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c(sz.toFixed(2), COLORS.Z)} &nbsp; ${c("0.00", COLORS.NEUTRAL)}<br>
${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("1.00", COLORS.NEUTRAL)}
`;
  };
}

// ======================================================
// TRANSLATION MATRIX UI 
// ======================================================
export function createTranslationMatrixUI(gui, title = "Translation Matrix") {
  const div = document.createElement("div");
  div.style.fontFamily = "monospace";
  //div.style.fontSize = "12px";
  div.style.fontSize = font_size;
  div.style.marginTop = marginTop_size;
  div.style.lineHeight = lineHeight_size;
  gui.domElement.appendChild(div);

  function c(value, color) {
    return `<span style="color:${color}">${value}</span>`;
  }

  return function updateTranslationMatrix(tx, ty, tz) {
    div.innerHTML = `
<b>${title}</b><br>
${c("1.00", COLORS.NEUTRAL)} &nbsp; ${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c(tx.toFixed(2), COLORS.X)}<br>
${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("1.00", COLORS.NEUTRAL)} &nbsp; ${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c(ty.toFixed(2), COLORS.Y)}<br>
${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("1.00", COLORS.NEUTRAL)} &nbsp; ${c(tz.toFixed(2), COLORS.Z)}<br>
${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("0.00", COLORS.NEUTRAL)} &nbsp; ${c("1.00", COLORS.NEUTRAL)}
`;
  };
}

// ======================================================
// ROTATION MATRIX UI (Euler XYZ, degrees)
// ======================================================
export function createRotationMatrixUI(gui, title = "Model Rotation Matrix") {
  const div = document.createElement("div");
  div.style.fontFamily = "monospace";
  //div.style.fontSize = "12px";
 div.style.fontSize = font_size;
  div.style.marginTop = marginTop_size;
  div.style.lineHeight = lineHeight_size;
  gui.domElement.appendChild(div);

  function c(value, color) {
    return `<span style="color:${color}">${value}</span>`;
  }

  return function updateRotationMatrix(m) {
    const e = m.elements;
    div.innerHTML = `
<b>${title}</b><br>
${c(e[0].toFixed(2), COLORS.X)} &nbsp; ${c(e[4].toFixed(2), COLORS.Y)} &nbsp; ${c(e[8].toFixed(2),  COLORS.Z)} &nbsp; 0.00<br>
${c(e[1].toFixed(2), COLORS.X)} &nbsp; ${c(e[5].toFixed(2), COLORS.Y)} &nbsp; ${c(e[9].toFixed(2),  COLORS.Z)} &nbsp; 0.00<br>
${c(e[2].toFixed(2), COLORS.X)} &nbsp; ${c(e[6].toFixed(2), COLORS.Y)} &nbsp; ${c(e[10].toFixed(2), COLORS.Z)} &nbsp; 0.00<br>
0.00 &nbsp; 0.00 &nbsp; 0.00 &nbsp; 1.00
`;
  };
}

// ======================================================
// GENERIC 4x4 MATRIX UI (Model Matrix, View, Projection)
// ======================================================
export function createMatrix4UI(gui, title = "Matrix4") {
  const div = document.createElement("div");
  div.classList.add("matrix-ui");
  div.style.fontFamily = "monospace";
 div.style.fontSize = font_size;
  div.style.marginTop = marginTop_size;
  div.style.lineHeight = lineHeight_size;
  gui.domElement.appendChild(div);

  function c(value, color) {
    return `<span style="color:${color}">${value}</span>`;
  }

  return function updateMatrix4(m) {
    const e = m.elements; // column-major in Three.js

    div.innerHTML = `
<b>${title}</b><br>
${c(e[0].toFixed(2),  COLORS.X)} &nbsp;
${c(e[4].toFixed(2),  COLORS.Y)} &nbsp;
${c(e[8].toFixed(2),  COLORS.Z)} &nbsp;
${c(e[12].toFixed(2), COLORS.X)}<br>

${c(e[1].toFixed(2),  COLORS.X)} &nbsp;
${c(e[5].toFixed(2),  COLORS.Y)} &nbsp;
${c(e[9].toFixed(2),  COLORS.Z)} &nbsp;
${c(e[13].toFixed(2), COLORS.Y)}<br>

${c(e[2].toFixed(2),  COLORS.X)} &nbsp;
${c(e[6].toFixed(2),  COLORS.Y)} &nbsp;
${c(e[10].toFixed(2), COLORS.Z)} &nbsp;
${c(e[14].toFixed(2), COLORS.Z)}<br>

${c(e[3].toFixed(2),  COLORS.NEUTRAL)} &nbsp;
${c(e[7].toFixed(2),  COLORS.NEUTRAL)} &nbsp;
${c(e[11].toFixed(2), COLORS.NEUTRAL)} &nbsp;
${c(e[15].toFixed(2), COLORS.NEUTRAL)}
`;
  };
}

export function createPerspectiveMatrixFormulaUI(gui, title = "Perpective Matrix Formula") {
  const div = document.createElement("div");
  div.classList.add("matrix-ui");
  div.style.fontFamily = "monospace";
  //div.style.fontSize = "10px";
  div.style.fontSize = font_size;
  div.style.marginTop = marginTop_size;
  div.style.lineHeight = lineHeight_size;
  
  div.style.display = "none"; // hidden by default

  gui.domElement.appendChild(div);

  function c(value, color) {
    return `<span style="color:${color}">${value}</span>`;
  }

  function update() {

    div.innerHTML = `
<b>${title}</b><br>
${c("2n/(r-l)",  COLORS.X)} &nbsp;
${c("0.000",  COLORS.Y)} &nbsp;
${c("(r+l)/(r-l)",  COLORS.Z)} &nbsp;
${c("0.00", COLORS.X)}<br>

${c("0.000",  COLORS.X)} &nbsp; 
${c("2n/(t-b)",  COLORS.Y)} &nbsp;
${c("(t+b)/(t-b)",  COLORS.Z)} &nbsp;
${c("0.00", COLORS.Y)}<br>

${c("0.000",  COLORS.X)} &nbsp;
${c("0.0000",  COLORS.Y)} &nbsp;
${c("(n-f)/(f-n)", COLORS.Z)} &nbsp;
${c("-2fn/(f-n)", COLORS.Z)}<br>

${c("0.0000",  COLORS.NEUTRAL)} &nbsp;
${c("0.0000",  COLORS.NEUTRAL)} &nbsp;
${c("-1.0000", COLORS.NEUTRAL)} &nbsp;
${c("0.00", COLORS.NEUTRAL)}
`;
  };

  
  return { div, update };

}

export function createOrthographicMatrixFormulaUI(gui, title = "Orthographic Matrix Formula") {
  const div = document.createElement("div");
  div.classList.add("matrix-ui");
  div.style.fontFamily = "monospace";
  //div.style.fontSize = "10px";
  div.style.fontSize = font_size;
  div.style.marginTop = marginTop_size;
  div.style.lineHeight = lineHeight_size;

  div.style.display = "none"; // hidden by default

  gui.domElement.appendChild(div);

  function c(value, color) {
    return `<span style="color:${color}">${value}</span>`;
  }

  function update() {

    div.innerHTML = `
<b>${title}</b><br>
${c("2/(r-l)",  COLORS.X)} &nbsp;
${c("0.00",  COLORS.Y)} &nbsp;
${c("0.0000",  COLORS.Z)} &nbsp;
${c("(r-l)/(r+l)", COLORS.X)}<br>

${c("0.0000",  COLORS.X)} &nbsp; 
${c("2/t-b",  COLORS.Y)} &nbsp;
${c("0.0000",  COLORS.Z)} &nbsp;
${c("t-b/t+b", COLORS.Y)}<br>

${c("0.0000",  COLORS.X)} &nbsp;
${c("0.000",  COLORS.Y)} &nbsp;
${c("-2/f-n", COLORS.Z)} &nbsp;
${c("(f-n)/(f+n)", COLORS.Z)}<br>

${c("0.0000",  COLORS.NEUTRAL)} &nbsp;
${c("0.0000",  COLORS.NEUTRAL)} &nbsp;
${c("0.0000", COLORS.NEUTRAL)} &nbsp;
${c("1.00", COLORS.NEUTRAL)}
`;
  };
  
  return { div, update };

}


export function createViewportMatrixFormulaUI(gui, title = "Viewport Matrix Formula") {
  const div = document.createElement("div");
  div.classList.add("matrix-ui");
  div.style.fontFamily = "monospace";
 //div.style.fontSize = "10px";
 div.style.fontSize = font_size;
  div.style.marginTop = marginTop_size;
  div.style.lineHeight = lineHeight_size;

  div.style.display = "none"; // hidden by default

  gui.domElement.appendChild(div);

  function c(value, color) {
    return `<span style="color:${color}">${value}</span>`;
  }

  function update() {

    div.innerHTML = `
<b>${title}</b><br>
${c(" W/2",  COLORS.X)} &nbsp;
${c("0.0",  COLORS.Y)} &nbsp;
${c("0.000",  COLORS.Z)} &nbsp;
${c("X + W/2", COLORS.X)}<br>

${c("0.0",  COLORS.X)} &nbsp; 
${c("H/2",  COLORS.Y)} &nbsp;
${c("0.000",  COLORS.Z)} &nbsp;
${c("Y + H/2", COLORS.Y)}<br>

${c("0.0",  COLORS.X)} &nbsp;
${c("0.0",  COLORS.Y)} &nbsp;
${c("(F-N)/2", COLORS.Z)} &nbsp;
${c("(F+N)/2", COLORS.Z)}<br>

${c("0.0",  COLORS.NEUTRAL)} &nbsp;
${c("0.0",  COLORS.NEUTRAL)} &nbsp;
${c("0.000", COLORS.NEUTRAL)} &nbsp;
${c("1.00", COLORS.NEUTRAL)}
`;
  };

  
  return { div, update };

}
