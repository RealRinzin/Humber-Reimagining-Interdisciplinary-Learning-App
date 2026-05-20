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

interface Props {
  hoveredTopicId?: string | null;
}

export default function AnimatedCourseNode({ hoveredTopicId }: Props) {
  const cyRef = useRef<Core | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [topics, setTopics] = useState<cytoscape.ElementDefinition[]>([]);
  const [styles, setStyles] = useState([]);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    label: "",
    description: "",
  });

  // ✅ Effect 1: Fetch data ONCE on mount
  useEffect(() => {
    const newStyle: any = [
      {
        selector: "node",
        style: {
          width: 80,
          height: 80,
          label: "data(label)",
          cursor: "pointer",
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
          "transition-property":
            "background-color width height opacity shadow-blur shadow-color border-color",
          "transition-duration": 250,
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
          "curve-style": "unbundled-bezier",
          "control-point-distances": "data(controlPointDistance)",
          "control-point-weights": 0.5,
          "transition-property": "line-color opacity width",
          "transition-duration": 250,
        },
      },
      {
        selector: ".hovered",
        style: {
          width: 100,
          height: 100,
          "shadow-blur": 60,
          "shadow-opacity": 1,
        } as any,
      },
      {
        selector: ".connected",
        style: {
          "shadow-blur": 30,
          "shadow-opacity": 0.9,
        },
      },
      {
        selector: ".activeEdge",
        style: {
          width: 3,
          "line-opacity": 1,
          "line-style": "dashed",
          "line-dash-pattern": [8, 4],
        },
      },
      {
        selector: ".faded",
        style: {
          opacity: 0.2,
        },
      },
    ];

    async function getTopics() {
      const res = await clientFetch(`/topics`);
      const { data: topics } = await res.json();

      const topicConnection = await clientFetch("/topic-connections");
      const connect = await topicConnection.json();

      const List: cytoscape.ElementDefinition[] = [];

      topics.forEach((topic: any, index: number) => {
        List.push({
          data: {
            id: String(topic.id),
            label: topic.title,
            source: null,
            target: null,
            node_color: null,
            url: `/video/${topic.slug}`,
            description: topic.description,
            controlPointDistance:
              (Math.floor(index / 2) + 1) * 40 * (index % 2 === 0 ? 1 : -1),
          },
          position: { x: topic.x_axis, y: topic.y_axis },
        });

        newStyle.push({
          selector: `#${topic.id}`,
          style: {
            width: 80,
            height: 80,
            label: "data(label)",
            cursor: "pointer",
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
            "background-color": `${topic.node_color}`,
            "border-width": 20,
            "border-color": `${topic.node_color}`,
            "border-opacity": 0.5,
            "shadow-blur": 80,
            "shadow-color": "#00ff88",
            "shadow-opacity": 0.7,
          },
        });
      });

      connect.forEach((element: any) => {
        List.push({
          data: {
            url: null,
            label: null,
            node_color: null,
            source: element.topic_id,
            target: element.connected_topic_id,
          },
        });

        newStyle.push({
          selector: `edge[source = "${element.topic_id}"][target = "${element.connected_topic_id}"]`,
          style: {
            width: 2,
            "line-color": `${[15, 12, 10, 2].includes(element.topic_id) ? "#F72585" : "#4CC9F0"}`,
            "curve-style": "straight",
            "target-arrow-shape": "none",
            "line-style": `${element.line_style}`,
            "line-opacity": 0.4,
          },
        });
      });

      setTopics(List);
      setStyles(newStyle);
    }

    getTopics();
  }, []); 

  //  React to hoveredTopicId changes from the sidebar
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    // Always clear first
    cy.elements().removeClass("faded hovered connected activeEdge");
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (!hoveredTopicId) return;

    const node = cy.getElementById(hoveredTopicId);
    if (!node || node.empty()) return;

    cy.elements().addClass("faded");
    node.removeClass("faded").addClass("hovered");

    const edges = node.connectedEdges();
    edges.removeClass("faded").addClass("activeEdge");
    edges.connectedNodes().removeClass("faded").addClass("connected");

    let offset = 0;
    const animate = () => {
      offset -= 1;
      cy.edges(".activeEdge").style("line-dash-offset", offset);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, [hoveredTopicId]); // 👈 only this effect watches the prop

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
          autoungrabify={true}
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

            cy.on("tap", "node", (event) => {
              const node = event.target;
              const url = node.data("url");
              if (url) window.open(url, "_blank");
            });

            cy.on("mouseover", "node", (e) => {
              const container = cy.container();
              const node = e.target;
              const pos = e.renderedPosition;
              const label = node.data("label");
              const description = node.data("description");

              if (container) container.style.cursor = "pointer";
              setTooltip({ visible: true, x: pos.x, y: pos.y, label, description });

              cy.elements().addClass("faded");
              node.removeClass("faded").addClass("hovered");

              const edges = node.connectedEdges();
              edges.removeClass("faded").addClass("activeEdge");
              edges.connectedNodes().removeClass("faded").addClass("connected");

              let offset = 0;
              const animate = () => {
                offset -= 1;
                cy.edges(".activeEdge").style("line-dash-offset", offset);
                animFrameRef.current = requestAnimationFrame(animate);
              };
              if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
              animate();
            });

            cy.on("mouseout", "node", () => {
              const container = cy.container();
              if (container) container.style.cursor = "default";
              setTooltip({ visible: false, x: 0, y: 0, label: "", description: "" });

              cy.elements().removeClass("faded hovered connected activeEdge");

              if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
                animFrameRef.current = null;
              }
            });
          }}
        />

        {tooltip.visible && (
          <div
            className="absolute z-30 pointer-events-none"
            style={{ left: tooltip.x + 16, top: tooltip.y - 60 }}
          >
            <div className="bg-white border border-pink-500/40 rounded-xl px-4 py-3 shadow-xl shadow-pink-900/20 w-3/6">
              <p className="text-black font-bold text-sm uppercase tracking-wide mb-1">
                {tooltip.label}
              </p>
              {tooltip.description && (
                <p className="text-gray-500 text-xs mb-1">
                  {tooltip.description}
                </p>
              )}
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