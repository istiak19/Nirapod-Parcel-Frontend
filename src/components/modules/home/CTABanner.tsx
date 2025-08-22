import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router";

const CTABanner = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-red-600 to-red-400 text-white text-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto space-y-6"
            >
                <h2 className="text-3xl md:text-4xl font-bold">Ready to Deliver Your Parcel?</h2>
                <p className="text-lg">Join thousands of happy customers who trust us for fast, secure delivery.</p>
                <Button asChild className="bg-white text-red-600 hover:bg-gray-200 px-8 py-3 text-lg rounded-xl shadow-md">
                    <Link to="/register">🚀 Get Started</Link>
                </Button>
            </motion.div>
        </section>
    );
};

export default CTABanner;