export const SIZE = {
font: "1.2vw",
lineHeight: "1.2vw",
marginTop: "1vw",
marginSmall: "0.5vw",
GUI_width: "30vw",
font_title: "1.2vw",
font_large: "1.5vw"
};


export function scaleGUI(gui) {
  const root = gui.domElement;

  //const size = `clamp(10px, ${scaleVW}vw, 18px)`;

  // Apply font size to all text elements
  root.querySelectorAll("*").forEach(el => {
    el.style.fontSize = SIZE.font;
  });

  // Fix folder titles
  root.querySelectorAll(".title").forEach(el => {
    el.style.fontSize = SIZE.font_title;
    el.style.fontWeight = "bold";
    
  el.style.whiteSpace = "normal";   // allow wrapping
  
el.style.paddingTop = "0.0px";
  el.style.paddingBottom = "0.0px";
 // el.style.lineHeight = SIZE.font_title;

  el.style.marginTop = "0.0px";
  el.style.marginBottom = "0.0px";

  //el.style.minHeight = "auto";
  //el.style.height = "3em";

  });

  
root.querySelectorAll(".folder").forEach(folder => {
  folder.style.marginBottom = "0.4em";
  folder.style.flexWrap = "wrap";
  folder.style.margin = "0";

  //folder.style.whiteSpace = "normal";
});

  // Fix labels (controller names)
  root.querySelectorAll(".name").forEach(el => {
    el.style.fontSize = SIZE.font;
    
  });

  
// ✅ Step 3: THIS is the actual container (critical)
root.querySelectorAll(".widget").forEach(widget => {
  widget.style.flex = "1";
  widget.style.display = "flex";
  widget.style.alignItems = "center";
  widget.style.gap = "0.4em";
});

// ✅ Step 4: Slider takes remaining space
root.querySelectorAll("input[type='range']").forEach(slider => {
  slider.style.flex = "20";
  slider.style.minWidth = "0"; // VERY important in flex layouts
});


// ✅ Step 5: Number input fixed size
root.querySelectorAll("input[type='number']").forEach(input => {
  input.style.flex = "0 0 3.5em";
  input.style.width = "3.5em";
});


  // increase row spacing
  root.querySelectorAll(".controller").forEach(row => {
    // row.style.marginBottom = "0.2vw";
    // row.style.marginTop = "0.2vw";
    // row.style.height = "2.0vw";
//     row.style.minHeight = "1.0em";
//     row.style.paddingTop = "0.1em";
// row.style.paddingBottom = "0.1em";

   row.style.marginBottom = "0.2em";
    row.style.marginTop = "0.2em";

    // // instead of height
    // row.style.paddingTop = "0.1em";
    // row.style.paddingBottom = "0.1em";


 row.style.display = "flex";
  row.style.alignItems = "center";

  });

// root.querySelectorAll(".controller").forEach(row => {

//   const input = row.querySelector("input[type='number']");

//   if (input) {
//     // ✅ layout row properly
//     //row.style.display = "flex";
//     // row.style.alignItems = "center";
//     // row.style.gap = "0px";

//     // // ✅ label width
//     // const name = row.querySelector(".name");
//     // if (name) {
//     //   name.style.flex = "0 0 40%";
//     // }

//     // // ✅ input takes remaining space nicely
//     // input.style.flex = "10";
//     // input.style.minWidth = "0";

//     // // ✅ control its max width so it doesn't explode
//     // input.style.maxWidth = "8em";
//     input.style.width = "0.5vw";
//   }
// });



root.querySelectorAll("input[type='checkbox']").forEach(cb => {
  // cb.style.width = "1.2em";
  // cb.style.height = "1.2em";
  //cb.style.cursor = "pointer";
  
cb.style.transform = "scale(1vw)";
  //cb.style.transformOrigin = "left center";

});

root.querySelectorAll("select").forEach(sel => {
  sel.style.fontSize = SIZE.font;
  sel.style.padding = "0.2em";
  sel.style.width = "3.5em";  
});

root.querySelectorAll("button").forEach(b => {
  b.style.height = "2.0em";
    
});

root.querySelectorAll(".slider").forEach(t => {
  t.style.width = "10vw";
  // change the height of the slider (Dina: it does work)
  //t.style.height = "3.0em";
});

}



export const COLORS = {
  X: "#ff6666",
  Y: "#66ff66",
  Z: "#66a3ff",

  ORIGIN: 0x3399ff,
  OUTLINE: 0xff3333,
  OBJECT: 0x00ff00,

  NEUTRAL: "#aaaaaa",
  BACKGROUND: 0x0b0e12
};
