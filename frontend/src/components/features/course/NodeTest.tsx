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
  //   const [topics, setTopics] = useState(TopicType[]):;
  const [topics, setTopics] = useState<TopicType[]>([]);
  const cyRef = useRef<Core | null>(null);
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
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
    // function
    async function getTopics() {
      // Topcis
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topics`);
      const data = await res.json();
      // Connection
         const connection = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topic-connections`);
      const connect = await connection.json();
      console.log(connect);
      const List: TopicType[] = [];
      data.forEach((topic: any) => {
        List.push({
          data: { id: topic.id, label: topic.title, url: `video/${topic.slug}` },
          position: { x:topic.x_axis,y:topic.y_axis }
        });
      });
      connect.forEach((element:any) => {
        List.push({
          data: { source:element.topic_id, target:element.connected_topic_id },
        });
      });

      console.log(List); // ✅ has data here
      setTopics(List);
    }
    // Invoke Function
    getTopics();
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
      <div style={{ width: "100%", height: "100vh" }} className="h-full">
        <CytoscapeComponent
          elements={topics}
          stylesheet={stylesheet}
          
          layout={{
            name: "cose",
            fit: true,
            // startTemp: 1000,
            animate: true,
            // idealEdgeLength: 10,
            // nodeRepulsion: 400000,
            // gravity: 10,
            padding: 20,
          }}
          style={{ width: "100%", height: "100%" }}
          cy={(cy) => {
            cyRef.current = cy;

            cy.on("tap", "node", (event) => {
              const node = event.target;
              const url = node.data("url");

              if (url) {
                window.open(url, "_blank");
              }
            });
          }}
        />
      </div>
    </>
  );
}
