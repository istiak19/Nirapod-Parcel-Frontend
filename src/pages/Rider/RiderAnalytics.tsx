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

    const total = parcels.length;
    const requested = parcels.filter((p) => p.currentStatus === "Requested").length;
    const approved = parcels.filter((p) => p.currentStatus === "Approved").length;
    const dispatched = parcels.filter((p) => p.currentStatus === "Dispatched").length;
    const delivered = parcels.filter((p) => p.currentStatus === "Delivered").length;
    const inTransit = parcels.filter((p) => p.currentStatus === "In Transit").length;
    const cancelled = parcels.filter((p) => p.currentStatus === "Cancelled").length;

    const chartParcels: Parcel[] = parcels.map((p) => ({
        id: p._id,
        currentStatus: p.currentStatus,
        createdAt: new Date(p.createdAt || ""),
        statusLogs: p.statusLogs?.map((log) => ({
            status: log.status,
            timestamp: log.updateAt || "",
        })),
    }));

    return (
        <div className="space-y-8 py-10">
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

            {/* Analytics Charts */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Analytics Charts</h2>
                <Charts parcels={chartParcels} />
            </section>
        </div>
    );
};

export default RiderAnalytics;