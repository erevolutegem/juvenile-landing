'use client';
import { useRef, useEffect, useState, RefObject } from 'react';
import OrderForm from "@/components/OrderForm";
import ImageComparison from "@/components/ImageComparison";
import ProfessionalHero from "@/components/ProfessionalHero";

export default function Home() {
  const orderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideoCTA, setShowVideoCTA] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const scrollToOrder = () => {
    // Also ensuring simple ID based scroll works for other components
    const el = document.getElementById('order-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else orderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Autoplay for second video (product showcase)
    const playSecondVideo = (ref: RefObject<HTMLVideoElement | null>) => {
      if (ref.current) {
        ref.current.play().catch(e => console.log("Autoplay prevented for second video:", e));
      }
    };
    playSecondVideo(secondVideoRef);

    // Intersection Observer for the main user demo video
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              // When in view: Unmute and Play
              // Note: We attempt to play unmuted.
              const playPromise = videoRef.current.play();

              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    // Play started, now try to unmute
                    videoRef.current!.muted = false;
                    setIsMuted(false);
                    setShowVideoCTA(false);
                  })
                  .catch(() => {
                    // Auto-play unmuted failed (likely browser policy).
                    // Fallback: Play muted, let user unmute manually.
                    console.log("Auto-unmute blocked. Playing muted.");
                    videoRef.current!.muted = true;
                    videoRef.current!.play();
                    setIsMuted(true);
                  });
              }
            } else {
              // When out of view: Pause
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger slightly earlier
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 selection:bg-pink-200 selection:text-pink-900">

      {/* --- Professional Sticky Header --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500 rounded-full blur opacity-20 animate-pulse"></div>
              <img src="/juvenile.jpg" alt="Juvenile Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-md relative z-10" />
            </div>
            <div>
              <h1 className="font-black text-xl md:text-2xl text-gray-900 tracking-tight leading-none">Juvenile</h1>
              <p className="text-[10px] md:text-xs text-pink-600 font-bold tracking-widest uppercase">Premium Skincare</p>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToOrder}
              className="bg-gray-900 text-white px-5 py-2.5 rounded-full font-bold text-sm md:text-base shadow-lg hover:bg-pink-600 hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Order Now</span>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="relative">
        <ProfessionalHero />

        {/* Trust Badge */}
        <div className="absolute top-24 right-6 md:top-32 md:right-12 z-40 animate-fade-in-up delay-200 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-pink-100 flex flex-col items-center rotate-12">
            <span className="text-2xl">🇲🇾</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Original</span>
          </div>
        </div>
      </div>

      {/* --- Video Section (User Demo) --- */}
      <section id="video-section" className="py-16 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 to-black z-0"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <span className="text-pink-500 font-bold tracking-widest uppercase mb-2 block animate-pulse">Viral on Social Media</span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              দেখে নিন কিভাবে কাজ করে <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Glass Skin Magic</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl">
              ভিডিওটি দেখলেই বুঝবেন কেন এই কম্বোটি আপনার স্কিনের জন্য গেম চেঞ্জার।
              সরাসরি ডেমো দেখুন এবং সিদ্ধান্ত নিন।
            </p>
            <button
              onClick={scrollToOrder}
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-3 mx-auto md:mx-0 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              আমার জন্য অর্ডার করুন
            </button>
          </div>

          <div className="flex-1 w-full max-w-sm mx-auto md:max-w-md order-1 md:order-2">
            <div ref={videoContainerRef} className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 group">
              <video
                ref={videoRef}
                src="/model001.mp4"
                className="w-full h-full object-cover transform scale-105"
                // No autoPlay prop here, handled by observer
                muted={isMuted}
                playsInline
                onEnded={() => setShowVideoCTA(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Audio Control Button */}
              {!showVideoCTA && (
                <button
                  onClick={() => {
                    const nextMute = !isMuted;
                    setIsMuted(nextMute);
                    if (videoRef.current) videoRef.current.muted = nextMute;
                  }}
                  className="absolute bottom-4 right-4 z-20 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/40 transition-colors pointer-events-auto"
                >
                  {isMuted ? (
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                  )}
                </button>
              )}

              {/* Post-Video CTA Overlay */}
              {showVideoCTA && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up">
                  <h3 className="text-white text-2xl font-black mb-4 text-center px-4">পছন্দ হয়েছে? <br /> এখনই অর্ডার করুন</h3>
                  <button
                    onClick={scrollToOrder}
                    className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:bg-pink-100 transition-transform hover:scale-105 active:scale-95 animate-bounce-slow"
                  >
                    অর্ডার করুন
                  </button>
                  <button
                    onClick={() => {
                      setShowVideoCTA(false);
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                      }
                    }}
                    className="mt-6 text-white/70 text-sm hover:text-white border-b border-white/30"
                  >
                    ভিডিওটি আবার দেখুন
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- Problem/Solution --- */}
      <section className="py-20 px-6 bg-pink-50/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            কেন শুধু <span className="text-red-500 line-through decoration-4 decoration-red-500">ক্রিম</span> যথেষ্ট নয়?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-xl shadow-blue-500/5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-4xl mb-6">💧</div>
              <h3 className="text-2xl font-bold mb-3 text-blue-900">1. সিরাম (Serum)</h3>
              <p className="text-gray-700 leading-relaxed">
                এটি পানির মতো হালকা হওয়ায় ত্বকের <strong>৩ লেয়ার গভীরে</strong> পৌঁছে।
                ভেতর থেকে মেলানিন কমিয়ে কালো দাগ দূর করে এবং ড্যামেজ রিপেয়ার করে।
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-pink-100 shadow-xl shadow-pink-500/5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-4xl mb-6">🧴</div>
              <h3 className="text-2xl font-bold mb-3 text-pink-900">2. ক্রিম (Cream)</h3>
              <p className="text-gray-700 leading-relaxed">
                এটি সিরামের সুফল ধরে রাখে এবং স্কিনকে ময়েশ্চারাইজড করে।
                সিরামের ওপর একটি অদৃশ্য সুরক্ষা স্তর তৈরি করে তাকে <strong>"Lock"</strong> করে।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Product Showcase Video & Benefits --- */}
      <section id="benefits-section" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

          {/* Focus: Product Close-Up Video */}
          <div className="flex-1 w-full relative">
            <div className="relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
              <video
                ref={secondVideoRef}
                src="/serumandcream.MOV"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
              {/* Overlay Tag */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg border border-pink-100">
                <div className="flex items-center gap-2">
                  <img src="/juvenile.jpg" className="w-6 h-6 rounded-full" />
                  <span className="font-bold text-xs uppercase tracking-wider text-pink-600">Official Product</span>
                </div>
              </div>
            </div>

            {/* Decorative Blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10"></div>
          </div>

          {/* Benefits List */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
              Juvenile Premium <br />
              <span className="text-pink-600">Combo Pack</span>
            </h2>
            <ul className="space-y-6">
              {[
                { title: "গভীর থেকে উজ্জ্বলতা", desc: "ত্বকের ভেতর থেকে ন্যাচারাল গ্লো নিয়ে আসে।" },
                { title: "দাগ ও পিগমেন্টেশন", desc: "পুরনো ব্রণ ও মেছতার দাগ হালকা করে।" },
                { title: "এন্টি-এজিং", desc: "রিংকেলস কমিয়ে ত্বককে টানটান রাখে।" },
                { title: "রিপেয়ার ও সুরক্ষা", desc: "সূর্যের ক্ষতি থেকে বাচায় এবং হেলদি স্কিন দেয়।" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-default group">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 font-bold text-xl group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </ul>
            <div className="mt-10 md:text-left text-center">
              <button onClick={scrollToOrder} className="text-pink-600 font-bold border-b-2 border-pink-600 hover:text-pink-800 transition-colors pb-1">
                অর্ডার করতে চাই &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Before/After Slider --- */}
      {/* --- Before/After Slider (Removed) --- */}

      {/* --- Offer & Order Form --- */}
      <section id="order-section" ref={orderRef} className="py-24 px-6 bg-gradient-to-br from-white via-pink-50 to-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">

          {/* Offer Details */}
          <div className="text-center md:text-left pt-8">
            <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full font-bold text-sm mb-4 animate-pulse">
              LIMITED TIME OFFER
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              প্রিমিয়াম কম্বো <br />
              <span className="text-pink-600">স্পেশাল ডিসকাউন্ট</span>
            </h2>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 inline-block w-full mb-8 relative overflow-hidden group hover:border-pink-200 transition-colors">
              <div className="absolute top-0 right-0 bg-pink-100 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4 relative z-10">
                <span className="text-gray-500 text-lg">Regular Price</span>
                <span className="text-gray-400 line-through text-xl">4,500 ৳</span>
              </div>
              <div className="flex justify-between items-center relative z-10">
                <span className="text-gray-800 text-xl font-bold">Offer Price</span>
                <span className="text-4xl md:text-5xl font-black text-pink-600">3,000 ৳</span>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start text-gray-700 bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="p-2 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-green-800">FREE Delivery</p>
                <p className="text-sm">সারা বাংলাদেশে হোম ডেলিভারি ফ্রি</p>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-300 to-purple-300 rounded-[2rem] blur-xl opacity-30 animate-pulse-slow"></div>
            <OrderForm />
          </div>

        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-white py-12 text-center border-t border-gray-800">
        <div className="flex justify-center items-center gap-2 mb-8 opacity-80">
          <img src="/juvenile.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-gray-600" />
          <span className="font-bold text-xl">Juvenile</span>
        </div>
        <p className="opacity-60 text-sm">© 2026 Juvenile Malaysia. Authorized Distributor.</p>
      </footer>

      {/* --- Mobile Bottom Bar --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md p-3 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] md:hidden z-50 border-t border-gray-100 flex justify-between items-center gap-4">
        <div className="pl-2">
          <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Special Offer</div>
          <div className="text-lg font-black text-pink-600">3,000 ৳</div>
        </div>
        <button
          onClick={scrollToOrder}
          className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-full shadow-lg active:scale-95 transition-transform text-sm"
        >
          অর্ডার করুন
        </button>
      </div>

    </main>
  );
}
