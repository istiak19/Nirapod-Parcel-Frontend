import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle2, Truck, XCircle, Send, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OverviewCardsProps } from "@/types";

const OverviewCards = ({ total, requested, approved, dispatched, delivered, inTransit, cancelled }: OverviewCardsProps) => {
    const cards = [
        { title: "Total Parcels", value: total, icon: Package, color: "text-orange-500" },
        { title: "Requested", value: requested, icon: ClipboardCheck, color: "text-purple-600" },
        { title: "Approved", value: approved, icon: CheckCircle2, color: "text-emerald-600" },
        { title: "Dispatched", value: dispatched, icon: Send, color: "text-blue-600" },
        { title: "In Transit", value: inTransit, icon: Truck, color: "text-indigo-600" },
        { title: "Delivered", value: delivered, icon: CheckCircle2, color: "text-green-600" },
        { title: "Cancelled", value: cancelled, icon: XCircle, color: "text-red-600" },
    ];

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-7">
            {cards.map((card, idx) => (
                <Card
                    key={idx}
                    className="rounded-2xl shadow-2xl hover:shadow-md transition-shadow duration-200"
                >
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                        <card.icon className={cn("h-5 w-5", card.color)} />
                    </CardHeader>
                    <CardContent>
                        <div className={cn("text-3xl font-bold", card.color)}>
                            {card.value}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default OverviewCards;