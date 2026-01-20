import Link from 'next/link';

export default function ThankYou() {
    const products = [
        {
            id: 1,
            name: "Korean Vitamin C Serum",
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
            benefits: ["Brightens Skin", "Fades Dark Spots"],
        },
        {
            id: 2,
            name: "Hyaluronic Acid Toner",
            image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=3348&auto=format&fit=crop",
            benefits: ["Deep Hydration", "Pore Minimizing"],
        },
        {
            id: 3,
            name: "Snail Mucin Essence",
            image: "https://images.unsplash.com/photo-1556228720-1987595b8d00?q=80&w=3387&auto=format&fit=crop",
            benefits: ["Repairs Damage", "Smooths Texture"],
        },
        {
            id: 4,
            name: "Retinol Night Cream",
            image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2616&auto=format&fit=crop",
            benefits: ["Anti-aging", "Reduces Wrinkles"],
        },
        {
            id: 5,
            name: "SPF 50+ Sunscreen",
            image: "https://images.unsplash.com/photo-1556228578-8d89cb9c02e1?q=80&w=2759&auto=format&fit=crop",
            benefits: ["No White Cast", "Non-Greasy"],
        },
        {
            id: 6,
            name: "Aloe Vera Gel",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1888&auto=format&fit=crop",
            benefits: ["Soothing", "Moisturizing"],
        },
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* 1. Hero Confirmation */}
            <section className="bg-pink-50 py-20 px-6 text-center">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl animate-bounce-slow">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                    ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে ✅
                </h1>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
                    আমাদের প্রতিনিধী খুব দ্রুত আপনার সাথে যোগাযোগ করে অর্ডারটি কনফার্ম করবেন।
                    প্রোডাক্টটি যত্ন সহকারে আপনার ঠিকানায় পৌঁছে দেওয়া হবে।
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    {/* WhatsApp Button */}
                    <a
                        href="https://wa.me/8801700000000" // Replace with actual number
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors shadow-lg"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                        WhatsApp-এ যোগাযোগ করুন
                    </a>

                    {/* Social CTA */}
                    <div className="flex gap-4">
                        <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                            <span className="font-bold text-xl">f</span>
                        </button>
                        <button className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                            <span className="font-bold text-xl">O</span>
                        </button>
                    </div>
                </div>
                <p className="mt-4 text-sm text-gray-500">আমাদের পেজ লাইক দিয়ে সাথেই থাকুন পরবর্তী অফারের জন্য ❤️</p>
            </section>

            {/* 2. Cross-Sell Product Grid */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">আপনাদের পছন্দের আরো কিছু কালেকশন 🔥</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map(product => (
                        <div key={product.id} className="bg-white border hover:border-pink-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                            <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">New</div>
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold mb-2 text-gray-900">{product.name}</h3>
                                <ul className="text-sm text-gray-600 mb-6 space-y-2 flex-grow">
                                    {product.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full py-3 border-2 border-gray-900 font-bold rounded-lg hover:bg-gray-900 hover:text-white transition-colors">
                                    বিস্তারিত দেখুন
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/" className="inline-block border-b-2 border-gray-900 pb-1 font-bold hover:text-pink-600 hover:border-pink-600 transition-colors">
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </section>
        </main>
    );
}
