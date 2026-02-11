'use client';
import { useRef, useState } from 'react';

export function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="flex justify-center py-16 items-center w-full">
            <div
                className="w-full max-w-4xl aspect-video relative group"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(isPlaying ? false : true)}
            >
                <video
                    ref={videoRef}
                    className="w-full h-full rounded-lg bg-black"
                    loop
                    playsInline
                    preload="metadata"
                    onClick={togglePlay}
                >
                    <source
                        src="https://aiostack-public.s3.ap-south-1.amazonaws.com/AIOStack-vid-4k.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Play button overlay (when paused) */}
                {!isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/95 hover:bg-white flex items-center justify-center transition-all hover:scale-110">
                            <div className="w-0 h-0 border-l-[16px] border-l-black border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1.5" />
                        </div>
                    </button>
                )}

                {/* Control bar at bottom */}
                <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <button
                            onClick={togglePlay}
                            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors backdrop-blur-sm"
                        >
                            {isPlaying ? (
                                <div className="w-5 h-5 flex gap-1">
                                    <div className="w-1.5 h-5 bg-white rounded-sm" />
                                    <div className="w-1.5 h-5 bg-white rounded-sm" />
                                </div>
                            ) : (
                                <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent ml-1" />
                            )}
                        </button>

                        <div className="flex-1 flex items-center gap-2 text-white/90 text-sm">
                            <span className="font-medium">AIOStack Demo</span>
                            <span className="text-white/60">• Looping</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}