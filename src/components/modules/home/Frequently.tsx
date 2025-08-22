import { motion } from "framer-motion";

const Frequently = () => {
    return (
        <section className="py-20 max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">FAQ</h2>
            <div className="space-y-6">
                {[
                    { q: "How can I track my parcel?", a: "You can track it using the tracking ID provided after booking." },
                    { q: "Do you offer international shipping?", a: "Yes, we provide local & international delivery services." },
                    { q: "What if my package is lost?", a: "All parcels are insured. Contact support for assistance." },
                ].map(({ q, a }) => (
                    <motion.div
                        key={q}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
                    >
                        <h3 className="font-semibold text-gray-900 dark:text-white">{q}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{a}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Frequently;