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
import { clientFetch, clientPost } from "@/lib/clientFetch";
import {
  exploreNodeCalculator,
  nodeProgressCalculator,
} from "@/utils/RingProgressPerCalculator";

interface Props {
  hoveredTopicId?: string | null;
  refreshKey?: number;
}
function makeRing(progress: any, color: any, innerColor: any) {
  const r = 40,
    cx = 50,
    cy = 50,
    sw = 20;
  const circ = 2 * Math.PI * r;
  const dash = (progress / 100) * circ;
  const gap = circ - dash;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <circle cx="${cx}" cy="${cy}" r="50" fill="#1a1a2e"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#d0d0d8" stroke-width="${sw}"/>
    ${progress > 0 ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${innerColor}" stroke-width="${sw}" stroke-dasharray="${dash.toFixed(1)} ${gap.toFixed(1)}" stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})"/>` : ""}
    <circle cx="${cx}" cy="${cy}" r="24" fill="${innerColor}"/>
  </svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}
function makeRingZero(progress: any, color: any, innerColor: any) {
  const cx = 50,
    cy = 50;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <circle cx="${cx}" cy="${cy}" r="50" fill="${innerColor}"/>
    <circle cx="${cx}" cy="${cy}" r="46" fill="${innerColor}" stroke="#fff" stroke-width="10" stroke-opacity="0.4"/>
  </svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}
export default function ExploreModeNode({ hoveredTopicId }: Props) {
  const cyRef = useRef<Core | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const [topics, setTopics] = useState<cytoscape.ElementDefinition[]>([]);
  const [styles, setStyles] = useState([]);
  const [userSetting, setUserSetting] = useState<any>([]);
  const [progressTracking, setProgressTracking] = useState(true);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    label: "",
    tldw: "",
    is_following: false,
  });
  async function postUserTopic(topic_id: number) {
    await clientPost("/user-topics/users/me/topics", {
      topic_id: topic_id,
      started: true,
    });
    // no router.refresh() or window.location here
  }
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
    // Function to check the started Topic ID
    const startedTopicIds = new Set(
      topics.filter((t: any) => t.is_started).map((t: any) => t.id),
    );
    async function getTopics() {
      // Fetch user settings first
      const user_content_setting = await clientFetch(
        "/user-content-settings/users/me",
      );
      const { data: user_setting } = await user_content_setting.json();
      setUserSetting(user_setting); // still set state for other uses
      // Topic

      const res = await clientFetch(`/topics`);
      const { data: topics } = await res.json();
      const topicConnection = await clientFetch("/topic-connections");
      const connect = await topicConnection.json();

      const List: cytoscape.ElementDefinition[] = [];
      // topics[0].is_following = true;
      topics.forEach((topic: any, index: number) => {
        List.push({
          data: {
            id: String(topic.id),
            label: topic.title,
            source: null,
            target: null,
            is_started: topic.is_following,
            node_color: null,
            url: `/video/${topic.slug}`,
            tldw: topic?.videos[0]?.tldw,
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
            "border-width": 0, // ← add
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
            "background-image": (ele: any) => {
              if (topic?.is_following) {
                return progressTracking
                  ? makeRing(
                      exploreNodeCalculator(
                        topic?.videos?.[0],
                        user_setting,
                        topic?.videos?.[0]?.user_video_setting,
                      ),
                      topic.node_color,
                      topic.node_color,
                    )
                  : // ? makeRing(34, topic.node_color, topic.node_color)
                    makeRingZero(0, topic.node_color, topic.node_color);
              } else {
                return progressTracking
                  ? makeRing(
                      exploreNodeCalculator(
                        topic?.videos?.[0],
                        user_setting,
                        topic?.videos?.[0]?.user_video_setting,
                      ),
                      "gray",
                      "gray",
                    )
                  : // ? makeRing(34, topic.node_color, topic.node_color)
                    makeRingZero(0, topic.node_color, topic.node_color);
              }
            },
            "text-background-color": "#fff",
            "text-background-opacity": 0.7,
            "text-background-padding": 4,
            "text-background-shape": "roundrectangle",
            "shadow-blur": 80,
            "shadow-opacity": 0.7,
            "shadow-color": topic.node_color || "#FF2D8A", // ← matches the ring color
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
  }, [progressTracking]);

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
      <div
        style={{ width: "100%", height: "100vh" }}
        className="h-full relative"
      >
        <div className="p-2 text-white absolute right-0 z-10">
          <div className="flex justify-end items-center">
            <div className="flex gap-3 items-center justify-center bg-slate-700 rounded px-3 py-1">
              <span className="text-sm">Show Progress</span>
              <input
                type="checkbox"
                className=""
                checked={progressTracking}
                onChange={() => setProgressTracking((prev) => !prev)}
              />
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
          cy={(cy) => {
            cyRef.current = cy;
            cy.on("tap", "node", (event) => {
              const node = event.target;
              const url = node.data("url"); // get the slug of the video
              // If the topic is not started yet, the register one otherwise skip it
              postUserTopic(Number(node.data("id")));
              window.open(url, "_self");
            });

            cy.on("mouseover", "node", (e) => {
              const container = cy.container();
              const node = e.target;
              const pos = e.renderedPosition;
              const label = node.data("label");
              const tldw = node.data("tldw");
              const is_following = node.data("is_following");
              if (container) container.style.cursor = "pointer";
              setTooltip({
                visible: true,
                x: pos.x,
                y: pos.y,
                label,
                tldw,
                is_following,
              });

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
              if (animFrameRef.current)
                cancelAnimationFrame(animFrameRef.current);
              animate();
            });
            // improving the mouse out fade effect of the nodes
            cy.on("mouseout", "node", () => {
              const container = cy.container();
              if (container) container.style.cursor = "default";
              setTooltip({
                visible: false,
                x: 0,
                y: 0,
                label: "",
                tldw: "",
                is_following: false,
              });

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
            className="absolute z-30 pointer-events-none w-auto transition-all duration-300 ease-in-out "
            // style={{ left: tooltip.x + 16, top: tooltip.y - 60 }}
            style={{
              left:
                tooltip.x >= 500
                  ? tooltip.x - (tooltip.x * 20) / 100
                  : tooltip.x + 16,
              top: tooltip.y - 60,
            }}
          >
            <div className="bg-white border border-900-500/40 rounded-xl px-4 py-3 shadow-xl shadow-pink-900/20 w-3/6">
              <p className="text-black font-bold text-sm uppercase tracking-wide mb-1">
                {tooltip.label}
              </p>
              {tooltip.tldw && (
                <p className="text-gray-500 text-xs mb-1">{tooltip.tldw}</p>
              )}
              <div className="flex items-center gap-1.5 text-900-400 text-xs mt-2 font-medium">
                <FontAwesomeIcon icon={faPlayCircle} size="sm" />
                <span>Click to watch</span>
              </div>
            </div>
            <div className="w-2 h-2 bg-white border-b border-r border-900-500/40 rotate-45 ml-4 -mt-1" />
          </div>
        )}
      </div>
    </>
  );
}
