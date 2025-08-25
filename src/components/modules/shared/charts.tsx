import type { ChartsProps } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Status → color mapping
const COLORS: Record<string, string> = {
  Requested: "#fbbf24",    // amber-400
  Approved: "#3b82f6",     // blue-500
  Dispatched: "#a855f7",   // purple-500
  Delivered: "#22c55e",    // green-500
  "In Transit": "#06b6d4", // cyan-500
  Cancelled: "#ef4444",    // red-500 (primary)
};

export const Charts = ({ parcels }: ChartsProps) => {
  // Monthly shipments
  const barData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    shipments: parcels.filter(
      (p) => new Date(p.createdAt).getMonth() === i
    ).length,
  }));

  // Status breakdown
  const pieData = [
    { name: "Requested", value: parcels.filter((p) => p.currentStatus === "Requested").length },
    { name: "Approved", value: parcels.filter((p) => p.currentStatus === "Approved").length },
    { name: "Dispatched", value: parcels.filter((p) => p.currentStatus === "Dispatched").length },
    { name: "Delivered", value: parcels.filter((p) => p.currentStatus === "Delivered").length },
    { name: "In Transit", value: parcels.filter((p) => p.currentStatus === "In Transit").length },
    { name: "Cancelled", value: parcels.filter((p) => p.currentStatus === "Cancelled").length },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Bar Chart */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-2xl">
        <h3 className="font-semibold mb-4">Monthly Shipments</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--foreground)",
                fontSize: "0.875rem",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
            <Bar dataKey="shipments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow=2xl">
        <h3 className="font-semibold mb-4">Delivery Status</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {pieData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--primary)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--foreground)",
                fontSize: "0.875rem",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};