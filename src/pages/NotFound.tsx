import { Button } from "@/components/ui/button";
import { PackageX } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import notPic from "../assets/images/not.jpg";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative"
            style={{
                backgroundImage: `url(${notPic})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative max-w-lg w-full text-center space-y-6 bg-background/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/10"
            >
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="p-5 bg-red-100 dark:bg-red-900/40 rounded-full shadow-md">
                        <PackageX className="w-14 h-14 text-red-500" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-6xl font-bold text-red-500 drop-shadow-lg">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-foreground">
                    Page Not Found
                </h2>

                {/* Subtitle */}
                <p className="text-muted-foreground leading-relaxed">
                    Sorry, the page you’re looking for doesn’t exist or might have been
                    moved. Let’s get you back on track.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                    <Button
                        asChild
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow-md"
                    >
                        <Link to="/">Go Home</Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="px-6 py-2 rounded-xl"
                    >
                        <Link to="/contact">Contact Support</Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFound;