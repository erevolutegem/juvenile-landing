'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import Link from 'next/link';

export default function AntigravityHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

    const [hasTriggered, setHasTriggered] = useState(false);

    // Configuration for the auto-trigger delay
    const TRIGGER_DELAY = 1500;

    useEffect(() => {
        // Auto-trigger effect
        const timeout = setTimeout(() => {
            if (!hasTriggered) {
                triggerGravity();
            }
        }, TRIGGER_DELAY);

        return () => clearTimeout(timeout);
    }, [hasTriggered]);

    const triggerGravity = () => {
        if (hasTriggered) return;
        setHasTriggered(true);

        const container = containerRef.current;
        const content = contentRef.current;

        if (!container || !content) return;

        // --- Matter.js Setup ---
        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Composite = Matter.Composite;
        const Runner = Matter.Runner;
        const MouseConstraint = Matter.MouseConstraint;
        const Mouse = Matter.Mouse;
        const Events = Matter.Events;

        const engine = Engine.create();
        engineRef.current = engine;

        // Create a renderer (optional, for debugging or just for the mouse interaction context)
        // We can run the engine without a visible canvas if we just want to sync DOM.
        // However, MouseConstraint needs a mouse attached to a canvas usually, or at least a target element.
        // Let's create a transparent canvas on top to handle mouse events.
        const render = Render.create({
            element: container,
            engine: engine,
            options: {
                width: container.clientWidth,
                height: container.clientHeight,
                background: 'transparent',
                wireframes: false, // Set to true to see physics wireframes for debugging
                showAngleIndicator: false
            }
        });
        renderRef.current = render;

        // --- Create Boundaries (Walls) ---
        const wallThickness = 100;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true, render: { visible: false } });
        const leftWall = Bodies.rectangle(0 - wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: { visible: false } });
        const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: { visible: false } });
        const ceiling = Bodies.rectangle(width / 2, -wallThickness * 2, width, wallThickness, { isStatic: true, render: { visible: false } }); // Place ceiling high up

        World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

        // --- Convert DOM Elements to Physics Bodies ---
        const elements = Array.from(content.children) as HTMLElement[];
        const bodies: Matter.Body[] = [];

        // Get container offset to ensure physics world 0,0 matches container 0,0
        const containerRect = container.getBoundingClientRect();

        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();

            // Calculate position relative to the container
            const relativeX = rect.left - containerRect.left;
            const relativeY = rect.top - containerRect.top;

            const x = relativeX + rect.width / 2;
            const y = relativeY + rect.height / 2;

            // Create a body that matches the element's position and size
            const body = Bodies.rectangle(x, y, rect.width, rect.height, {
                restitution: 0.6, // Bounciness
                friction: 0.1,
                frictionAir: 0.02,
                density: 0.005,
                render: { opacity: 0 } // Invisible body, we strictly use DOM
            });

            bodies.push(body);

            // IMPORTANT: Switch element to absolute positioning so it can be moved by physics
            el.style.position = 'absolute';
            // Set top/left to 0 so transform is the only source of truth for position
            el.style.top = '0px';
            el.style.left = '0px';
            el.style.width = `${rect.width}px`;
            el.style.height = `${rect.height}px`;

            // Initial transform to match visual position
            // We moved it to 0,0 relative to container, so we translate to relativeX, relativeY
            el.style.transform = `translate(${relativeX}px, ${relativeY}px)`;
        });

        World.add(engine.world, bodies);

        // --- Mouse Control ---
        // Attach mouse to the container so it catches events that bubble up
        const mouse = Mouse.create(container);
        // Fix: Matter.js Mouse might need pixel ratio adjustment if canvas is not used as reference
        // But since we aren't relying on the canvas for the mouse, we need to ensure scaling is correct.
        // Usually Mouse.create(element) works fine.

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        World.add(engine.world, mouseConstraint);

        // Keep the mouse in sync with scrolling (if any, though we are 100vh)
        render.mouse = mouse;

        // --- Run the Engine ---
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);
        Render.run(render);

        // --- Sync Loop ---
        // Update DOM elements positions on every engine update
        Events.on(engine, 'afterUpdate', () => {
            elements.forEach((el, index) => {
                const body = bodies[index];
                if (!body) return;

                // Position is center of body. DOM transform origin is usually top-left unless refined.
                // But we set width/height.
                // Simplest math: translate( (body.x - width/2)px, (body.y - height/2)px ) rotate( body.angle rad )

                const x = body.position.x - el.offsetWidth / 2;
                const y = body.position.y - el.offsetHeight / 2;
                const angle = body.angle;

                el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
            });
        });
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen bg-gray-50 overflow-hidden select-none"
            onClick={!hasTriggered ? triggerGravity : undefined}
        >
            {/* This canvas is for mouse interaction surface, generated by Matter.Render. 
          We let Matter.Render inject it, but we can style it to be absolute overlay. 
          Matter.Render appends to container. */}

            {/* Content Wrapper */}
            <div
                ref={contentRef}
                className={`w-full h-full flex flex-col items-center justify-center p-8 z-10 
          ${hasTriggered ? '' : 'transition-opacity duration-300'}`} // Keep layout normal until trigger
            >
                {/* Element 1: Headline */}
                <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 text-center leading-tight tracking-tighter bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer">
                    Gravity Defying <br />
                    <span className="text-blue-600">Skincare</span>
                </h1>

                {/* Element 2: Subtext Paragraph */}
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-center mb-10 bg-white/80 p-6 rounded-lg shadow-sm border border-gray-100 font-medium">
                    Experience the weightless formula that lifts, hydrates, and rejuvenates your skin.
                    Science meets nature in a collision of pure elegance.
                </p>

                {/* Element 3: Product Image (Placeholder) */}
                <div className="mb-10 w-64 h-64 md:w-80 md:h-80 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-300">
                    {/* Replace with actual image */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                        Product Shot
                    </div>
                </div>

                {/* Element 4: CTA Button */}
                <Link href="/thank-you" className="px-12 py-5 bg-black text-white text-xl font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl active:scale-95 transform flex items-center justify-center z-50">
                    Order Now
                </Link>

                {/* Extra Decorative Elements for more fun chaos */}
                <div className="w-16 h-16 bg-yellow-400 rounded-full absolute top-20 left-20 opacity-80 mix-blend-multiply filter blur-sm"></div>
                <div className="w-24 h-24 bg-pink-400 rounded-full absolute bottom-40 right-20 opacity-80 mix-blend-multiply filter blur-sm"></div>
                <div className="w-12 h-12 bg-blue-300 rounded-lg absolute top-1/2 left-12 opacity-80 mix-blend-multiply"></div>

            </div>

            {/* Render Canvas Overlay Correction style (in case injected canvas needs style) */}
            <style jsx global>{`
        canvas {
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none; /* Let initial clicks pass through if needed, but we used onClick on container */
          z-index: 0;
        }
        /* When triggered, canvas needs to intercept mouse for drag, 
           buuuut the elements are DOM and on top. 
           Matter.Mouse works on the canvas but coordinates match. 
           We actually need the Canvas to be ON TOP for mouse constraints to catch 'bodies' easily 
           OR we need to set pointer-events on DOM elements to work correctly. 
           Usually simplest: Canvas z-index 0, DOM z-index 1. 
           Matter.MouseConstraint works by raycasting bodies. 
           For DOM sync, we often need a transparent overlay or rely on the fact that 
           Matter.Mouse attaches event listeners to the Element you pass it. */
      `}</style>
        </section>
    );
}
