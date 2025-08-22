import { Package, Truck, ShieldCheck, Clock, MapPin, Smartphone, CreditCard, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
    return (
        <section className="bg-gray-100 dark:bg-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Heading */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                        Why Choose <span className="text-red-500">Nirapod Parcel?</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                        From local to global, we make sure your parcels are delivered
                        quickly, safely, and affordably. Here’s what makes us stand out in
                        Bangladesh and beyond.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            icon: Package,
                            title: "Safe Packaging",
                            desc: "Your parcels are carefully packed and handled with extra care.",
                        },
                        {
                            icon: Truck,
                            title: "Fast Delivery",
                            desc: "Enjoy quick, on-time deliveries across Bangladesh and globally.",
                        },
                        {
                            icon: ShieldCheck,
                            title: "Secure Service",
                            desc: "Trusted and insured service with guaranteed parcel safety.",
                        },
                        {
                            icon: Clock,
                            title: "24/7 Support",
                            desc: "Track & get customer support anytime, anywhere.",
                        },
                        {
                            icon: MapPin,
                            title: "Wide Coverage",
                            desc: "We deliver across 64 districts in Bangladesh.",
                        },
                        {
                            icon: Smartphone,
                            title: "Easy Tracking",
                            desc: "Track your parcels live from your phone or computer in real time.",
                        },
                        {
                            icon: CreditCard,
                            title: "Flexible Payments",
                            desc: "Pay online, cash-on-delivery, or via mobile banking.",
                        },
                        {
                            icon: Leaf,
                            title: "Eco-Friendly",
                            desc: "Sustainable operations with eco-friendly packaging options.",
                        },
                    ].map(({ icon: Icon, title, desc }) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition"
                        >
                            <Icon className="w-14 h-14 text-red-500 mx-auto mb-5" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-3">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;