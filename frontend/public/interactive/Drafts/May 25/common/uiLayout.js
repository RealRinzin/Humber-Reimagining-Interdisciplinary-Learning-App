export function colorizeController(controller, color) {
  const el = controller.domElement;

  // Label text
  const label = el.querySelector(".name");
  if (label) label.style.color = color;

  // Numeric value
  const value = el.querySelector(".value");
  if (value) value.style.color = color;

  // Slider track + thumb
  const slider = el.querySelector("input[type='range']");
  if (slider) {
    slider.style.setProperty("--track-color", color);
    slider.style.accentColor = color; // modern browsers
  }
}
