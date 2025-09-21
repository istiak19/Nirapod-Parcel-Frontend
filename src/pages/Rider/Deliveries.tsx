/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading";
import { useGetAllAssignQuery } from "@/redux/features/user/user.api";
import { Helmet } from "react-helmet-async";
import { MdLocationOn, MdDateRange, MdOutlineDeliveryDining } from "react-icons/md";
import { AiOutlineUser, AiOutlineUsergroupAdd } from "react-icons/ai";

const Deliveries = () => {
    const { data, isLoading } = useGetAllAssignQuery(undefined);

    if (isLoading) return <Loading />;

    const rider = data?.data;
    const parcels = rider?.assignedParcels || [];

    return (
        <div className="container mx-auto my-8">
            <Helmet>
                <title>My Deliveries | Nirapod Parcel</title>
                <meta name="description" content="View your assigned deliveries" />
            </Helmet>

            <h2 className="text-3xl font-bold text-red-500 mb-5 text-center">
                My Deliveries
            </h2>

            {parcels.length === 0 ? (
                <p className="text-center text-gray-500">No assigned parcels yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {parcels.map((parcel: any) => (
                        <div
                            key={parcel._id}
                            className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-lg p-4 hover:shadow-xl transition"
                        >
                            <h3 className="text-xl font-bold mb-2">{parcel.type}</h3>
                            <p className="text-sm text-gray-500 mb-1">Tracking ID: <span className="font-mono">{parcel.trackingId}</span></p>
                            <p className="text-sm mb-1">Weight: {parcel.weight} kg</p>
                            <p className="text-sm mb-1">Fee: {parcel.fee} BDT</p>

                            <div className="mt-1 flex items-center gap-2">
                                <MdLocationOn className="text-red-500" />
                                <p className="text-sm">{parcel.pickupAddress}</p>
                            </div>

                            <div className="mt-1 flex items-center gap-2">
                                <MdLocationOn className="text-green-500" />
                                <p className="text-sm">{parcel.deliveryAddress}</p>
                            </div>

                            <div className="mt-1 flex items-center gap-2">
                                <MdDateRange className="text-blue-500" />
                                <p className="text-sm">Delivery Date: {new Date(parcel.deliveryDate).toLocaleDateString()}</p>
                            </div>

                            <p className={`text-sm font-semibold mt-2 ${parcel.isBlocked ? "text-red-600" : "text-green-600"}`}>
                                Parcel Status: {parcel.currentStatus}
                            </p>

                            <div className="mt-2 flex items-center gap-2">
                                <AiOutlineUser className="text-blue-500" />
                                <div>
                                    <p className="text-sm font-medium">Sender: <span className="text-gray-300">{parcel.sender?.name}</span></p>
                                    <p className="text-xs text-gray-500">{parcel.sender?.email}</p>
                                    <p className="text-xs text-gray-500">{parcel.sender?.phone}</p>
                                </div>
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                                <AiOutlineUsergroupAdd className="text-purple-500" />
                                <div>
                                    <p className="text-sm font-medium">Receiver: <span className="text-gray-300">{parcel.receiver?.name}</span></p>
                                    <p className="text-xs text-gray-500">{parcel.receiver?.email}</p>
                                    <p className="text-xs text-gray-500">{parcel.receiver?.phone}</p>
                                </div>
                            </div>

                            {/* Status Logs */}
                            {parcel.statusLogs?.length > 0 && (
                                <div className="mt-4 border-t pt-3 space-y-2">
                                    <p className="text-sm font-medium flex items-center gap-2">
                                        <MdOutlineDeliveryDining /> Status History:
                                    </p>
                                    {parcel.statusLogs.map((log: any, index: number) => (
                                        <div key={index} className="text-xs text-gray-600 dark:text-gray-300 flex flex-col gap-1">
                                            <p>
                                                <span className="font-semibold">{log.status}</span> - {new Date(log.updateAt).toLocaleString()}
                                            </p>
                                            <p className="italic text-gray-500 flex items-center gap-1">
                                                <MdLocationOn /> {log.location}
                                            </p>
                                            {log.note && <p className="text-gray-400">Note: {log.note}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Deliveries;