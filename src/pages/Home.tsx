import CTABanner from "@/components/modules/home/CTABanner"
import Features from "@/components/modules/home/Features"
import Frequently from "@/components/modules/home/Frequently"
import HeroSection from "@/components/modules/home/HeroSection"
import HowItWorks from "@/components/modules/home/HowItWorks"
// import Pricing from "@/components/modules/home/Pricing"
import Testimonials from "@/components/modules/home/Testimonials"
import { Helmet } from "react-helmet-async"

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
            <Helmet>
                <title>Home | Nirapod Parcel</title>
                <meta name="description" content="Welcome to Nirapod Parcel home page" />
            </Helmet>
            
            <HeroSection />
            <Features />
            <HowItWorks />
            {/* <Pricing /> */}
            <Testimonials />
            <Frequently />
            <CTABanner />
        </div>
    )
}
