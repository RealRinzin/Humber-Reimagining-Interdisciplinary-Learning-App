"use client";
import {
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CytoscapeComponent from "react-cytoscapejs";
import type { Core, StylesheetCSS } from "cytoscape";
import { useEffect, useRef, useState } from "react";
import { TopicType } from "@/types/topic/topic.types";
export default function NodeTest() {
  const cyRef = useRef<Core | null>(null);
  // User State Data
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [styles, setStyles] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

  // console.log(elements)
  const stylesheet: any = [
    {
      selector: "node",
      style: {
        // ← align to top∂∂
        width: 80,
        height: 80,
        // Label Text
        label: "data(label)",
        cursor: "pointer",
        "text-valign": "center",
        "text-halign": "center",
        // Font
        // "font-family": "Arial, sans-serif", // any valid CSS font
        "font-size": 14, // in pixels
        "font-weight": "bold", // normal | bold | 100..900
        // "font-style": "italic", // normal | italic | oblique
        "text-transform": "uppercase", // none | uppercase | lowercase | capitalize
        // Color and outline
        color: "#000",
        // Text background (optional)
        "text-background-color": "#fff",
        "text-background-opacity": 0.7,
        "text-background-padding": 4,
        "text-background-shape": "roundrectangle",
        // Inner circle
        "background-color": "#ff0080",
        // Ring effect
        "border-width": 20,
        "border-color": "#b0005a",
        // Glow
        "shadow-blur": 40,
        "shadow-color": "#ff0080",
        "shadow-opacity": 0.7,
      },
    },
    {
      selector: "#4",
      style: {
        width: 80,
        height: 80,
        // Label Text
        label: "data(label)",
        cursor: "pointer",
        "text-valign": "center",
        "text-halign": "center",
        // Font
        // "font-family": "Arial, sans-serif", // any valid CSS font
        "font-size": 14, // in pixels
        "font-weight": "bold", // normal | bold | 100..900
        // "font-style": "italic", // normal | italic | oblique
        "text-transform": "uppercase", // none | uppercase | lowercase | capitalize
        // Color and outline
        color: "#000",
        // Text background (optional)
        "text-background-color": "#fff",
        "text-background-opacity": 0.7,
        "text-background-padding": 4,
        "text-background-shape": "roundrectangle",
        // Inner circle
        "background-color": "#999999",
        // Ring effect
        "border-width": 20,
        "border-color": "#666666",

        // Glow
        "shadow-blur": 80,
        "shadow-color": "#00ff88",
        "shadow-opacity": 0.7,
      },
    },
    {
      selector: "#18",
      style: {
        width: 80,
        height: 80,
        // Label Text
        label: "data(label)",
        cursor: "pointer",

        "text-valign": "center",
        "text-halign": "center",
        // Font
        // "font-family": "Arial, sans-serif", // any valid CSS font
        "font-size": 14, // in pixels
        "font-weight": "bold", // normal | bold | 100..900
        // "font-style": "italic", // normal | italic | oblique
        "text-transform": "uppercase", // none | uppercase | lowercase | capitalize
        // Color and outline
        color: "#000",
        // Text background (optional)
        "text-background-color": "#fff",
        "text-background-opacity": 0.7,
        "text-background-padding": 4,
        "text-background-shape": "roundrectangle",
        // Inner circle
        "background-color": "#99cc99",
        // Ring effect
        "border-width": 20,
        "border-color": "#329932",

        // Glow
        "shadow-blur": 80,
        "shadow-color": "#00ff88",
        "shadow-opacity": 0.7,
      },
    },
    // Edge
    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#32325b",
        "curve-style": "bezier",
        "target-arrow-shape": "triangle",
        "target-arrow-color": "#888",
      },
    },
    {
      selector: 'edge[source = "2"], edge[target = "3"]',
      style: {
        width: 3,
        "line-color": "#32325b",
        "curve-style": "bezier",
        "target-arrow-shape": "triangle",
        "target-arrow-color": "#888",
        "line-style": "dashed",
        "line-dash-pattern": [4, 3], // [dash length, gap length]
      },
    },
  ];

  useEffect(() => {
    const List = [];
    const newStyle: any = [
      {
        selector: "node",
        style: {
          // ← align to top∂∂
          width: 80,
          height: 80,
          // Label Text
          label: "data(label)",
          cursor: "pointer",
          "text-valign": "center",
          "text-halign": "center",
          // Font
          // "font-family": "Arial, sans-serif", // any valid CSS font
          "font-size": 14, // in pixels
          "font-weight": "bold", // normal | bold | 100..900
          // "font-style": "italic", // normal | italic | oblique
          "text-transform": "uppercase", // none | uppercase | lowercase | capitalize
          // Color and outline
          color: "#000",
          // Text background (optional)
          "text-background-color": "#fff",
          "text-background-opacity": 0.7,
          "text-background-padding": 4,
          "text-background-shape": "roundrectangle",
          // Inner circle
          "background-color": "#ff0080",
          // Ring effect
          "border-width": 20,
          "border-color": "#b0005a",
          // Glow
          "shadow-blur": 40,
          "shadow-color": "#ff0080",
          "shadow-opacity": 0.7,
        },
      },
    ];
    // function
    async function getTopics() {
      // Topcis
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topics`);
      const data = await res.json();
      // Connection
      const connection = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/topic-connections`,
      );
      const connect = await connection.json();
      console.log(connect);
      const List: TopicType[] = [];
      // Push the nodes into array
      data.forEach((topic: any) => {
        List.push({
          data: {
            id: topic.id,
            label: topic.title,
            url: `video/${topic.slug}`,
          },
          position: { x: topic.x_axis, y: topic.y_axis },
        });
        // Set the Each selector border style , background color, border color etc
        newStyle.push({
          selector: `#${topic.id}`,
          style: {
            width: 80,
            height: 80,
            // Label Text
            label: "data(label)",
            cursor: "pointer",
            "text-valign": "center",
            "text-halign": "center",
            // Font
            // "font-family": "Arial, sans-serif", // any valid CSS font
            "font-size": 14, // in pixels
            "font-weight": "bold", // normal | bold | 100..900
            // "font-style": "italic", // normal | italic | oblique
            "text-transform": "uppercase", // none | uppercase | lowercase | capitalize
            // Color and outline
            color: "#000",
            // Text background (optional)
            "text-background-color": "#fff",
            "text-background-opacity": 0.7,
            "text-background-padding": 4,
            "text-background-shape": "roundrectangle",
            // Inner circle
            "background-color": `${topic.node_color}`,
            // Ring effect
            "border-width": 20,
            "border-color": `${topic.node_color}`,
            "border-opacity": 0.5,
            // Glow
            "shadow-blur": 80,
            "shadow-color": "#00ff88",
            "shadow-opacity": 0.7,
          },
        });
      });
      // Push the connection into the on the list too
      connect.forEach((element: any) => {
        List.push({
          data: {
            source: element.topic_id,
            target: element.connected_topic_id,
          },
        });
        // Node Connection dash | dotted
        newStyle.push({
          // selector: 'edge[source = "2"], edge[target = "3"]',
          selector: `edge[source = "${element.topic_id}"], edge[target = "${element.connected_topic_id}"]`,
          style: {
            width: 2,
            "line-color": "#F72585",
            "curve-style": "straight", // beizer, straight, taxi, segments
            "target-arrow-shape": "none", // triangle, vee, circle, none
            "line-style": `${element.line_style}`,
            "line-opacity": 0.4,
            // "line-dash-pattern": [4, 3], // [dash length, gap length]
          },
        });
      });
      // Set the new list and style
      setTopics(List);
      setStyles(newStyle);
    }
    // Invoke Function
    getTopics();
    // Tooltips

  }, []);
  return (
    <>
      <div className="p-2 text-white">
        <div className="flex justify-end items-center">
          <div className="flex gap-3 items-center justify-center bg-slate-700 rounded px-3 py-1 ">
            <span className="text-sm ">Tracking</span>
            <span>
              <input type="checkbox" className="" />
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-end items-end gap-2 my-2">
          <FontAwesomeIcon
            icon={faMagnifyingGlassPlus}
            size="1x"
            className="text-white bg-slate-700 p-1 rounded hover:cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlassMinus}
            size="1x"
            className="text-white bg-slate-700 p-1 rounded hover:cursor-pointer"
          />
        </div>
      </div>
      <div style={{ width: "100%", height: "100vh" }} className="h-full relative">
        <CytoscapeComponent
          elements={topics}
          autoungrabify={true} // Disable the node dragging
          stylesheet={styles}
          layout={{
            name: "cose",
            fit: true,
            animate: true,
            padding: 20,
          }}
          style={{ width: "100%", height: "100%" }}
          cy={(cy) => {
            cyRef.current = cy;
            //
            cy.on("tap", "node", (event) => {
              const node = event.target;
              const url = node.data("url");
              if (url) {
                window.open(url, "_blank");
              }
            });
            // inside useEffect
            cy.on("mouseover", "node", (e) => {
              const pos = e.renderedPosition;
              setTooltip({ visible: true, x: pos.x, y: pos.y });
            });

            cy.on("mouseout", "node", () => {
              setTooltip({ visible: false, x: 0, y: 0 });
            });
          }}
        />
        {tooltip.visible && (
          <div
          className="absolute bg-white px-2 py-4 rounded-md text-black text-sm"
            style={{
              // position: "absolute",
              left: tooltip.x + 10,
              top: tooltip.y - 30,
              pointerEvents: "none", // so it doesn't interfere with mouse events
            }}
          >
This is information
          </div>
        )}
      </div>
    </>
  );
}
