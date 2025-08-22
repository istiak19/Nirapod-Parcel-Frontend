import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import contactPic from "@/assets/images/contact.jpg";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCreateContactMutation } from "@/redux/features/contact/contact.api";

const Contact = () => {
    const [createContact] = useCreateContactMutation();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await createContact(formData).unwrap();
            if (res.success) {
                toast.success("Message sent successfully!");
                setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
            };
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <section className="pb-10">
            {/* Banner */}
            <div
                className="relative h-[200px] md:h-[300px] flex items-center justify-center bg-center bg-no-repeat mb-10"
                style={{ backgroundImage: `url(${contactPic})` }}
            >
                <div className="absolute inset-0 bg-[#0f1c3f]/70"></div>
                <div className="relative text-center text-white px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">Get in Touch</h1>
                    <p className="text-lg md:text-xl font-medium">
                        Have questions about your delivery? Our team is here to help.
                    </p>
                </div>
            </div>

            <div className="mb-10">
                <SectionHeading
                    title="Feel Free to Write us Anytime"
                    align="center"
                    kicker="Contact Us"
                />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch px-5">
                {/* Left Side - Contact Info */}
                <div className="bg-[#0f1c3f] rounded-3xl overflow-hidden flex flex-col">
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1493135637657-c2411b3497ad?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Contact"
                            className="w-full h-80 object-cover rounded-bl-3xl"
                        />
                        <div className="absolute bottom-0 left-8 bg-red-500 px-5 py-2 rounded-t-lg text-white font-semibold text-lg italic">
                            Contact Information
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 p-8 text-white">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#1f2a4d] p-3 rounded-full">
                                <FaPhoneAlt className="text-red-500 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-300">Hot Line</p>
                                <p className="font-semibold">Free +880 1234 567 890</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-[#1f2a4d] p-3 rounded-full">
                                <FaEnvelope className="text-red-500 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-300">Send Email</p>
                                <p className="font-semibold">support@nirapodparcel.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-[#1f2a4d] p-3 rounded-full">
                                <FaMapMarkerAlt className="text-red-500 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-300">Our Address</p>
                                <p className="font-semibold">80 Mirpur Road, Mirpur, Dhaka</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Contact Form */}
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full p-4 rounded-lg border border-red-500 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full p-4 rounded-lg border border-red-500 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full p-4 rounded-lg border border-red-500 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="w-full p-4 rounded-lg border border-red-500 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write a Message"
                        rows={5}
                        className="w-full p-4 rounded-lg border border-red-500 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                    <Button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full w-max self-start transition cursor-pointer"
                    >
                        Send a Message
                    </Button>
                </form>
            </div>

            {/* Google Map */}
            <div className="mt-12 max-w-7xl mx-auto px-5">
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902832845823!2d90.3915!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b89c5d3c17b1%3A0xf51c9b1d5a1f2a5a!2sDhaka!5e0!3m2!1sen!2sbd!4v1615555555555"
                    className="w-full h-96 rounded-2xl border-0"
                    loading="lazy"
                ></iframe>
            </div>
        </section>
    );
};

export default Contact;