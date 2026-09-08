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
import { useFetch } from "@/hooks/client/useHTTP";

export default function ProfileSidebarNode() {
  const cyRef = useRef<Core | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const [topics, setTopics] = useState<cytoscape.ElementDefinition[]>([]);
  const [styles, setStyles] = useState<any[]>([]);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    label: "",
    tldw: "",
  });

  const { data: topicRes, loading: topicLoading } = useFetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/topics`,
    "GET",
  );
  const { data: connectRes, loading: connectLoading } = useFetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/topic_connections`,
    "GET",
  );

  useEffect(() => {
    if (topicLoading || connectLoading) return;
    if (!topicRes || !connectRes) return;

    const topicsData: any[] = (topicRes as any)?.data ?? topicRes;
    const connect: any[] = (connectRes as any)?.data ?? connectRes;

    const newStyle: any = [
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

    const List: cytoscape.ElementDefinition[] = [];
    console.log(topicsData)
    topicsData.forEach((topic: any, index: number) => {
      List.push({
        data: {
          id: String(topic.id),
          label: topic.title,
          source: null,
          target: null,
          node_color: null,
          url: `/video/${topic.videos[0]?.slug}`,
          tldw: topic.videos[0]?.tldw,
          controlPointDistance:
            (Math.floor(index / 2) + 1) * 40 * (index % 2 === 0 ? 1 : -1),
        },
        position: { x: topic.x_axis, y: topic.y_axis },
      });

      newStyle.push({
        selector: `#${topic.id}`,
        style: {
          width: 100,
          height: 100,
          "border-width": 0,
          "border-color": "transparent",
          "border-opacity": 0,
          label: "data(label)",
          cursor: "pointer",
          "text-valign": "center",
          "text-halign": "center",
          "font-size": 14,
          "font-weight": "bold",
          "text-transform": "uppercase",
          color: "#000",
          "background-color": topic.node_color || "#FF2D8A",
          "text-background-color": "#fff",
          "text-background-opacity": 0.7,
          "text-background-padding": 4,
          "text-background-shape": "roundrectangle",
          "shadow-blur": 80,
          "shadow-opacity": 0.7,
          "shadow-color": topic.node_color || "#FF2D8A",
          "shadow-offset-x": 0,
          "shadow-offset-y": 0,
        },
      });
    });

    connect.forEach((element: any) => {
      List.push({
        data: {
          url: null,
          label: null,
          node_color: element.node_color,
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
  }, [topicRes, connectRes, topicLoading, connectLoading]);

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
    <div style={{ width: "100%", height: "100vh" }} className="h-full relative">
      <div className="p-2 text-white absolute right-0 z-10 flex flex-col justify-end items-end gap-2 my-2">
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
      <CytoscapeComponent
        className="z-0"
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
        cy={(cy:any) => {
          cyRef.current = cy;

          cy.on("tap", "node", (event:any) => {
            const node = event.target;
            const url = node.data("url");
            if (url) window.open(url, "_self");
          });

          cy.on("mouseover", "node", (e:any) => {
            const container = cy.container();
            const node = e.target;
            const pos = e.renderedPosition;
            const label = node.data("label");
            const tldw = node.data("tldw");
            if (container) container.style.cursor = "pointer";
            setTooltip({ visible: true, x: pos.x, y: pos.y, label, tldw });
          });

          cy.on("mouseout", "node", () => {
            const container = cy.container();
            if (container) container.style.cursor = "default";
            setTooltip({ visible: false, x: 0, y: 0, label: "", tldw: "" });
            cy.elements().removeClass("faded hovered connected activeEdge");
            if (animFrameRef.current) {
              cancelAnimationFrame(animFrameRef.current);
              animFrameRef.current = null;
            }
          });
        }}
      />

      {tooltip.visible && (
        <div className="absolute z-30 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white border border-900-500/40 rounded-xl px-4 py-3 shadow-xl shadow-pink-900/20 w-5/6">
            <p className="text-black font-bold text-sm uppercase tracking-wide mb-1">
              <FontAwesomeIcon icon={faPlayCircle} size="sm" className="mr-2" />
              {tooltip.label}
            </p>
            {tooltip.tldw && (
              <p className="text-gray-500 text-xs mb-1">{tooltip.tldw}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}