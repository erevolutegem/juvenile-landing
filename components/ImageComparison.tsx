'use client';
import { useState, useRef, useEffect } from 'react';

export default function ImageComparison() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMove = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!containerRef.current) return;

        // Only move if dragging or if it's a direct interaction (like click/touch)
        // For this simple version, we'll follow pointer on drag

        const rect = containerRef.current.getBoundingClientRect();
        let clientX;

        if ('touches' in event) {
            clientX = event.touches[0].clientX;
        } else {
            clientX = (event as any).clientX;
        }

        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;

        setSliderPosition(percentage);
    };

    const handleMouseDown = () => { isDragging.current = true; };
    const handleMouseUp = () => { isDragging.current = false; };

    // Attach global event listeners for smooth drag out of bounds
    useEffect(() => {
        const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging.current) {
                handleMove(e);
            }
        };
        const handleGlobalUp = () => {
            isDragging.current = false;
        };

        window.addEventListener('mousemove', handleGlobalMove);
        window.addEventListener('mouseup', handleGlobalUp);
        window.addEventListener('touchmove', handleGlobalMove);
        window.addEventListener('touchend', handleGlobalUp);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('mouseup', handleGlobalUp);
            window.removeEventListener('touchmove', handleGlobalMove);
            window.removeEventListener('touchend', handleGlobalUp);
        };
    }, []);


    return (
        <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8 text-black">রেজাল্ট দেখুন নিজের চোখেই</h3>

            <div
                ref={containerRef}
                className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl border-4 border-white"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                onClick={(e) => { isDragging.current = true; handleMove(e); isDragging.current = false; }} // Click support
            >
                {/* Image 2 (After) - Background Layer */}
                <div className="absolute inset-0 bg-gray-200">
                    <img
                        src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
                        alt="After"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-black z-10">After</div>
                </div>

                {/* Image 1 (Before) - Clipped Overlay Layer */}
                <div
                    className="absolute inset-0 bg-gray-300"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1549488497-6573e97063d8?q=80&w=2070&auto=format&fit=crop"
                        alt="Before"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full text-sm font-bold text-white z-10">Before</div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
                        </svg>
                    </div>
                </div>
            </div>
            <p className="text-center text-gray-500 mt-4 text-sm">↔ স্লাইডারটি টেনে পার্থক্য দেখুন</p>
        </div>
    );
}
