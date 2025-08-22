import CTABanner from "@/components/modules/home/CTABanner"
import Features from "@/components/modules/home/Features"
import Frequently from "@/components/modules/home/Frequently"
import HeroSection from "@/components/modules/home/HeroSection"
import HowItWorks from "@/components/modules/home/HowItWorks"
import Testimonials from "@/components/modules/home/Testimonials"

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
            {/* Hero Section */}
            <HeroSection />

            {/* Features */}
            <Features />

            {/* How It Works Timeline */}
            <HowItWorks />

            {/* Pricing Plans */}


            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <Frequently />

            {/* CTA Banner */}
            <CTABanner />
        </div>
    )
}
