"use client";
import {
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faCircleInfo,
  faLock,
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
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    label: string;
    url: string;
  }>({ visible: false, x: 0, y: 0, label: "", url: "" });

  useEffect(() => {
    const newStyle: any[] = [
      {
        selector: "node",
        style: {
          width: 80,
          height: 80,
          label: "data(label)",
          cursor: "pointer",
          "text-valign": "center",
          "text-halign": "center",
          "font-size": 11,
          "font-weight": "bold",
          "text-transform": "uppercase",
          color: "#000",
          "text-background-color": "#fff",
          "text-background-opacity": 0.85,
          "text-background-padding": 4,
          "text-background-shape": "roundrectangle",
          "background-color": "#ff0080",
          "border-width": 18,
          "border-color": "#b0005a",
          "shadow-blur": 40,
          "shadow-color": "#ff0080",
          "shadow-opacity": 0.7,
        },
      },
      // Hover state
      {
        selector: "node:active",
        style: {
          "overlay-color": "#fff",
          "overlay-opacity": 0.15,
        },
      },
      {
        selector: "edge",
        style: {
          width: 2,
          "line-color": "#F72585",
          "curve-style": "bezier",
          "target-arrow-shape": "none",
          "line-opacity": 0.4,
        },
      },
      // Entry node — visually distinct "start here"
      {
        selector: "node[?isEntry]",
        style: {
          width: 100,
          height: 100,
          "border-width": 6,
          "border-color": "#00ff99",
          "shadow-color": "#00ff99",
          "shadow-blur": 60,
          "shadow-opacity": 1,
          "font-size": 13,
        },
      },
      // Isolated nodes (no edges) — dimmed
      {
        selector: "node[[degree = 0]]",
        style: {
          opacity: 0.45,
          "border-style": "dashed",
        },
      },
    ];

    async function getTopics() {
      try {
        const [res, connection] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topics`),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topic-connections`),
        ]);
        const data = await res.json();
        const connect = await connection.json();

        const List: cytoscape.ElementDefinition[] = [];

        // Find the entry node — lowest x_axis+y_axis position or first item
        const entryId = String(data[0]?.id);

        data.forEach((topic: any) => {
          const isEntry = String(topic.id) === entryId;
          List.push({
            data: {
              id: String(topic.id),
              label: topic.title,
              source: null,
              target: null,
              node_color: topic.node_color ?? "#ff0080",
              url: `/video/${topic.slug}`,
              isEntry: isEntry ? true : undefined,
            },
            position: { x: topic.x_axis, y: topic.y_axis },
          });

          newStyle.push({
            selector: `#${topic.id}`,
            style: {
              "background-color": `${topic.node_color ?? "#ff0080"}`,
              "border-color": `${topic.node_color ?? "#ff0080"}`,
              "border-opacity": isEntry ? 1 : 0.5,
              "border-width": isEntry ? 6 : 18,
              "shadow-color": isEntry ? "#00ff99" : `${topic.node_color ?? "#ff0080"}`,
              "shadow-blur": isEntry ? 60 : 80,
              "shadow-opacity": isEntry ? 1 : 0.7,
            },
          });
        });

        connect.forEach((element: any) => {
          List.push({
            data: {
              url: null,
              label: null,
              node_color: null,
              source: String(element.topic_id),
              target: String(element.connected_topic_id),
              lineStyle: element.line_style,
            },
          });
          newStyle.push({
            selector: `edge[source = "${element.topic_id}"][target = "${element.connected_topic_id}"]`,
            style: {
              width: 2,
              "line-color": element.line_style === "solid" ? "#7DF9FF" : "#F72585",
              "curve-style": "straight",
              "target-arrow-shape": "none",
              "line-style": `${element.line_style}`,
              "line-opacity": 0.5,
            },
          });
        });

        setTopics(List);
        setStyles(newStyle);
      } finally {
        setLoading(false);
      }
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
    <div className="relative w-full h-screen bg-black overflow-hidden">

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black gap-3">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-pink-400 text-sm tracking-widest uppercase">
            Loading graph...
          </span>
        </div>
      )}

      {/* Top bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-start pointer-events-none">
        {/* Legend */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 pointer-events-auto">
          <p className="text-slate-400 uppercase tracking-wider text-[10px] mb-2 font-bold">Legend</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 border-t-2 border-[#7DF9FF]" />
              <span>Prerequisite</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 border-t-2 border-dashed border-[#F72585]" />
              <span>Related</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400 shadow shadow-green-400" />
              <span>Start here</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-500 opacity-50" />
              <span>Optional</span>
            </div>
          </div>
        </div>

        {/* Tracking toggle */}
        <div className="flex gap-3 items-center bg-slate-800/80 backdrop-blur border border-slate-700 rounded-lg px-3 py-2 pointer-events-auto">
          <span className="text-xs text-slate-300 uppercase tracking-wider">Track progress</span>
          <input type="checkbox" className="accent-pink-500 w-4 h-4 cursor-pointer" />
        </div>
      </div>

      {/* Zoom + fit controls */}
      <div className="absolute bottom-6 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-9 h-9 flex items-center justify-center bg-slate-800/90 border border-slate-600 rounded-lg text-white hover:bg-slate-700 hover:border-pink-500 transition-all"
          title="Zoom in"
        >
          <FontAwesomeIcon icon={faMagnifyingGlassPlus} size="sm" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-9 h-9 flex items-center justify-center bg-slate-800/90 border border-slate-600 rounded-lg text-white hover:bg-slate-700 hover:border-pink-500 transition-all"
          title="Zoom out"
        >
          <FontAwesomeIcon icon={faMagnifyingGlassMinus} size="sm" />
        </button>
        <button
          onClick={handleFitAll}
          className="w-9 h-9 flex items-center justify-center bg-slate-800/90 border border-slate-600 rounded-lg text-white hover:bg-slate-700 hover:border-pink-500 transition-all text-xs font-bold"
          title="Fit all"
        >
          ⊡
        </button>
      </div>

      {/* Graph */}
      <CytoscapeComponent
        elements={topics}
        autoungrabify={true}
        stylesheet={styles}
        layout={{
          name: "preset", // use preset so your x_axis/y_axis positions are respected
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
            const pos = e.renderedPosition;
            const label = e.target.data("label");
            const url = e.target.data("url");
            setTooltip({ visible: true, x: pos.x, y: pos.y, label, url });
          });

          cy.on("mouseout", "node", () => {
            setTooltip({ visible: false, x: 0, y: 0, label: "", url: "" });
          });
        }}
      />

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute z-30 pointer-events-none"
          style={{ left: tooltip.x + 16, top: tooltip.y - 60 }}
        >
          <div className="bg-slate-900 border border-pink-500/40 rounded-xl px-4 py-3 shadow-xl shadow-pink-900/20 min-w-[180px]">
            <p className="text-white font-bold text-sm uppercase tracking-wide mb-1">
              {tooltip.label}
            </p>
            <div className="flex items-center gap-1.5 text-pink-400 text-xs mt-2">
              <FontAwesomeIcon icon={faPlayCircle} size="sm" />
              <span>Click to watch</span>
            </div>
          </div>
          {/* Arrow */}
          <div className="w-2 h-2 bg-slate-900 border-b border-r border-pink-500/40 rotate-45 ml-4 -mt-1" />
        </div>
      )}
    </div>
  );
}