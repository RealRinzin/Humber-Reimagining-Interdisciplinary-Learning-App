"use client";

import { faMagnifyingGlassMinus, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CytoscapeComponent from "react-cytoscapejs";
import type { Core, StylesheetCSS } from 'cytoscape';
import { useRef } from "react";
export default function NodeOriginal() {
    const cyRef = useRef<Core | null>(null);


    const elements = [
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
        { data: { source: "2", target: "3" } },
        { data: { source: "3", target: "1" } },
        { data: { source: "4", target: "3" } },
        { data: { source: "5", target: "4" } },
        { data: { source: "6", target: "3" } },
        { data: { source: "7", target: "1" } },
        { data: { source: "8", target: "5" } },
        { data: { source: "9", target: "7" } },
        { data: { source: "1", target: "5" } },
    ];
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
            selector: "#2",
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
                "line-dash-pattern": [4, 3] // [dash length, gap length]
            },
        },

    ];


    return (
        <>
            <div className="p-2 text-white">
                <div className="flex justify-end items-center">
                    <div className="flex gap-3 items-center justify-center bg-slate-700 rounded px-3 py-1 ">
                        <span className="text-sm ">Tracking</span>
                        <span><input type="checkbox" className="" /></span>
                    </div>
                </div>
                <div className="flex flex-col justify-end items-end gap-2 my-2">
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} size="1x" className="text-white bg-slate-700 p-1 rounded hover:cursor-pointer" />
                    <FontAwesomeIcon icon={faMagnifyingGlassMinus} size="1x" className="text-white bg-slate-700 p-1 rounded hover:cursor-pointer" />
                </div>

            </div>
            <div style={{ width: "100%", height: "100vh" }} className="h-full">
                <CytoscapeComponent
                    elements={elements}
                    stylesheet={stylesheet}
                    layout={{
                        name: "random",
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

