/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetMeParcelQuery, useParcelCancelMutation } from "@/redux/features/parcel/sender.api";
import type { IParcel } from "@/types";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const SenderParcels = () => {
    const { data: response, isLoading } = useGetMeParcelQuery(undefined);
    const [cancelParcel] = useParcelCancelMutation();
    const parcels: IParcel[] = Array.isArray(response) ? response : response?.data ?? [];

    const handleCancel = async (id: string) => {
        try {
            const updatedParcel = {
                currentStatus: "Cancelled",
                statusLogs: [
                    {
                        status: "Cancelled",
                        note: "Parcel has been cancelled by sender.",
                        updateAt: new Date().toISOString(),
                    },
                ],
            };

            const result = await Swal.fire({
                title: "Are you sure?",
                text: "This parcel will be cancelled!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, cancel it!",
            });

            if (!result.isConfirmed) return;
            await cancelParcel({ id, parcelInfo: updatedParcel }).unwrap();
            Swal.fire("Cancelled!", "Your parcel has been cancelled.", "success");
        } catch (err: any) {
            const msg = err?.data?.message || "Failed to cancel parcel.";
            Swal.fire("Error!", msg, "error");
            toast.error(msg);
        }
    };

    if (isLoading) return <Loading />;
    // if (isError) return <p className="text-center mt-10 text-red-500">Failed to load parcels.</p>;

    return (
        <div className="container mx-auto p-8 my-16 bg-white dark:bg-neutral-900 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">My Parcels</h2>

            {parcels.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">No parcels found.</p>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <Table className="border border-gray-200 dark:border-neutral-700 rounded-2xl">
                            <TableHeader className="bg-gray-100 dark:bg-neutral-800">
                                <TableRow className="*:text-center">
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
                                {parcels.map((parcel, idx) => {
                                    const cannotCancel =
                                        parcel.currentStatus === "Dispatched" ||
                                        parcel.currentStatus === "In Transit" ||
                                        parcel.currentStatus === "Delivered" ||
                                        parcel.currentStatus === "Cancelled";

                                    return (
                                        <TableRow
                                            key={parcel._id}
                                            className={`${idx % 2 === 0 ? "bg-white dark:bg-neutral-900" : "bg-gray-50 dark:bg-neutral-800"
                                                } hover:bg-gray-100 dark:hover:bg-neutral-700 transition *:text-center`}
                                        >
                                            <TableCell className="font-medium">{parcel.type}</TableCell>
                                            <TableCell>{parcel.weight}</TableCell>
                                            <TableCell>{parcel.fee}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${parcel.currentStatus === "Delivered"
                                                        ? "bg-green-100 text-green-800"
                                                        : parcel.currentStatus === "Cancelled"
                                                            ? "bg-red-100 text-red-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                >
                                                    {parcel.currentStatus}
                                                </span>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">{parcel.pickupAddress}</TableCell>
                                            <TableCell className="max-w-xs truncate">{parcel.deliveryAddress}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="cursor-pointer"
                                                    disabled={cannotCancel}
                                                    onClick={() => handleCancel(parcel._id)}
                                                >
                                                    Cancel
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-10">
                        <h3 className="font-semibold text-lg mb-4">Delivery History</h3>
                        <div className="space-y-6">
                            {[...parcels]
                                .sort((a, b) => {
                                    const aLogs = a.statusLogs;
                                    const bLogs = b.statusLogs;
                                    const aLatest = aLogs.length
                                        ? new Date(aLogs[aLogs.length - 1]?.updateAt ?? 0).getTime()
                                        : 0;
                                    const bLatest = bLogs.length
                                        ? new Date(bLogs[bLogs.length - 1]?.updateAt ?? 0).getTime()
                                        : 0;
                                    return bLatest - aLatest;
                                })
                                .map((parcel) => (
                                    <div
                                        key={parcel._id}
                                        className="p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-md border border-gray-200 dark:border-neutral-700 hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                {parcel.type}
                                            </h4>
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
                                            {parcel.statusLogs
                                                .slice()
                                                .sort(
                                                    (a, b) =>
                                                        new Date(b.updateAt ?? 0).getTime() -
                                                        new Date(a.updateAt ?? 0).getTime()
                                                )
                                                .map((log, idx) => (
                                                    <div key={idx} className="flex items-start gap-3">
                                                        <div className="flex-shrink-0 w-3 h-3 mt-1.5 rounded-full bg-blue-500"></div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                                {log.status}
                                                                {log.updateAt && (
                                                                    <span className="ml-2 text-xs text-gray-500">
                                                                        {format(
                                                                            new Date(log.updateAt),
                                                                            "PPP p"
                                                                        )}
                                                                    </span>
                                                                )}
                                                            </p>
                                                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                                                {log.note}
                                                            </p>
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

export default SenderParcels;