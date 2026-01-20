'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OrderForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
        quantity: 1
    });

    const UNIT_PRICE = 3000;
    const deliveryCharge = 0; // "Free Delivery"

    const updateQuantity = (change: number) => {
        setFormData(prev => ({
            ...prev,
            quantity: Math.max(1, prev.quantity + change)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const totalPrice = formData.quantity * UNIT_PRICE;

            // Send data to API
            const response = await fetch('/api/submit-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, totalPrice })
            });

            if (response.ok) {
                router.push('/thank-you');
            } else {
                alert('অর্ডার করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন অথবা আমাদের কল করুন।');
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Order Error:', error);
            alert('নেটওয়ার্ক এরর। দয়া করে আবার চেষ্টা করুন।');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-pink-100 w-full max-w-md mx-auto relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>

            <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 border-b-2 border-pink-500 inline-block mx-auto pb-2">
                অর্ডার করতে ফর্মটি পূরণ করুন
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">আপনার নাম (Name)</label>
                    <input
                        type="text"
                        required
                        placeholder="সম্পূর্ণ নাম লিখুন"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">মোবাইল নাম্বার (Mobile No)</label>
                    <input
                        type="tel"
                        required
                        placeholder="017xxxxxxxx"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        value={formData.mobile}
                        onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">ঠিকানা (Delivery Address)</label>
                    <textarea
                        required
                        placeholder="বাসা নং, রোড নং, এলাকা / থানা, জেলা"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all h-24 resize-none"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">পরিমাণ (Quantity)</label>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => updateQuantity(-1)}
                            className="w-10 h-10 rounded-lg bg-gray-100 text-xl font-bold hover:bg-gray-200 active:scale-95 transition-transform"
                        >
                            -
                        </button>
                        <div className="flex-1 text-center py-2 bg-gray-50 rounded-lg text-lg font-bold border border-gray-200">
                            {formData.quantity} টি
                        </div>
                        <button
                            type="button"
                            onClick={() => updateQuantity(1)}
                            className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 text-xl font-bold hover:bg-pink-200 active:scale-95 transition-transform"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
                    <div className="flex justify-between text-gray-600 mb-1 text-sm">
                        <span>মূল্য (Unit Price):</span>
                        <span>{UNIT_PRICE.toLocaleString()} ৳</span>
                    </div>
                    <div className="flex justify-between text-gray-600 mb-1 text-sm">
                        <span>পরিমাণ (Quantity):</span>
                        <span>{formData.quantity}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 mb-2 border-b border-gray-200 pb-2 text-sm">
                        <span>ডেলিভারি চার্জ:</span>
                        <span className="text-green-600 font-bold">ফ্রি (FREE)</span>
                    </div>
                    <div className="flex justify-between text-lg font-black text-gray-900 mt-1">
                        <span>সর্বমোট (Total):</span>
                        <span className="text-pink-600">{(formData.quantity * UNIT_PRICE).toLocaleString()} ৳</span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 text-white text-xl font-bold rounded-full shadow-lg transition-all mb-4 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 hover:shadow-xl active:scale-95 animate-pulse-slow'}`}
                >
                    {isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : 'অর্ডার কনফার্ম করুন'}
                </button>
            </form>
        </div>
    );
}
