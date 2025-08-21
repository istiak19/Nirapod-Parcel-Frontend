import SectionHeading from "@/components/SectionHeading";
import { FaUsers, FaBullseye, FaShippingFast } from "react-icons/fa";
import teamPic1 from "@/assets/images/team-1.jpg";
import teamPic2 from "@/assets/images/team-2.jpg";
import teamPic4 from "@/assets/images/team-3.jpg";
import teamPic3 from "@/assets/images/team-4.jpg";

const About = () => {
    return (
        <section className="pb-10">
            {/* Hero Banner */}
            <div className="relative h-[250px] md:h-[400px] flex items-center justify-center bg-center bg-no-repeat mb-16"
                style={{ backgroundImage: `url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80")` }}
            >
                <div className="absolute inset-0 bg-[#0f1c3f]/70"></div>
                <div className="relative text-center text-white px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">About Us</h1>
                    <p className="text-lg md:text-xl font-medium">
                        Discover our journey and the people who make it happen.
                    </p>
                </div>
            </div>

            {/* Section: Services */}
            <div className="max-w-7xl mx-auto px-5 mb-16">
                <SectionHeading title="Our Services" kicker="What We Do" align="center" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    <div className="bg-[#0f1c3f] text-white rounded-3xl p-8 flex flex-col items-center text-center gap-4">
                        <div className="bg-red-500 p-5 rounded-full text-3xl">
                            <FaShippingFast />
                        </div>
                        <h3 className="text-xl font-semibold">Fast Delivery</h3>
                        <p className="text-gray-300">We ensure quick and reliable delivery services to meet your needs.</p>
                    </div>
                    <div className="bg-[#0f1c3f] text-white rounded-3xl p-8 flex flex-col items-center text-center gap-4">
                        <div className="bg-red-500 p-5 rounded-full text-3xl">
                            <FaBullseye />
                        </div>
                        <h3 className="text-xl font-semibold">Customer Focus</h3>
                        <p className="text-gray-300">Our mission is to provide excellent customer service and satisfaction.</p>
                    </div>
                    <div className="bg-[#0f1c3f] text-white rounded-3xl p-8 flex flex-col items-center text-center gap-4">
                        <div className="bg-red-500 p-5 rounded-full text-3xl">
                            <FaUsers />
                        </div>
                        <h3 className="text-xl font-semibold">Trusted Team</h3>
                        <p className="text-gray-300">Our team is experienced, professional, and dedicated to your needs.</p>
                    </div>
                </div>
            </div>

            {/* Section: Mission */}
            <div className="bg-[#f9f9f9] py-16">
                <div className="max-w-5xl mx-auto px-5 text-center">
                    <div
                        className="relative pb-5 text-center">
                        <div
                            className="flex items-center gap-2 mb-4 text-center justify-center"
                        >   <span className="text-red-500 italic font-semibold select-none">
                                Why We Exist
                            </span>
                        </div>

                        {/* Title with highlight */}
                        <h2 className="relative inline-block font-serif text-3xl md:text-4xl leading-[1.1] tracking-tight text-popover font-bold">
                            <span className="relative z-10">Our Mission</span>
                        </h2>
                    </div>
                    <p className="mt-6 text-secondary text-lg md:text-xl">
                        Our mission is to make parcel delivery seamless, reliable, and accessible for everyone. We combine advanced logistics technology with a customer-first approach to ensure timely deliveries across all regions.
                    </p>
                </div>
            </div>

            {/* Section: Team */}
            <div className="max-w-7xl mx-auto px-5 mt-16">
                <SectionHeading title="Meet Our Team" kicker="Who We Are" align="center" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
                    {/* Team Member 1 */}
                    <div className="bg-white rounded-2xl overflow-hidden text-center p-6 shadow-2xl border border-primary">
                        <img
                            src={teamPic1}
                            alt="James Cameron"
                            className="w-full h-64 object-cover rounded-2xl mb-4"
                        />
                        <h4 className="text-lg text-black font-semibold">James Cameron</h4>
                        <p className="text-muted-foreground">Manager</p>
                    </div>

                    {/* Team Member 2 */}
                    <div className="bg-white rounded-2xl overflow-hidden text-center p-6 shadow-2xl border border-primary">
                        <img
                            src={teamPic2}
                            alt="Mich Thomson"
                            className="w-full h-64 object-cover rounded-2xl mb-4"
                        />
                        <h4 className="text-lg font-semibold text-black">Mich Thomson</h4>
                        <p className="text-muted-foreground">Supervisor</p>
                    </div>

                    {/* Team Member 3 */}
                    <div className="bg-white rounded-2xl overflow-hidden text-center p-6 shadow-2xl border border-primary">
                        <img
                            src={teamPic3}
                            alt="Josh Batlar"
                            className="w-full h-64 object-cover rounded-2xl mb-4"
                        />
                        <h4 className="text-lg font-semibold text-black">Josh Batlar</h4>
                        <p className="text-muted-foreground">Sr. Executive</p>
                    </div>

                    {/* Team Member 4 */}
                    <div className="bg-white rounded-2xl overflow-hidden text-center p-6 shadow-2xl border border-primary">
                        <img
                            src={teamPic4}
                            alt="Albert Gill"
                            className="w-full h-64 object-cover rounded-2xl mb-4"
                        />
                        <h4 className="text-lg font-semibold text-black">Albert Gill</h4>
                        <p className="text-muted-foreground">Relation Officer</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;