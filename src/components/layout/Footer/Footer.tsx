import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import FooterPic from "@/assets/images/footer-bg.png";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
    const socials = [
        { name: "Facebook", href: "https://facebook.com", icon: <FaFacebookF /> },
        { name: "Instagram", href: "https://instagram.com", icon: <FaInstagram /> },
        { name: "Twitter", href: "https://twitter.com", icon: <FaTwitter /> },
        { name: "GitHub", href: "https://github.com", icon: <FaGithub /> },
    ];

    return (
        <footer
            className="relative border-t border-[#ff7b00c3] bg-cover bg-center"
            style={{ backgroundImage: `url(${FooterPic})` }}
        >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/38" />

            <div className="relative mx-auto container space-y-10 px-4 py-12 text-white">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Logo + description */}
                    <div>
                        <div>
                            <Logo />
                            <p className="text-sm font-medium mt-2">
                                Safe Deliveries. Trusted Service.
                            </p>
                        </div>

                        <p className="mt-4 max-w-sm text-sm text-gray-200">
                            Nirapod-Parcel is your trusted companion in secure and reliable parcel delivery.
                            Send packages, track deliveries, and experience peace of mind.
                        </p>

                        <ul className="mt-6 flex gap-6">
                            {socials.map(({ name, href, icon }) => (
                                <li key={name}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-teal-400 transition text-xl"
                                        aria-label={name}
                                    >
                                        {icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links grid */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3 justify-between">
                        {/* Services */}
                        <div>
                            <p className="font-semibold">Services</p>
                            <ul className="mt-4 space-y-3 text-sm text-gray-300">
                                <li><Link to="/" className="hover:underline">Parcel Delivery</Link></li>
                                <li><Link to="/" className="hover:underline">Same Day Delivery</Link></li>
                                <li><Link to="/" className="hover:underline">Cash on Delivery (COD)</Link></li>
                                <li><Link to="/" className="hover:underline">E-commerce Logistics</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <p className="font-semibold">Company</p>
                            <ul className="mt-4 space-y-3 text-sm text-gray-300">
                                <li><Link to="/about" className="hover:underline">About Us</Link></li>
                                <li><Link to="/careers" className="hover:underline">Careers</Link></li>
                                <li><Link to="/partners" className="hover:underline">Partners</Link></li>
                                <li><Link to="/blog" className="hover:underline">Blog</Link></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <p className="font-semibold">Support</p>
                            <ul className="mt-4 space-y-3 text-sm text-gray-300">
                                <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
                                <li><Link to="/help" className="hover:underline">Help Center</Link></li>
                                <li><Link to="/faqs" className="hover:underline">FAQs</Link></li>
                                <li><Link to="/policies" className="hover:underline">Policies</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-8">
                    <div className="sm:flex sm:justify-between">
                        <p className="">
                            &copy; {new Date().getFullYear()} Nirapod-Parcel. All rights reserved.
                        </p>

                        <ul className="mt-8 flex flex-wrap justify-start gap-4 sm:mt-0 lg:justify-end">
                            <li>
                                <Link to="/" className="transition hover:opacity-75"> Terms & Conditions </Link>
                            </li>
                            <li>
                                <Link to="/" className="transition hover:opacity-75"> Privacy Policy </Link>
                            </li>
                            <li>
                                <Link to="/" className="transition hover:opacity-75"> Cookie Policy </Link>
                            </li>
                            <li>
                                <Link to="/" className="transition hover:opacity-75"> Refund Policy </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;