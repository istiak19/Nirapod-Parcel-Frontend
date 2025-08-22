import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";

const Pricing = () => {
    const plans = [
        {
            title: "Starter",
            price: 150,
            features: ["Local Delivery", "Tracking Included", "Email Support"],
            highlight: false
        },
        {
            title: "Pro",
            price: 250,
            features: ["Nationwide Delivery", "Priority Support", "Insurance Coverage"],
            highlight: true
        },
        {
            title: "Business",
            price: 300,
            features: ["International Delivery", "Dedicated Manager", "Premium Insurance"],
            highlight: false
        },
    ];

    return (
        <section className="bg-gray-50 dark:bg-gray-950 py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-16">
                    Choose Your Plan
                </h2>
                <div className="grid gap-10 md:grid-cols-3">
                    {plans.map(({ title, price, features, highlight }) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className={`p-8 rounded-3xl shadow-lg border transition-transform duration-300 ${highlight
                                    ? "bg-red-500 text-white scale-105 shadow-2xl border-red-600"
                                    : "bg-white dark:bg-gray-800 hover:scale-105 hover:shadow-xl"
                                }`}
                        >
                            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                            <p className="text-4xl font-extrabold mt-4">
                                ৳{price} <span className="text-lg font-medium">/ month</span>
                            </p>
                            <ul className="mt-6 space-y-3 text-left">
                                {features.map((f) => (
                                    <li key={f} className="text-sm flex items-center before:content-['✓'] before:text-red-500 before:mr-2">
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                className={`mt-6 w-full px-6 py-3 text-lg rounded-xl shadow-md transition-colors ${highlight
                                        ? "bg-white text-red-600 hover:bg-gray-200"
                                        : "bg-red-500 text-white hover:bg-red-600"
                                    }`}
                            >
                                Get Started
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;