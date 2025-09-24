import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";

const Privacy = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="text-gray-800 dark:text-gray-200 rounded-xl shadow-md transition-colors duration-300 max-w-7xl mx-auto px-6 py-10">
                <div className="flex items-center gap-6 pb-10">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-red-500 hover:text-red-500 transition"
                    >
                        <Logo className="h-8 w-8" />
                        <span className="text-lg font-semibold tracking-wide">
                            Nirapod-Parcel
                        </span>
                    </Link>
                </div>

                <h1 className="text-2xl font-bold mb-6 text-red-500">Privacy Policy</h1>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-red-500">1. Introduction</h2>
                        <p>
                            Welcome to <b>Safe Parcel</b>! This Privacy Policy explains how we
                            collect, use and protect your personal information. By using our
                            services, you agree to the terms outlined here.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-red-500">2. Information We Collect</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Your name, phone number, email, and delivery address.</li>
                            <li>Payment information (for COD or online transactions).</li>
                            <li>Device and browser data, IP address, and usage history.</li>
                            <li>Information you provide during account creation or updates.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-red-500">3. Why We Collect Information</h2>
                        <p>
                            We use your information to process deliveries, ensure parcel safety,
                            confirm identity, provide support, and improve our services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-red-500">
                            4. Information Sharing with Third Parties
                        </h2>
                        <p>
                            We only share data with trusted partners (like logistics and payment
                            providers). We may also disclose information if required by law or
                            to prevent fraud.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-red-500">5. Return & Failed Delivery</h2>
                        <p>
                            If a parcel is rejected or contains incorrect details, Safe Parcel
                            will return it to the sender within 15 days (inside Dhaka) or 15
                            days (outside Dhaka).
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-red-500">6. Cookies</h2>
                        <p>
                            We use cookies to provide a personalized experience. Third-party
                            advertisers may also use cookies for relevant ads.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-red-500">7. Data Retention</h2>
                        <p>
                            We retain personal information while you use our services. After
                            termination, we may keep records for legal purposes but anonymize
                            unnecessary data.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-red-500">8. Security</h2>
                        <p>
                            We follow security best practices to protect your data, but no
                            system is 100% secure.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-red-500">9. Your Rights</h2>
                        <p>
                            You may access, update, or delete your information anytime by
                            contacting us.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-red-500">10. Contact Us</h2>
                        <p>
                            For questions about this Privacy Policy, contact:
                            <br />
                            <b>Email:</b> support@safeparcel.com
                            <br />
                            <b>Phone:</b> +880-1XXXXXXXXX
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Privacy;