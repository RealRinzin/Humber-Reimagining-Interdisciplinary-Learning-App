'use client'
import { useState, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

// ── same function, zero changes ──────────────────────────────────────────────
function makeRing(progress:any, color:any, innerColor:any) {
  const r = 36, cx = 50, cy = 50, sw = 10;
  const circ = 2 * Math.PI * r;
  const dash = (progress / 100) * circ;
  const gap  = circ - dash;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#d0d0d8" stroke-width="${sw}"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}"
      stroke-dasharray="${dash.toFixed(1)} ${gap.toFixed(1)}"
      stroke-linecap="round"
      transform="rotate(-90 ${cx} ${cy})"/>
    <circle cx="${cx}" cy="${cy}" r="24" fill="${innerColor}"/>
  </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

const INITIAL_NODES = [
  { id: 'a', label: '65%', x: 180, y: 150, p: 65, color: '#FF2D8A', inner: '#FF2D8A' },
  { id: 'b', label: '30%', x: 380, y: 80,  p: 30, color: '#5B7CF7', inner: '#5B7CF7' },
//   { id: 'c', label: '90%', x: 500, y: 220, p: 90, color: '#1DC97A', inner: '#1DC97A' },
//   { id: 'd', label: '50%', x: 280, y: 270, p: 50, color: '#F5A623', inner: '#F5A623' },
];

const EDGES = [
  { source: 'a', target: 'b' },
//   { source: 'a', target: 'd' },
//   { source: 'b', target: 'c' },
//   { source: 'd', target: 'c' },
];

function buildStyle(nodes:any) {
  return [
    {
      selector: 'node',
      style: {
        width: 80, height: 80,
        'background-color': 'transparent',
        'background-image': (ele:any) => {
          const n = nodes.find(x => x.id === ele.id());
          return makeRing(n.p, n.color, n.inner);
        },
        'background-fit': 'cover',
        'border-width': 0,
        label: 'data(label)',
        'font-size': 13,
        color: 'white',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-weight': '500',
      },
    },
    {
      selector: 'edge',
      style: {
        width: 1.5,
        'line-color': '#b0b0b8',
        'target-arrow-color': '#b0b0b8',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
      },
    },
  ];
}

export default function App() {
  const cyRef  = useRef(null);
  const cyInst = useRef(null);
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [progress, setProgress] = useState(65);

  // Init Cytoscape once on mount
  useEffect(() => {
    cyInst.current = cytoscape({
      container: cyRef.current,
      userZoomingEnabled: false,
      userPanningEnabled: false,
      elements: [
        ...INITIAL_NODES.map(n => ({
          data: { id: n.id, label: n.label },
          position: { x: n.x, y: n.y },
        })),
        ...EDGES.map(e => ({ data: e })),
      ],
      style: buildStyle(INITIAL_NODES),
    });

    return () => cyInst.current?.destroy();
  }, []);

  const handleSlider = (e:any) => {
    const v = parseInt(e.target.value);
    setProgress(v);
    setNodes(prev => {
      const updated = prev.map(n =>
        n.id === 'a' ? { ...n, p: v, label: v + '%' } : n
      );
      const node = cyInst.current.$('#a');
      const found = updated.find(x => x.id === 'a');
      node.style('background-image', makeRing(found.p, found.color, found.inner));
      node.data('label', found.label);
      return updated;
    });
  };

  return (
    <div>
      <div ref={cyRef} style={{ width: '100%', height: 360 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 12 }}>
        <label>Node progress: <strong>{progress}%</strong></label>
      </div>
    </div>
  );
}