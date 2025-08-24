/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeliveredParcelMutation, useGetParcelQuery } from "@/redux/features/parcel/receiver.api";
import type { IParcel, ParcelStatus } from "@/types";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const getStatusBadgeClass = (status: ParcelStatus) => {
    switch (status) {
        case "Requested": return "bg-yellow-100 text-yellow-800";
        case "Approved": return "bg-blue-100 text-blue-800";
        case "Dispatched": return "bg-purple-100 text-purple-800";
        case "In Transit": return "bg-indigo-100 text-indigo-800";
        case "Delivered": return "bg-green-100 text-green-800";
        case "Cancelled": return "bg-red-100 text-red-800";
        case "Returned": return "bg-orange-100 text-orange-800";
        case "Rescheduled": return "bg-pink-100 text-pink-800";
        default: return "bg-gray-100 text-gray-800";
    }
};

const ReceiverParcels = () => {
    const { data: parcelsResponse, isLoading } = useGetParcelQuery(undefined);
    const [confirmDelivery] = useDeliveredParcelMutation();

    const parcels: IParcel[] = parcelsResponse?.data || [];

    const handleConfirmDelivery = async (id: string) => {
        try {
            const updatedParcel = {
                currentStatus: "Delivered",
                statusLogs: [
                    {
                        status: "Delivered",
                        note: "Parcel has been delivered and confirmed by receiver",
                        updateAt: new Date().toISOString(),
                    },
                ],
            };

            const result = await Swal.fire({
                title: "Confirm Delivery?",
                text: "Are you sure this parcel has been delivered?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, mark as delivered",
            });

            if (!result.isConfirmed) return;
            await confirmDelivery({ id, parcelInfo: updatedParcel }).unwrap();

            Swal.fire("Success!", "Parcel has been marked as delivered.", "success");
        } catch (err: any) {
            const msg = err?.data?.message || "Failed to confirm delivery.";
            Swal.fire("Error!", msg, "error");
            toast.error(msg);
        }
    };

    if (isLoading) return <Loading />;
    // if (isError) return <p className="text-center mt-10 text-red-500">Failed to load parcels.</p>;

    return (
        <div className="container mx-auto p-6 my-16 bg-white dark:bg-neutral-900 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">My Parcels</h2>
            {parcels.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">No parcels found.</p>
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Weight (kg)</TableHead>
                                <TableHead>Fee (BDT)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Pickup</TableHead>
                                <TableHead>Delivery</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {parcels.map((parcel) => (
                                <TableRow key={parcel._id}>
                                    <TableCell>{parcel.type}</TableCell>
                                    <TableCell>{parcel.weight}</TableCell>
                                    <TableCell>{parcel.fee}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusBadgeClass(parcel.currentStatus)}`}>
                                            {parcel.currentStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell>{parcel.pickupAddress}</TableCell>
                                    <TableCell>{parcel.deliveryAddress}</TableCell>
                                    <TableCell>
                                        {parcel.currentStatus !== "Delivered" ? (
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="cursor-pointer"
                                                onClick={() => handleConfirmDelivery(parcel._id)}
                                                disabled={parcel.currentStatus !== "In Transit"}
                                            >
                                                Confirm Delivery
                                            </Button>
                                        ) : (
                                            <span className="text-muted-foreground text-sm">Delivered</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-10">
                        <h3 className="font-semibold text-lg mb-4">Delivery History</h3>
                        <div className="space-y-6">
                            {[...parcels]
                                .sort((a, b) => {
                                    const aLatest = new Date(a.statusLogs[a.statusLogs.length - 1]?.updateAt || 0).getTime();
                                    const bLatest = new Date(b.statusLogs[b.statusLogs.length - 1]?.updateAt || 0).getTime();
                                    return bLatest - aLatest;
                                })
                                .map((parcel) => (
                                    <div
                                        key={parcel._id}
                                        className="p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-md border border-gray-200 dark:border-neutral-700 hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{parcel.type}</h4>
                                            <span
                                                className={`px-3 py-1 text-sm font-medium rounded-full ${parcel.currentStatus === "Delivered"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                                    : parcel.currentStatus === "Cancelled"
                                                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                                                    }`}
                                            >
                                                {parcel.currentStatus}
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            {parcel.statusLogs.map((log, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="flex-shrink-0 w-3 h-3 mt-1.5 rounded-full bg-blue-500"></div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                            {log.status}
                                                            {log.updateAt && (
                                                                <span className="ml-2 text-xs text-gray-500">
                                                                    {format(new Date(log.updateAt), "PPP p")}
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="text-gray-700 dark:text-gray-300 text-sm">{log.note}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ReceiverParcels;