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
import cytoscape from "cytoscape";
import { useEffect, useRef, useState } from "react";

export default function NodeTest() {
  const cyRef = useRef<Core | null>(null);

  const [topics, setTopics] = useState<cytoscape.ElementDefinition[]>([]);
  const [styles, setStyles] = useState<any[]>([]);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    label: "",
  });

  useEffect(() => {
    const newStyle: any[] = [
      {
        selector: "node",
        style: {
          width: 80,
          height: 80,
          label: "data(label)",
          "text-valign": "center",
          "text-halign": "center",
          "font-size": 14,
          "font-weight": "bold",
          "text-transform": "uppercase",
          color: "#000",
          "text-background-color": "#fff",
          "text-background-opacity": 0.7,
          "text-background-padding": 4,
          "text-background-shape": "roundrectangle",
          "background-color": "#ff0080",
          "border-width": 20,
          "border-color": "#b0005a",
          "shadow-blur": 40,
          "shadow-color": "#ff0080",
          "shadow-opacity": 0.7,
        },
      },
      // Single global edge rule — reads everything from data()
      {
        selector: "edge",
        style: {
          width: 2,
          "line-color": "data(lineColor)",
          "line-style": "data(lineStyle)",
          "line-opacity": 0.5,
          "target-arrow-shape": "none",
          "curve-style": "unbundled-bezier",
          // "curve-style": "straight",
          "control-point-distances": "data(controlPointDistance)",
          "control-point-weights": 0.5,
        },
      },
    ];

    async function getTopics() {
      const [res, connection] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topics`),
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topic-connections`),
      ]);
      const data = await res.json();
      const connect = await connection.json();

      const List: cytoscape.ElementDefinition[] = [];

      // --- Nodes ---
      data.forEach((topic: any) => {
        List.push({
          data: {
            id: String(topic.id),
            label: topic.title,
            url: `/video/${topic.slug}`,
          },
          position: { x: topic.x_axis, y: topic.y_axis },
        });

        // Per-node style (color only — everything else inherited from global node rule)
        newStyle.push({
          selector: `#${topic.id}`,
          style: {
            "background-color": topic.node_color ?? "#ff0080",
            "border-color": topic.node_color ?? "#b0005a",
            "border-opacity": 0.5,
            "shadow-color": topic.node_color ?? "#ff0080",
          },
        });
      });

      // --- Edges ---
      // Track edge count per source so parallel edges get different curve amounts
      const edgeCountBySource: Record<string, number> = {};

      connect.forEach((element: any) => {
        const source = String(element.topic_id);
        const target = String(element.connected_topic_id);

        // Increment count for this source
        edgeCountBySource[source] = (edgeCountBySource[source] ?? 0) + 1;
        const edgeIndex = edgeCountBySource[source];

        // Alternate direction: 1st → +50, 2nd → -50, 3rd → +100, 4th → -100
        const sign = edgeIndex % 2 === 0 ? -1 : 1;
        const magnitude = Math.ceil(edgeIndex / 2) * 50;
        const controlPointDistance = sign * magnitude;

        const lineColor = [15, 12, 10, 2].includes(element.topic_id)
          ? "#F72585"
          : "#4CC9F0";

        List.push({
          data: {
            source,
            target,
            lineStyle: element.line_style ?? "solid",
            lineColor,
            controlPointDistance,
          },
        });
        // ✅ No newStyle.push() for edges — global edge rule handles everything via data()
      });

      setTopics(List);
      setStyles(newStyle);
    }

    getTopics();
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
          <div className="flex gap-3 items-center justify-center bg-slate-700 rounded px-3 py-1">
            <span className="text-sm">Tracking</span>
            <input type="checkbox" />
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
            onClick={handleZoomOut}
            size="1x"
            className="text-white bg-slate-700 p-1 rounded hover:cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faHand}
            onClick={handleFitAll}
            size="1x"
            className="text-white bg-slate-700 p-1 rounded hover:cursor-pointer"
          />
        </div>
      </div>

      <div style={{ width: "100%", height: "100vh" }} className="h-full relative">
        <CytoscapeComponent
          elements={topics}
          autoungrabify={true}
          stylesheet={styles}
          layout={{
            name: "preset",  // respects your x_axis/y_axis from DB
            fit: true,
            padding: 60,
          }}
          style={{ width: "100%", height: "100%" }}
          cy={(cy) => {
            cyRef.current = cy;

            cy.on("tap", "node", (event) => {
              const url = event.target.data("url");
              if (url) window.open(url, "_blank");
            });

            cy.on("mouseover", "node", (e) => {
              const container = cy.container();
              if (container) container.style.cursor = "pointer";
              const pos = e.renderedPosition;
              const label = e.target.data("label");
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
            <div className="w-2 h-2 bg-white border-b border-r border-pink-500/40 rotate-45 ml-4 -mt-1" />
          </div>
        )}
      </div>
    </>
  );
}