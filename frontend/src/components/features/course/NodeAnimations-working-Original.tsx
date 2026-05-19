import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";

export default function NodeAnimationsBackUp() {
  const cyRef = useRef(null);
    // User State Data
    const [topics, setTopics] = useState<cytoscape.ElementDefinition[]>([]);
    const [styles, setStyles] = useState([]);
    const [tooltip, setTooltip] = useState({
      visible: false,
      x: 0,
      y: 0,
      label: "",
    });
  useEffect(() => {
    const cy = cytoscape({
      container: cyRef.current,
 elements : [
        { data: { id: "1", label: "Intro to Space", url: "https://example.com/intro" } },
        { data: { id: "2", label: "Model Space", url: "https://example.com/intro" } },
        { data: { id: "3", label: "Translation", url: "https://example.com/intro" } },
        { data: { id: "4", label: "Projection Matrix", url: "https://example.com/intro" } },
        { data: { id: "5", label: "Perspective Divine", url: "https://example.com/intro" } },
        { data: { id: "6", label: "Scale", url: "https://example.com/intro" } },
        { data: { id: "7", label: "Rotation", url: "https://example.com/intro" } },
        { data: { id: "8", label: "Camera Space", url: "https://example.com/intro" } },
        { data: { id: "9", label: "Viewport Matrix", url: "https://example.com/intro" } },

        // Links
        { data: { source: "1", target: "2" } },
        { data: { source: "1", target: "5" } },
        { data: { source: "2", target: "3" } },
        { data: { source: "3", target: "1" } },
        { data: { source: "4", target: "3" } },
        { data: { source: "5", target: "4" } },
        { data: { source: "6", target: "3" } },
        { data: { source: "7", target: "1" } },
        { data: { source: "8", target: "5" } },
        { data: { source: "9", target: "7" } },
    ],

      style: [
        // ---------------- NODES ----------------
        {
          selector: "node",
          style: {
            label: "data(id)",
            color: "#fff",
            "text-valign": "center",
            width: 40,
            height: 40,
            "background-color": "#3498db",
            // smooth animation
            "transition-property":
              "background-color width height opacity shadow-blur shadow-color",
            "transition-duration":  250,
          },
        },

        // ---------------- EDGES ----------------
        {
          selector: "edge",
          style: {
            width: 2,
            opacity: 0.5,
            "line-color": "#888",
            "target-arrow-color": "#888",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            "transition-property": "line-color opacity width",
            "transition-duration":  250,
          },
        },

        // ---------------- HOVER NODE ----------------
        {
          selector: ".hovered",
          style: {
            width: 60,
            height: 60,
            "background-color": "#00e5ff",
            // glow
            "shadow-blur": 30,
            "shadow-color": "#00e5ff",
            "shadow-opacity": 1,
          },
        } as any,

        // ---------------- CONNECTED NODE ----------------
        {
          selector: ".connected",
          style: {
            "background-color": "#4dd0e1",
            "shadow-blur": 15,
            "shadow-color": "#4dd0e1",
            "shadow-opacity": 0.8,
          },
        },

        // ---------------- ACTIVE EDGE ----------------
        {
          selector: ".activeEdge",
          style: {
            width: 2,
            opacity: 1,
            "line-color": "#00e5ff",
            "target-arrow-color": "#00e5ff",
            // animated dashed line
            "line-style": "dashed",
            "line-dash-pattern": [8, 4],
          },
        },

        // ---------------- FADED ----------------
        {
          selector: ".faded",
          style: {
            opacity: 0.5,
          },
        },
      ],

      layout: {
        name: "cose",
      },
    });

    // ---------------- HOVER ON ----------------
    cy.on("mouseover", "node", (e) => {
      const node = e.target;

      // fade everything
      cy.elements().addClass("faded");

      // hovered node
      node.removeClass("faded");
      node.addClass("hovered");

      // connected edges
      const edges = node.connectedEdges();

      edges.removeClass("faded");
      edges.addClass("activeEdge");

      // neighbor nodes
      const neighbors = edges.connectedNodes();

      neighbors.removeClass("faded");
      neighbors.addClass("connected");
    });

    // ---------------- HOVER OFF ----------------
    cy.on("mouseout", "node", (e) => {
      cy.elements().removeClass("faded hovered connected activeEdge");
    });

    // ---------------- EDGE ANIMATION ----------------
    let offset = 0;
    let frame:any;

    const animate = () => {
      offset -= 1;

      cy.edges(".activeEdge").style("line-dash-offset", offset);

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      cy.destroy();
    };
  }, []);

  return (
    <div
      ref={cyRef}
      style={{
        width: "100%",
        height: "500px",
      }}
    />
  );
}
