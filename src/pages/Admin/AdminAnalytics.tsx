import Loading from "@/components/Loading";
import { Charts } from "@/components/modules/shared/charts";
import OverviewCards from "@/components/modules/shared/overviewCards";
import UserOverview from "@/components/modules/shared/userOverView";
import { useGetAllParcelQuery } from "@/redux/features/parcel/parcel.api";
import { useGetAllUserQuery } from "@/redux/features/user/user.api";
import type { IUser, Parcel } from "@/types";

const AdminAnalytics = () => {
    const { data, isLoading } = useGetAllParcelQuery(undefined);
    const { data: usersData } = useGetAllUserQuery(undefined);

    const parcels: Parcel[] = data?.data || [];

    const total = data?.meta?.total;
    const requested = parcels.filter((p) => p.currentStatus === "Requested").length;
    const approved = parcels.filter((p) => p.currentStatus === "Approved").length;
    const dispatched = parcels.filter((p) => p.currentStatus === "Dispatched").length;
    const delivered = parcels.filter((p) => p.currentStatus === "Delivered").length;
    const inTransit = parcels.filter((p) => p.currentStatus === "In Transit").length;
    const cancelled = parcels.filter((p) => p.currentStatus === "Cancelled").length;

    // Users stats
    const totalUsers = usersData?.meta?.total || 0;
    const activeUsers = usersData?.data?.filter((u: IUser) => u.isBlocked === "Active").length || 0;
    const blockedUsers = usersData?.data?.filter((u: IUser) => u.isBlocked === "Blocked").length || 0;
    const inactiveUsers = totalUsers - activeUsers - blockedUsers;

    if (isLoading) return <Loading />;

    return (
        <div className="space-y-8 py-10">
            <section>
                <h2 className="text-2xl font-bold mb-4">User Overview</h2>
                <UserOverview
                    totalUsers={totalUsers}
                    activeUsers={activeUsers}
                    inactiveUsers={inactiveUsers}
                    blockedUsers={blockedUsers}
                />
            </section>

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

export default AdminAnalytics;