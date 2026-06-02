
export function addHint(text) {
  const div = document.createElement("div");
  div.className = "hint";
  div.textContent = text;
  document.body.appendChild(div);
}
