'use client';

import { useState, useRef, MouseEvent, TouchEvent } from 'react';

export default function DiffSlider() {
    const [sliderPosition, setSliderPosition] = useState<number>(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches[0]) handleMove(e.touches[0].clientX);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full h-64 border border-slate-800 rounded-xl overflow-hidden select-none cursor-ew-resize bg-slate-950"
        >
            {/* Optimized Layout Layer (Background) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-emerald-950/20 text-center">
                <span className="absolute top-3 right-3 px-2 py-1 text-xs bg-emerald-500/20 text-emerald-300 font-mono rounded">HCI Optimized View</span>
                <div className="w-48 p-4 bg-slate-800 border border-emerald-500 rounded-xl shadow-lg transition-transform scale-105">
                    <div className="h-4 w-12 bg-emerald-500 rounded mb-3"></div>
                    <button className="w-full py-3 bg-emerald-500 text-slate-950 font-bold text-sm rounded-lg shadow-md tracking-wide">
                        Complete Action (Fitts's Law Target)
                    </button>
                </div>
            </div>

            {/* Violated Layout Layer (Foreground - Clipped) */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-rose-950/20 text-center border-r border-cyan-400"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
                <span className="absolute top-3 left-3 px-2 py-1 text-xs bg-rose-500/20 text-rose-300 font-mono rounded">Violated Baseline</span>
                <div className="w-48 p-4 bg-slate-800 border border-rose-500/40 rounded-xl opacity-80">
                    <div className="h-4 w-12 bg-slate-600 rounded mb-8"></div>
                    <button className="w-12 py-1 bg-slate-700 text-[8px] text-slate-400 rounded">
                        Click
                    </button>
                </div>
            </div>

            {/* Physical Control Line Indicator Handle */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-slate-900 border-2 border-cyan-400 rounded-full flex items-center justify-center text-[10px] text-cyan-400 font-bold shadow-xl">
                    ↔
                </div>
            </div>
        </div>
    );
}