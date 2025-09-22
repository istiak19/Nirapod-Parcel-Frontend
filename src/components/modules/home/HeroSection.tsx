import { Button } from "@/components/ui/button";
import bannerPic from "@/assets/images/banner.avif";
import { Link } from "react-router";
import { motion } from "framer-motion";

const HeroSection = () => {
    return (
        <section className="relative flex flex-col lg:flex-row items-center justify-between container mx-auto px-6 py-24">
            {/* Text */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center lg:text-left max-w-2xl space-y-6"
            >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
                    Fast, Secure & Reliable <br />
                    <span className="text-red-500">Parcel Delivery in Bangladesh</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Send and receive parcels across Dhaka, Chattogram, Rajshahi, Khulna and every
                    corner of Bangladesh — with affordable rates, real-time tracking, and
                    international shipping options.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <Button
                        asChild
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl shadow-md"
                    >
                        <Link to="/send">📦 Send a Parcel</Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="px-5 py-3 rounded-xl"
                    >
                        <Link to="/track">🔍 Track Parcel</Link>
                    </Button>
                </div>
            </motion.div>

            {/* Hero Image */}
            <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                src={bannerPic}
                alt="Parcel delivery Bangladesh"
                className="mt-12 lg:mt-0 max-w-lg w-full rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800"
            />
        </section>
    );
};

export default HeroSection;