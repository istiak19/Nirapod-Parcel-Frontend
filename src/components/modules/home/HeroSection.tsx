import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

import banner1 from "@/assets/images/banner.avif";
import banner2 from "@/assets/images/banner-1.jpg";
import banner3 from "@/assets/images/banner-2.jpg";
import banner4 from "@/assets/images/banner-3.jpg";
import banner5 from "@/assets/images/banner-4.jpg";

const HeroSection = () => {
    const [currentBanner, setCurrentBanner] = useState(0);

    const banners = [
        {
            src: banner1,
            title: "Delivery Today, Enjoy Tomorrow",
            subtitle: "Fast and reliable delivery service at your doorstep",
        },
        {
            src: banner2,
            title: "Hassle-Free Shipping",
            subtitle: "Send and receive parcels with ease and confidence",
        },
        {
            src: banner3,
            title: "Fast & Reliable Delivery",
            subtitle: "We deliver parcels across Bangladesh efficiently",
        },
        {
            src: banner4,
            title: "Real-Time Tracking",
            subtitle: "Track your parcel at every step",
        },
        {
            src: banner5,
            title: "Affordable Shipping Rates",
            subtitle: "Send parcels without breaking the bank",
        },
    ];

    // Auto banner slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [banners.length]);

    // Sparkles
    const SPARKLE_COUNT = 20;
    const sparkles = Array.from({ length: SPARKLE_COUNT }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 6 + 2}px`,
        color: `hsl(${Math.random() * 360}, 80%, 70%)`,
        delay: Math.random() * 2,
    }));

    return (
        <section className="relative flex flex-col lg:flex-row items-center justify-between container mx-auto px-6 py-24 overflow-hidden">
            {/* Sparkles */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {sparkles.map((s, idx) => (
                    <span
                        key={idx}
                        className="absolute rounded-full animate-sparkle"
                        style={{
                            top: s.top,
                            left: s.left,
                            width: s.size,
                            height: s.size,
                            backgroundColor: s.color,
                            animationDelay: `${s.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Text Section */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center lg:text-left max-w-2xl space-y-6 relative z-10"
            >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
                    Fast, Secure & Reliable <br />
                    <span className="text-red-500">Parcel Delivery in Bangladesh</span>
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Send and receive parcels across Dhaka, Chattogram, Rajshahi, Khulna, and every
                    corner of Bangladesh — with affordable rates, real-time tracking, and
                    international shipping options.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <Link
                        to="/send"
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-md text-center"
                    >
                        📦 Send a Parcel
                    </Link>
                    <Link
                        to="/track"
                        className="border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 rounded-xl text-center"
                    >
                        🔍 Track Parcel
                    </Link>
                </div>
            </motion.div>

            {/* Banner Image */}
            <div className="relative z-10">
                <motion.img
                    key={currentBanner}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    src={banners[currentBanner].src}
                    alt="Parcel delivery Bangladesh"
                    className="w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800"
                />

                <motion.div
                    key={`text-${currentBanner}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-2 text-center"
                >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {banners[currentBanner].title}
                    </h2>
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                        {banners[currentBanner].subtitle}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;