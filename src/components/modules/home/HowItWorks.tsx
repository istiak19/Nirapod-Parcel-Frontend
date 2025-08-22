import { motion } from "framer-motion";

const HowItWorks = () => {
    return (
        <section className="py-20 max-w-6xl mx-auto px-6 text-center">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-14">
                Sending a parcel has never been this simple. With just a few clicks, you
                can schedule a pickup, track your delivery, and relax while we do the
                rest.
            </p>

            {/* Timeline */}
            <div className="relative border-l-4 border-red-500 max-w-xl mx-auto space-y-12">
                {[
                    {
                        step: "Book Online",
                        desc: "Schedule your delivery online or through our app within minutes.",
                    },
                    {
                        step: "Doorstep Pickup",
                        desc: "Our courier partner collects your parcel directly from your home or office.",
                    },
                    {
                        step: "Secure Packaging",
                        desc: "We ensure proper handling & packaging for maximum safety during transit.",
                    },
                    {
                        step: "Real-time Tracking",
                        desc: "Track your parcel’s live location from your phone, anytime, anywhere.",
                    },
                    {
                        step: "Fast Delivery",
                        desc: "We deliver across all 64 districts in Bangladesh & international routes.",
                    },
                    {
                        step: "Safe & Verified Handover",
                        desc: "Your parcel is delivered safely, with proof of delivery & instant updates.",
                    },
                ].map(({ step, desc }, idx) => (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative pl-8"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-[-14px] top-1 w-6 h-6 bg-red-500 rounded-full border-4 border-white dark:border-gray-900"></div>

                        {/* Step Number */}
                        <span className="text-sm font-bold text-red-500 block mb-1">
                            Step {idx + 1}
                        </span>

                        {/* Step Title */}
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {step}
                        </h3>

                        {/* Step Description */}
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;