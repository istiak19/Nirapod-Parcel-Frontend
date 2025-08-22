import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";

const Pricing = () => {
    return (
        <section className="bg-gray-50 dark:bg-gray-950 py-20">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Choose Your Plan</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {[
                        { title: "Starter", price: "$5", features: ["Local Delivery", "Tracking Included", "Email Support"], highlight: false },
                        { title: "Pro", price: "$15", features: ["Nationwide Delivery", "Priority Support", "Insurance Coverage"], highlight: true },
                        { title: "Business", price: "$30", features: ["International Delivery", "Dedicated Manager", "Premium Insurance"], highlight: false },
                    ].map(({ title, price, features, highlight }) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className={`p-8 rounded-2xl shadow-lg border ${highlight ? "bg-red-500 text-white scale-105" : "bg-white dark:bg-gray-800"}`}
                        >
                            <h3 className="text-2xl font-bold">{title}</h3>
                            <p className="text-4xl font-extrabold mt-4">{price}</p>
                            <ul className="mt-6 space-y-3">
                                {features.map((f) => (
                                    <li key={f} className="text-sm">{f}</li>
                                ))}
                            </ul>
                            <Button className={`mt-6 w-full ${highlight ? "bg-white text-red-600 hover:bg-gray-200" : "bg-red-500 text-white hover:bg-red-600"}`}>
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