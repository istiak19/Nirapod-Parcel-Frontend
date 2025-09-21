import Loading from "@/components/Loading";
import { Charts } from "@/components/modules/shared/charts";
import OverviewCards from "@/components/modules/shared/overviewCards";
import { useGetAllAssignQuery } from "@/redux/features/user/user.api";
import type { IParcel, Parcel } from "@/types";
import { Helmet } from "react-helmet-async";

const RiderAnalytics = () => {
    const { data, isLoading } = useGetAllAssignQuery(undefined);

    if (isLoading) return <Loading />;

    const parcels: IParcel[] = data?.data?.assignedParcels || [];

    // Map IParcel[] to Parcel[] for Charts
    const chartParcels: Parcel[] = parcels.map(p => ({
        id: p._id, // map _id -> id
        currentStatus: p.currentStatus,
        createdAt: new Date(p.createdAt || p.deliveryDate || Date.now()),
        statusLogs: p.statusLogs?.map(sl => ({
            status: sl.status,
            timestamp: sl.updateAt || ""
        }))
    }));

    // Parcel Status Counts
    const total = parcels.length;
    const requested = parcels.filter(p => p.currentStatus === "Requested").length;
    const approved = parcels.filter(p => p.currentStatus === "Approved").length;
    const dispatched = parcels.filter(p => p.currentStatus === "Dispatched").length;
    const delivered = parcels.filter(p => p.currentStatus === "Delivered").length;
    const inTransit = parcels.filter(p => p.currentStatus === "In Transit").length;
    const cancelled = parcels.filter(p => p.currentStatus === "Cancelled").length;

    // Earnings Calculations
    const deliveredParcels = parcels.filter(p => p.currentStatus === "Delivered");
    const totalEarnings = deliveredParcels.reduce((sum, p) => sum + p.fee, 0);
    const perDeliveryEarnings = deliveredParcels.length ? totalEarnings / deliveredParcels.length : 0;

    const dailyEarnings: Record<string, number> = {};
    deliveredParcels.forEach(p => {
        const day = new Date(p.deliveryDate).toLocaleDateString(); dailyEarnings[day] = (dailyEarnings[day] || 0) + p.fee;
    });

    return (
        <div className="space-y-8 py-10 container mx-auto">
            <Helmet>
                <title>Rider Analytics | Nirapod Parcel</title>
                <meta name="description" content="Analytics for parcels assigned to the rider" />
            </Helmet>

            {/* Parcel Overview */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Parcel Overview</h2>
                <OverviewCards
                    total={total}
                    requested={requested}
                    approved={approved}
                    dispatched={dispatched}
                    delivered={delivered}
                    inTransit={inTransit}
                    cancelled={cancelled}
                />
            </section>

            {/* Earnings Report */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Earnings Report</h2>
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md space-y-2">
                    <p><strong>Total Earnings:</strong> {totalEarnings} BDT</p>
                    <p><strong>Earnings per Delivery:</strong> {perDeliveryEarnings.toFixed(2)} BDT</p>
                    <div>
                        <strong>Daily Earnings:</strong>
                        <ul className="list-disc pl-5">
                            {Object.entries(dailyEarnings).map(([date, earning]) => (
                                <li key={date}>{date}: {earning} BDT</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Analytics Charts */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Analytics Charts</h2>
                <Charts parcels={chartParcels} />
            </section>
        </div>
    );
};

export default RiderAnalytics;