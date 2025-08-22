import { motion } from "framer-motion";

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-50">
            {/* Animated Box Icon */}
            <motion.div
                className="w-24 h-24 flex items-center justify-center bg-red-500 rounded-full shadow-lg"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            >
                {/* Optional: package icon */}
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                >
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
                className="mt-6 text-white text-xl font-semibold"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                Loading, please wait...
            </motion.p>
        </div>
    );
};

export default Loading;