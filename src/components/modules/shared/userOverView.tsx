import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, XCircle, Slash } from "lucide-react";

interface UserOverviewProps {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  blockedUsers: number;
}

const UserOverview = ({ totalUsers, activeUsers, inactiveUsers, blockedUsers }: UserOverviewProps) => {
  const cards = [
    { title: "Total Users", value: totalUsers, color: "text-gray-700", icon: <Users className="w-6 h-6" /> },
    { title: "Active Users", value: activeUsers, color: "text-green-600", icon: <CheckCircle className="w-6 h-6" /> },
    { title: "Inactive Users", value: inactiveUsers, color: "text-yellow-500", icon: <Slash className="w-6 h-6" /> },
    { title: "Blocked Users", value: blockedUsers, color: "text-red-500", icon: <XCircle className="w-6 h-6" /> },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 my-8">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <CardHeader className="flex items-center gap-2">
            {card.icon}
            <CardTitle>{card.title}</CardTitle>
          </CardHeader>
          <CardContent className={`text-3xl font-bold ${card.color}`}>
            {card.value}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserOverview;