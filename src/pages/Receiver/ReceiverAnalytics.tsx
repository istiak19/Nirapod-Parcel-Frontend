import Loading from "@/components/Loading";
import { Charts } from "@/components/modules/shared/charts";
import OverviewCards from "@/components/modules/shared/overviewCards";
import { useGetParcelQuery } from "@/redux/features/parcel/receiver.api";
import type { Parcel } from "@/types";

const ReceiverAnalytics = () => {
    const { data, isLoading } = useGetParcelQuery(undefined);
    const parcels: Parcel[] = data?.data || [];

    const total = parcels.length;
    const requested = parcels.filter((p) => p.currentStatus === "Requested").length;
    const approved = parcels.filter((p) => p.currentStatus === "Approved").length;
    const dispatched = parcels.filter((p) => p.currentStatus === "Dispatched").length;
    const delivered = parcels.filter((p) => p.currentStatus === "Delivered").length;
    const inTransit = parcels.filter((p) => p.currentStatus === "In Transit").length;
    const cancelled = parcels.filter((p) => p.currentStatus === "Cancelled").length;

    if (isLoading) return <Loading />

    return (
        <div className="space-y-8 py-10">
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

            <section>
                <h2 className="text-2xl font-bold mb-4">Analytics Charts</h2>
                <Charts parcels={parcels} />
            </section>
        </div>
    );
};

export default ReceiverAnalytics;