import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq3Props {
  heading?: string;
  description?: string;
  items?: FaqItem[];
  supportHeading?: string;
  supportDescription?: string;
  supportButtonText?: string;
  supportButtonUrl?: string;
}

const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "How do I send a parcel?",
    answer: "You can send a parcel by booking online through our website or app, providing sender and receiver details, and scheduling a pickup."
  },
  {
    id: "faq-2",
    question: "How can I track my parcel?",
    answer: "After sending a parcel, you'll receive a tracking number. Enter it on our tracking page to see real-time updates of your delivery."
  },
  {
    id: "faq-3",
    question: "What are your delivery timeframes?",
    answer: "Delivery times depend on the destination. Local deliveries are usually completed within 1-3 business days, while international parcels may take longer."
  },
  {
    id: "faq-4",
    question: "Is my parcel insured?",
    answer: "Yes, we offer secure handling and optional insurance for valuable items. Check our terms for full insurance details."
  },
  {
    id: "faq-5",
    question: "Can I change the delivery address after sending?",
    answer: "Address changes are possible before the parcel is out for delivery. Contact our support team immediately to request a change."
  },
  {
    id: "faq-6",
    question: "What items are restricted from shipping?",
    answer: "Restricted items include hazardous materials, illegal goods, and perishable items. Please check our guidelines before sending."
  },
];

const Frequently = ({
  heading = "Frequently Asked Questions",
  description = "Find answers to common questions about our services. Can't find what you're looking for? Contact our support team.",
  items = faqItems,
  supportHeading = "Need More Help?",
  supportDescription = "If you need further assistance, get in touch with our support team immediately.",
  supportButtonText = "Contact Us",
  supportButtonUrl = "/contact",
}: Faq3Props) => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto space-y-10 px-6">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
          <p className="text-gray-600 dark:text-gray-300 lg:text-lg">{description}</p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="mx-auto w-full lg:max-w-3xl space-y-4">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition">
              <AccordionTrigger className="px-6 py-4 text-left font-medium cursor-pointer text-gray-900 dark:text-white hover:opacity-80 transition">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700 dark:text-gray-300">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Support Section */}
        <div className="text-center mt-12 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{supportHeading}</h3>
          <p className="text-gray-600 dark:text-gray-300">{supportDescription}</p>
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-md">
            <Link to={supportButtonUrl}>{supportButtonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Frequently;