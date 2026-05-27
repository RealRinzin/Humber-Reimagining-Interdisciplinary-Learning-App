"use client";
import {
  faHand,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CytoscapeComponent from "react-cytoscapejs";
import type { Core } from "cytoscape";
import { useEffect, useRef, useState } from "react";
import { clientFetch } from "@/lib/clientFetch";
function makeRing(progress: any, color: any, innerColor: any) {
  const r = 36,
    cx = 50,
    cy = 50,
    sw = 10;
  const circ = 2 * Math.PI * r;
  const dash = (progress / 100) * circ;
  const gap = circ - dash;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#d0d0d8" stroke-width="${sw}"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}"
      stroke-dasharray="${dash.toFixed(1)} ${gap.toFixed(1)}"
      stroke-linecap="round"
      transform="rotate(-90 ${cx} ${cy})"/>
    <circle cx="${cx}" cy="${cy}" r="24" fill="${innerColor}"/>
  </svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}
export default function CourseNodeLink() {
  const cyRef = useRef<Core | null>(null);
  // User State Data
  const [topics, setTopics] = useState<cytoscape.ElementDefinition[]>([]);
  const [styles, setStyles] = useState([]);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    label: "",
  });

  // Use Effect state for loading
  useEffect(() => {
    const List = []; // List of Topic Nodes
    const newStyle: any = [
      // Initialize static properties that are common for all the nodes
      {
        selector: "node",
        style: {
          width: 100,
          height: 100,
          "background-color": "transparent",
          "background-fit": "cover",
          "border-width": 0,
          "border-color": "transparent",
          "border-opacity": 0,
          label: "data(label)",
          "font-size": 13,
          color: "white",
          "text-valign": "center",
          "text-halign": "center",
          "font-weight": "500",
        },
      },
      {
        selector: "edge",
        style: {
          width: 2,
          "line-color": "data(lineColor)",
          "line-style": "data(lineStyle)",
          "line-opacity": 0.5,
          "target-arrow-shape": "none",
          "curve-style": "unbundled-bezier", // ← key change
          "control-point-distances": "data(controlPointDistance)",
          "control-point-weights": 0.5,
        },
      },
    ];
    // function
    async function getTopics() {
      // Topcis

      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topics`);
      const res = await clientFetch(`/topics`);
      const { data: topics } = await res.json();
      // Connection
      // const connection = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/topic-connections`,
      // );
      const topicConnection = await clientFetch("/topic-connections");
      const connect = await topicConnection.json();
      // const List: TopicType[] = [];
      const List: cytoscape.ElementDefinition[] = [];
      // const List: cytoscape.ElementDefinition[] = [];
      // Push the nodes into array
      topics.forEach((topic: any, index: number) => {
        List.push({
          data: {
            id: String(topic.id),
            label: topic.title,
            source: null, // add this
            target: null, // add this
            node_color: null,
            url: `/video/${topic.slug}`,
            controlPointDistance:
              (Math.floor(index / 2) + 1) * 40 * (index % 2 === 0 ? 1 : -1),
          },
          position: { x: topic.x_axis, y: topic.y_axis },
        });
        // Set the Each selector border style , background color, border color etc
        newStyle.push({
          selector: `#${topic.id}`,
          style: {
            width: 100,
            height: 100,
            "border-width": 0, // ← add
            "border-color": "transparent", // ← add
            "border-opacity": 0, // ← add
            label: "data(label)",
            cursor: "pointer",
            "text-valign": "center",
            "text-halign": "center",
            "font-size": 14,
            "font-weight": "bold",
            "text-transform": "uppercase",
            color: "#000",
            "background-image": (ele: any) => {
              return makeRing(
                Math.floor(Math.random() * 100),
                topic.node_color,
                topic.node_color,
              );
            },
            "text-background-color": "#fff",
            "text-background-opacity": 0.7,
            "text-background-padding": 4,
            "text-background-shape": "roundrectangle",
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
            // id: null,
            url: null,
            label: null,
            node_color: null,
            source: element.topic_id,
            target: element.connected_topic_id,
          },
        });
        // Node Connection dash | dotted
        newStyle.push({
          // selector: 'edge[source = "2"], edge[target = "3"]',
          // selector: `edge[source = "${element.topic_id}"], edge[target = "${element.connected_topic_id}"]`,
          selector: `edge[source = "${element.topic_id}"][target = "${element.connected_topic_id}"]`,
          style: {
            width: 2,
            "line-color": `${[15, 12, 10, 2].includes(element.topic_id) ? "#F72585" : "#4CC9F0"}`,
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

  const handleZoomIn = () => {
    if (cyRef.current) {
      cyRef.current.zoom(cyRef.current.zoom() * 1.2);
      cyRef.current.center();
    }
  };

  const handleZoomOut = () => {
    if (cyRef.current) {
      cyRef.current.zoom(cyRef.current.zoom() * 0.8);
      cyRef.current.center();
    }
  };

  const handleFitAll = () => {
    if (cyRef.current) {
      cyRef.current.fit(undefined, 40);
    }
  };
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
            onClick={handleZoomIn}
            size="1x"
            className="text-white bg-slate-700 p-1 rounded hover:cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlassMinus}
            size="1x"
            onClick={handleZoomOut}
            className="text-white bg-slate-700 p-1 rounded hover:cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faHand}
            size="1x"
            onClick={handleFitAll}
            className="text-white bg-slate-700 p-1 rounded hover:cursor-pointer"
          />
        </div>
      </div>
      <div
        style={{ width: "100%", height: "100vh" }}
        className="h-full relative"
      >
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
            //tap and node
            cy.on("tap", "node", (event) => {
              const node = event.target;
              const url = node.data("url");
              if (url) {
                window.open(url, "_blank");
              }
            });
            // Mouse over
            cy.on("mouseover", "node", (e) => {
              const container = cy.container();
              const pos = e.renderedPosition;
              const label = e.target.data("label");
              if (container) container.style.cursor = "pointer";
              setTooltip({ visible: true, x: pos.x, y: pos.y, label });
            });

            cy.on("mouseout", "node", () => {
              const container = cy.container();
              if (container) container.style.cursor = "default";

              setTooltip({ visible: false, x: 0, y: 0, label: "" });
            });
          }}
        />
        {/* Tooltip */}
        {tooltip.visible && (
          <div
            className="absolute z-30 pointer-events-none"
            style={{ left: tooltip.x + 16, top: tooltip.y - 60 }}
          >
            <div className="bg-white border border-pink-500/40 rounded-xl px-4 py-3 shadow-xl shadow-pink-900/20 min-w-45">
              <p className="text-black font-bold text-sm uppercase tracking-wide mb-1">
                {tooltip.label}
              </p>
              <div className="flex items-center gap-1.5 text-pink-400 text-xs mt-2">
                <FontAwesomeIcon icon={faPlayCircle} size="sm" />
                <span>Click to watch</span>
              </div>
            </div>
            {/* Arrow */}
            <div className="w-2 h-2 bg-white border-b border-r border-pink-500/40 rotate-45 ml-4 -mt-1" />
          </div>
        )}
      </div>
    </>
  );
}
