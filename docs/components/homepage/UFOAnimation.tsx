import React, { useMemo, useState } from "react";
import Image from "next/image";

interface GroundObject {
    id: number;
    x: number;
    y: number;
    text: string;
    opacity: number;
    isBeingZapped: boolean;
}

interface Beam {
    id: number;
    targetObjectId: number;
    opacity: number;
    color: string;
}

export function UFOAnimation() {
    const canvasRef = React.useRef<HTMLDivElement>(null);
    const [objects, setObjects] = React.useState<GroundObject[]>([]);
    const [beams, setBeams] = React.useState<Beam[]>([]);
    const [ufoX, setUfoX] = React.useState(0);
    const [landscapeOffset, setLandscapeOffset] = React.useState(0);
    const animationFrameRef = React.useRef<number>(0);
    const lastZapTimeRef = React.useRef(0);

    React.useEffect(() => {
        // Customer problems that get zapped away
        const customerProblems = [
            "Shadow AI",
            "Unknown LLM Usage",
            "Untracked AI Agents",
            "No Ownership Tags",
            "Unauthorized API Calls",
            "Hidden AI Services",
            "Compliance Gaps",
            "Unmonitored Egress",
            "Mystery AI Costs",
            "Rogue AI Features",
            "PII Leaks to LLMs",
            "Zero Visibility",
        ];

        const getRandomProblem = () => customerProblems[Math.floor(Math.random() * customerProblems.length)];

        // Initialize ground objects with problem text in a single line
        const initialObjects: GroundObject[] = [];
        const yPosition = 78; // Fixed Y position for single file
        const spacing = 35; // Space between objects (increased for mobile)

        for (let i = 0; i < 8; i++) {
            initialObjects.push({
                id: i,
                x: 110 + (i * spacing), // Start off-screen right, evenly spaced
                y: yPosition,
                text: getRandomProblem(),
                opacity: 1,
                isBeingZapped: false,
            });
        }
        setObjects(initialObjects);

        let lastBeamId = 0;

        const animate = () => {


            // UFO stays stationary in center
            setUfoX(0);

            // Landscape scrolling (reset at 50% since SVG is 200% wide)
            setLandscapeOffset((prev) => (prev + 0.25) % 50);

            // Move objects with landscape - single file at constant spacing
            setObjects((prevObjects) => {
                const yPosition = 78; // Fixed Y position for single file

                return prevObjects.map((obj) => {
                    const newX = obj.x - 0.375; // Match foreground landscape speed (0.25 * 1.5)

                    // Wrap around when object goes off screen - respawn at constant distance
                    if (newX < -10) {
                        // Find the rightmost object's X position
                        const maxX = Math.max(...prevObjects.map(o => o.x));
                        return {
                            ...obj,
                            x: Math.max(110, maxX + 35), // Spawn 35% after the rightmost object
                            y: yPosition,
                            text: getRandomProblem(),
                            opacity: 1,
                            isBeingZapped: false,
                        };
                    }

                    // Fade out if being zapped
                    if (obj.isBeingZapped) {
                        const newOpacity = obj.opacity - 0.08;
                        if (newOpacity <= 0) {
                            // Respawn at the end of the line
                            const maxX = Math.max(...prevObjects.map(o => o.x));
                            return {
                                ...obj,
                                x: Math.max(110, maxX + 35),
                                y: yPosition,
                                text: getRandomProblem(),
                                opacity: 1,
                                isBeingZapped: false,
                            };
                        }
                        // Stop moving when being zapped
                        return { ...obj, x: obj.x, opacity: newOpacity };
                    }

                    return { ...obj, x: newX };
                });
            });

            // Zap objects when they cross the center (where UFO is positioned)
            setObjects((prevObjects) => {
                const ufoXPosition = 50; // UFO is at center
                const zapRange = 5; // Range for center detection

                // Find object that is crossing through the center
                const targetAtCenter = prevObjects.find(
                    (obj) =>
                        Math.abs(obj.x - ufoXPosition) < zapRange &&
                        !obj.isBeingZapped &&
                        obj.opacity > 0.5
                );

                if (targetAtCenter) {
                    // Create beam that tracks the target object
                    const beamColor = Math.random() > 0.5 ? '#10b981' : '#a855f7'; // green or purple
                    setBeams((prev) => [
                        ...prev,
                        {
                            id: ++lastBeamId,
                            targetObjectId: targetAtCenter.id,
                            opacity: 1,
                            color: beamColor,
                        },
                    ]);

                    // Mark object as being zapped
                    return prevObjects.map((obj) =>
                        obj.id === targetAtCenter.id ? { ...obj, isBeingZapped: true } : obj
                    );
                }

                return prevObjects;
            });

            // Fade out beams
            setBeams((prevBeams) =>
                prevBeams
                    .map((beam) => ({ ...beam, opacity: beam.opacity - 0.05 }))
                    .filter((beam) => beam.opacity > 0)
            );

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <div className="relative py-4 w-full border-none">
            <div
                ref={canvasRef}
                className="relative h-[500px] w-full overflow-hidden"
            >
                {/* Stars background */}
                <div className="absolute inset-0">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                                width: `${1 + Math.random() * 2}px`,
                                height: `${1 + Math.random() * 2}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 60}%`,
                                opacity: 0.2 + Math.random() * 0.3,
                                animation: `twinkle ${20 + Math.random() * 30}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 10}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Beams - Triangular/Cone shaped (behind UFO) */}
                {beams.map((beam) => {
                    // Find the target object to get its current position
                    const targetObject = objects.find(obj => obj.id === beam.targetObjectId);
                    if (!targetObject) return null;

                    return (
                        <div
                            key={beam.id}
                            className="absolute"
                            style={{
                                left: '50%',
                                top: '30%',
                                width: '100px',
                                height: `${(targetObject.y - 30)}%`,
                                background: `linear-gradient(to bottom, ${beam.color}dd, ${beam.color}88, ${beam.color}44, transparent)`,
                                opacity: beam.opacity,
                                transform: 'translate(-50%, 0)',
                                clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)',
                                boxShadow: `0 0 40px ${beam.color}, 0 0 80px ${beam.color}`,
                                filter: 'blur(4px)',
                                zIndex: 0,
                            }}
                        />
                    );
                })}

                {/* UFO (Logo) */}
                <div
                    className="absolute transition-transform duration-100"
                    style={{
                        left: `calc(50% + ${ufoX}%)`,
                        top: '30%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                    }}
                >
                    {/* UFO glow */}
                    <div
                        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/30 blur-2xl"
                        style={{ animation: 'pulse 2s ease-in-out infinite' }}
                    />

                    {/* UFO body (Logo) */}
                    <div
                        className="relative"
                        style={{
                            animation: 'float 3s ease-in-out infinite',
                        }}
                    >
                        <Image
                            src="/ufo.svg"
                            alt="UFO"
                            width={64}
                            height={64}
                            className="h-40 w-40 drop-shadow-2xl"
                            style={{
                                filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.8)) drop-shadow(0 0 40px rgba(16, 185, 129, 0.4))',
                            }}
                        />
                    </div>
                </div>

                {/* Scrolling landscape */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 overflow-hidden">
                    {/* Hills layer 1 (back) - Repeating pattern */}
                    <div className="absolute bottom-0 left-0 right-0 h-full flex">
                        <svg
                            className="absolute bottom-0 h-full flex-shrink-0"
                            style={{
                                width: '200%',
                                transform: `translateX(-${landscapeOffset}%)`,
                            }}
                            viewBox="0 0 2400 200"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="hillGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#1e3a2f" />
                                    <stop offset="100%" stopColor="#0f1f1a" />
                                </linearGradient>
                            </defs>
                            {/* Repeating pattern for seamless loop */}
                            <path
                                d="M0,100 Q150,50 300,100 T600,100 T900,100 T1200,100 L1200,200 L0,200 Z"
                                fill="url(#hillGradient1)"
                                opacity="0.7"
                            />
                            <path
                                d="M1200,100 Q1350,50 1500,100 T1800,100 T2100,100 T2400,100 L2400,200 L1200,200 Z"
                                fill="url(#hillGradient1)"
                                opacity="0.7"
                            />
                        </svg>
                    </div>

                    {/* Hills layer 2 (front, darker) - Repeating pattern */}
                    <div className="absolute bottom-0 left-0 right-0 h-full flex">
                        <svg
                            className="absolute bottom-0 h-full flex-shrink-0"
                            style={{
                                width: '200%',
                                transform: `translateX(-${(landscapeOffset * 1.5) % 50}%)`,
                            }}
                            viewBox="0 0 2400 200"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="hillGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#0f2419" />
                                    <stop offset="100%" stopColor="#0a1510" />
                                </linearGradient>
                            </defs>
                            {/* Repeating pattern for seamless loop */}
                            <path
                                d="M0,130 Q100,90 200,130 T400,130 T600,130 T800,130 T1000,130 T1200,130 L1200,200 L0,200 Z"
                                fill="url(#hillGradient2)"
                            />
                            <path
                                d="M1200,130 Q1300,90 1400,130 T1600,130 T1800,130 T2000,130 T2200,130 T2400,130 L2400,200 L1200,200 Z"
                                fill="url(#hillGradient2)"
                            />
                        </svg>
                    </div>
                </div>

                {/* Ground objects - Customer Problems */}
                {objects.map((obj) => (
                    <div
                        key={obj.id}
                        className="absolute"
                        style={{
                            left: `${obj.x}%`,
                            top: `${obj.y}%`,
                            opacity: obj.opacity,
                            transform: 'translateX(-50%)',
                            zIndex: obj.isBeingZapped ? 100 : Math.floor(100 - obj.x),
                        }}
                    >
                        <div
                            className="relative whitespace-nowrap rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-white ring-1 ring-slate-700"
                            style={{
                                background: obj.isBeingZapped
                                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(6, 78, 59, 0.5))'
                                    : 'rgba(15, 23, 42, 0.98)',
                                boxShadow: obj.isBeingZapped
                                    ? '0 0 30px rgba(16, 185, 129, 0.8), 0 0 60px rgba(16, 185, 129, 0.4), 0 4px 6px rgba(0, 0, 0, 0.3)'
                                    : '0 4px 6px rgba(0, 0, 0, 0.3)',
                                transform: obj.isBeingZapped ? 'scale(1.15)' : 'scale(1)',
                                transition: 'all 0.2s ease-out',
                                borderColor: obj.isBeingZapped ? 'rgba(16, 185, 129, 0.6)' : 'rgba(71, 85, 105, 0.7)',
                            }}
                        >
                            {obj.isBeingZapped && (
                                <div
                                    className="absolute inset-0 rounded-xl bg-emerald-500/20 animate-pulse"
                                    style={{ animation: 'pulse 0.5s ease-in-out infinite' }}
                                />
                            )}
                            <span className="relative z-10">{obj.text}</span>
                        </div>
                    </div>
                ))}

                {/* Info overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-emerald-300/90">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                        <span>eBPF Sensors Active</span>
                    </div>

                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}</style>
        </div>
    );
}
