'use client';

import { useRef, useEffect } from 'react';

export default function ProfessionalHero() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Hero video autoplay prevented:", e));
        }
    }, []);

    const scrollToOrder = () => {
        const orderSection = document.getElementById('order-section'); // I need to ensure this ID exists in page.tsx
        if (orderSection) {
            orderSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Fallback if ID not found immediately
            console.warn("Order section not found");
        }
    };

    return (
        <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-b from-white to-pink-50">
            {/* Background Texture/Blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-200/30 rounded-full blur-[80px] -z-10 -translate-x-1/4 translate-y-1/4"></div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div className="text-center lg:text-left z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-pink-100 mb-6 animate-fade-in-up">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-bold text-gray-600 tracking-wide">MALAYSIA'S NO.1 CHOICE</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
                        গ্লাস স্কিন এখন <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">আপনার আয়ত্তে</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Juvenile এর প্রিমিয়াম কম্বো প্যাক - যা আপনার ত্বককে করবে ভেতর থেকে উজ্জ্বল, দাগহীন এবং ময়েশ্চারাইজড।
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <button
                            onClick={scrollToOrder}
                            className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-pink-600 hover:scale-105 transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
                        >
                            <span>অর্ডার করুন</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </button>

                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <span className="flex -space-x-2">
                                <span className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></span>
                                <span className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></span>
                                <span className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></span>
                            </span>
                            <span>2k+ Happy Customers</span>
                        </div>
                    </div>
                </div>

                {/* Right Visual (Video) */}
                <div className="relative mx-auto w-full max-w-md lg:max-w-full">
                    <div className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-100 rotate-2 hover:rotate-0 transition-transform duration-700">
                        <video
                            ref={videoRef}
                            src="/serumandcream.MOV"
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            autoPlay
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

                        {/* Floating Product Tag */}
                        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-3">
                            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase">Premium</p>
                                <p className="font-bold text-gray-900">Combo Pack</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
