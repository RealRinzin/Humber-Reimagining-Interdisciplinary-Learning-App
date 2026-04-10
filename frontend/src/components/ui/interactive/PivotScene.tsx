'use client';
import { useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useControls, folder, button, Leva } from 'leva';

// ── Types ──────────────────────────────────────────────────────────────────
interface OrbitProps {
    pivotPos: THREE.Vector3;
    orbitAxis: string;
    axisCustom: THREE.Vector3;
    orbitSpeed: number;
    enableOrbit: boolean;
    rotateWithOrbit: boolean;
    spinX: number;
    spinY: number;
    spinZ: number;
}

// ── Axis Labels ────────────────────────────────────────────────────────────
function AxisLabels({ visible }: { visible: boolean }) {
    if (!visible) return null;
    const AXIS_LEN = 3;
    return (
        <>
            <Text position={[AXIS_LEN + 0.3, 0, 0]} fontSize={0.35} color="#ff6666" anchorX="center" anchorY="middle">X</Text>
            <Text position={[0, AXIS_LEN + 0.3, 0]} fontSize={0.35} color="#66ff66" anchorX="center" anchorY="middle">Y</Text>
            <Text position={[0, 0, AXIS_LEN + 0.3]} fontSize={0.35} color="#66a3ff" anchorX="center" anchorY="middle">Z</Text>
        </>
    );
}

// ── Axes Helper Lines ──────────────────────────────────────────────────────
function AxesLines({ visible }: { visible: boolean }) {
    if (!visible) return null;
    const AXIS_LEN = 3;
    return (
        <>
            <Line points={[[0, 0, 0], [AXIS_LEN, 0, 0]]} color="#ff6666" lineWidth={2} />
            <Line points={[[0, 0, 0], [0, AXIS_LEN, 0]]} color="#66ff66" lineWidth={2} />
            <Line points={[[0, 0, 0], [0, 0, AXIS_LEN]]} color="#66a3ff" lineWidth={2} />
        </>
    );
}

// ── Pivot Marker ───────────────────────────────────────────────────────────
function PivotMarker({ position }: { position: [number, number, number] }) {
    return (
        <Sphere args={[0.1, 16, 16]} position={position}>
            <meshBasicMaterial color="#ff3333" />
        </Sphere>
    );
}

// ── Orbiting Cube ──────────────────────────────────────────────────────────
function OrbitingCube({
    pivotPos,
    orbitAxis,
    axisCustom,
    orbitSpeed,
    enableOrbit,
    rotateWithOrbit,
    spinX,
    spinY,
    spinZ,
    wireframe,
    initialPos,
}: OrbitProps & { wireframe: boolean; initialPos: THREE.Vector3 }) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const posRef = useRef<THREE.Vector3>(initialPos.clone());
    const quatRef = useRef<THREE.Quaternion>(new THREE.Quaternion());

    const axisVec = useRef(new THREE.Vector3());
    const qStep = useRef(new THREE.Quaternion());
    const tmp = useRef(new THREE.Vector3());

    const getOrbitAxis = useCallback((): THREE.Vector3 => {
        switch (orbitAxis) {
            case 'X': axisVec.current.set(1, 0, 0); break;
            case 'Y': axisVec.current.set(0, 1, 0); break;
            case 'Z': axisVec.current.set(0, 0, 1); break;
            default:
                axisVec.current.copy(axisCustom);
                if (axisVec.current.lengthSq() < 1e-6) axisVec.current.set(0, 1, 0);
        }
        return axisVec.current.normalize();
    }, [orbitAxis, axisCustom]);

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        // Orbit around pivot
        if (enableOrbit && Math.abs(orbitSpeed) > 1e-6) {
            const ax = getOrbitAxis();
            tmp.current.copy(posRef.current).sub(pivotPos);
            qStep.current.setFromAxisAngle(ax, orbitSpeed * delta);
            tmp.current.applyQuaternion(qStep.current);
            posRef.current.copy(pivotPos).add(tmp.current);
            if (rotateWithOrbit) quatRef.current.premultiply(qStep.current);
        }

        // Local spin
        if (spinX || spinY || spinZ) {
            const spinQ = new THREE.Quaternion();
            if (spinX) { const q = new THREE.Quaternion(); q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), spinX * delta); spinQ.multiply(q); }
            if (spinY) { const q = new THREE.Quaternion(); q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), spinY * delta); spinQ.multiply(q); }
            if (spinZ) { const q = new THREE.Quaternion(); q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), spinZ * delta); spinQ.multiply(q); }
            quatRef.current.multiply(spinQ);
        }

        meshRef.current.position.copy(posRef.current);
        meshRef.current.quaternion.copy(quatRef.current);
    });

    return (
        <group>
            <Box ref={meshRef} args={[1, 1, 1]}>
                <meshBasicMaterial color="#00ff88" wireframe={wireframe} />
            </Box>
            {/* Cube center marker */}
            <Sphere args={[0.07, 16, 16]} position={posRef.current.toArray()}>
                <meshBasicMaterial color="#3399ff" />
            </Sphere>
        </group>
    );
}

// ── Main Scene (inner) ─────────────────────────────────────────────────────
function Scene() {
    const {
        pivotX, pivotY, pivotZ,
        cubeX, cubeY, cubeZ,
        enableOrbit, orbitAxis,
        axisX, axisY, axisZ,
        orbitSpeed,
        rotateOrientationWithOrbit,
        spinX, spinY, spinZ,
        wireframe, showAxes,
    } = useControls({
        'Pivot (center)': folder({
            pivotX: { value: 0, min: -5, max: 5, step: 0.01, label: 'X' },
            pivotY: { value: 0, min: -5, max: 5, step: 0.01, label: 'Y' },
            pivotZ: { value: 0, min: -5, max: 5, step: 0.01, label: 'Z' },
        }),
        'Cube Position': folder({
            cubeX: { value: 2, min: -5, max: 5, step: 0.01, label: 'X' },
            cubeY: { value: 0, min: -5, max: 5, step: 0.01, label: 'Y' },
            cubeZ: { value: 0, min: -5, max: 5, step: 0.01, label: 'Z' },
        }),
        'Orbit': folder({
            enableOrbit: { value: true, label: 'Enable Orbit' },
            orbitAxis: { value: 'Y', options: ['X', 'Y', 'Z', 'Custom'], label: 'Axis' },
            axisX: { value: 0, min: -1, max: 1, step: 0.01, label: 'Custom X' },
            axisY: { value: 1, min: -1, max: 1, step: 0.01, label: 'Custom Y' },
            axisZ: { value: 0, min: -1, max: 1, step: 0.01, label: 'Custom Z' },
            orbitSpeed: { value: 0.6, min: -5, max: 5, step: 0.01, label: 'Speed (rad/s)' },
        }),
        'Orientation': folder({
            rotateOrientationWithOrbit: { value: true, label: 'Rotate with Orbit' },
            spinX: { value: 0, min: -5, max: 5, step: 0.01, label: 'Local Spin X' },
            spinY: { value: 0, min: -5, max: 5, step: 0.01, label: 'Local Spin Y' },
            spinZ: { value: 0, min: -5, max: 5, step: 0.01, label: 'Local Spin Z' },
        }),
        wireframe: { value: true, label: 'Wireframe' },
        showAxes: { value: true, label: 'Show Axes / Labels' },
    });

    const pivotPos = new THREE.Vector3(pivotX, pivotY, pivotZ);
    const axisCustom = new THREE.Vector3(axisX, axisY, axisZ);
    const initialCubePos = new THREE.Vector3(cubeX, cubeY, cubeZ);

    return (
        <>
            <OrbitControls enableDamping makeDefault />
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 6, 4]} intensity={0.8} />

            <AxesLines visible={showAxes} />
            <AxisLabels visible={showAxes} />
            <PivotMarker position={[pivotX, pivotY, pivotZ]} />

            <OrbitingCube
                key={`${cubeX}-${cubeY}-${cubeZ}`}
                pivotPos={pivotPos}
                orbitAxis={orbitAxis}
                axisCustom={axisCustom}
                orbitSpeed={orbitSpeed}
                enableOrbit={enableOrbit}
                rotateWithOrbit={rotateOrientationWithOrbit}
                spinX={spinX}
                spinY={spinY}
                spinZ={spinZ}
                wireframe={wireframe}
                initialPos={initialCubePos}
            />
        </>
    );
}

// ── Root Export ────────────────────────────────────────────────────────────
export default function PivotScene() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#0b0e12', position: 'relative' }}>
            {/* Leva GUI panel */}
            <Leva
                theme={{
                    colors: {
                        elevation1: '#111318',
                        elevation2: '#1a1d26',
                        elevation3: '#22263a',
                        accent1: '#3b5bdb',
                        accent2: '#4c6ef5',
                        accent3: '#748ffc',
                        highlight1: '#ced4da',
                        highlight2: '#e9ecef',
                        highlight3: '#f8f9fa',
                    },
                    fontSizes: { root: '11px' },
                    sizes: { rootWidth: '280px' },
                }}
            />

            <Canvas
                camera={{ position: [6, 4, 9], fov: 60, near: 0.1, far: 200 }}
                gl={{ antialias: true }}
                dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
            >
                <Scene />
            </Canvas>

            {/* Hint */}
            <div style={{
                position: 'fixed', left: 12, bottom: 12,
                fontSize: 12, color: '#9ca3af',
                background: 'rgba(0,0,0,0.45)',
                padding: '7px 10px', borderRadius: 8,
                fontFamily: 'system-ui, sans-serif',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.06)',
                pointerEvents: 'none',
            }}>
                Drag to orbit · Scroll to zoom · <span style={{ color: '#ff5555' }}>●</span> Red = pivot center
            </div>
        </div>
    );
}
