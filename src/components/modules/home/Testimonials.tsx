import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonialsData = [
    {
        name: "Sarah M.",
        review: "Super fast delivery and reliable! I always use Nirapod Parcel for sending gifts to my family.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "David K.",
        review: "My package was tracked perfectly. The support team was very responsive and helpful.",
        rating: 4,
        img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Anna P.",
        review: "Safe packaging and friendly staff. Highly recommended for personal and business deliveries.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
];

const Testimonials = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonialsData.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const prevTestimonial = () =>
        setCurrent((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    const nextTestimonial = () =>
        setCurrent((prev) => (prev + 1) % testimonialsData.length);

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
            <div className="relative max-w-3xl mx-auto px-6 text-center">
                {/* Improved Header */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Hear From Our Happy <span className="text-red-500">Customers</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
                    See why thousands trust Nirapod Parcel for safe, fast, and reliable delivery.
                    From personal gifts to business shipments, our customers love our service.
                </p>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        {testimonialsData.map(
                            (testimonial, idx) =>
                                idx === current && (
                                    <motion.div
                                        key={testimonial.name}
                                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                        transition={{ duration: 0.6 }}
                                        className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl hover:shadow-3xl relative"
                                    >

                                        <img
                                            src={testimonial.img}
                                            alt={testimonial.name}
                                            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-red-500 shadow-md"
                                        />

                                        <div className="flex justify-center mb-4">
                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-yellow-400" />
                                            ))}
                                        </div>

                                        <p className="text-gray-700 dark:text-gray-300 italic mb-4">{testimonial.review}</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">— {testimonial.name}</p>
                                    </motion.div>
                                )
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute top-1/2 left-0 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition transform hover:scale-110"
                    >
                        <ChevronLeft className="w-6 h-6 text-red-500" />
                    </button>
                    <button
                        onClick={nextTestimonial}
                        className="absolute top-1/2 right-0 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition transform hover:scale-110"
                    >
                        <ChevronRight className="w-6 h-6 text-red-500" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;