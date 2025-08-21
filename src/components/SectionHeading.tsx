import type { SectionHeadingProps } from "@/types";

const SectionHeading = ({
    kicker = "Best Tours",
    title = "Recommended Trips For You",
    align = "center",
}: SectionHeadingProps) => {
    return (
        <div
            className={`relative pb-5 ${align === "center" ? "text-center" : "text-left"
                }`}
        >
            {/* Kicker */}
            <div
                className={`flex items-center gap-2 mb-4 ${align === "center" ? "justify-center" : ""
                    }`}
            >   <span className="text-[#FF7A00] italic font-semibold select-none">
                    {kicker}
                </span>
            </div>

            {/* Title with highlight */}
            <h2 className="relative inline-block font-serif text-3xl md:text-4xl leading-[1.1] tracking-tight text-foreground font-bold">
                <span className="relative z-10">{title}</span>
            </h2>
        </div>
    );
};

export default SectionHeading;