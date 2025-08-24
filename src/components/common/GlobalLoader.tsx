/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux/store";

const GlobalLoader = () => {
    const queries = useAppSelector((state: RootState) => state.baseApi.queries);

    const hasLoading = Object.values(queries).some(
        (q: any) => q?.status === "pending"
    );

    if (!hasLoading) return null;

    return (
        <div
            className="fixed inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-50"
            aria-label="Loading..."
        >
            {/* Animated Package Icon */}
            <motion.div
                className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-full shadow-xl"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-lg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                >
                    {/* Package box */}
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7l9-4 9 4v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v14" />
                </motion.svg>
            </motion.div>

            {/* Loading Text */}
            <motion.p
                className="mt-6 text-white text-lg sm:text-2xl font-semibold tracking-wide flex items-center"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                Nirapod-Parcel
            </motion.p>

            {/* Optional: Skeleton placeholder for content */}
            <div className="mt-8 w-64 sm:w-80 h-4 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
    );
};

export default GlobalLoader;