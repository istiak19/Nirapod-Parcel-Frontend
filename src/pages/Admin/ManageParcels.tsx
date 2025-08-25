/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Loading from "@/components/Loading";
import StatusUpdateModal from "@/components/modules/shared/statusUpdateModal";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    useGetAllParcelQuery,
    useParcelBlockMutation,
    useParcelStatusChangeMutation,
} from "@/redux/features/parcel/parcel.api";
import type { IParcel } from "@/types";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useGetMeUserQuery } from "@/redux/features/user/user.api";

const ManageParcels = () => {
    const { data } = useGetMeUserQuery(undefined);
    const { data: parcels, isLoading } = useGetAllParcelQuery(undefined);
    const [parcelBlock] = useParcelBlockMutation();
    const [updateParcelStatus] = useParcelStatusChangeMutation();
    const [open, setOpen] = useState(false);
    const [selectedParcel, setSelectedParcel] = useState<IParcel | null>(null);

    const userId = data?.data?._id;
    const handleToggleBlock = async (id: string, isBlocked: boolean) => {
        const action = isBlocked ? "Unblock" : "Block";

        try {
            const block = !isBlocked;
            const result = await Swal.fire({
                title: `Are you sure?`,
                text: `You want to ${action.toLowerCase()} this parcel.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: `Yes, ${action} it!`,
                cancelButtonText: "Cancel",
                confirmButtonColor: isBlocked ? "#3085d6" : "#d33",
            });

            if (!result.isConfirmed) return;
            await parcelBlock({ id, isBlocked: block }).unwrap();
            toast.success(`Parcel ${action}ed successfully!`);
        } catch (err: any) {
            toast.error(
                err?.data?.message || `Failed to ${action.toLowerCase()} parcel.`
            );
        }
    };

    const handleStatusSubmit = async (data: any) => {
        if (!selectedParcel) return;
        try {
            const updatedParcel = {
                currentStatus: data.status,
                statusLogs: [
                    {
                        status: data.status,
                        location: data.location,
                        note: data.note,
                        updatedAt: data.updatedAt,
                        updateBy: userId
                    },
                ],
            };
            await updateParcelStatus({ id: selectedParcel._id, parcelInfo: updatedParcel }).unwrap();
            toast.success(`Parcel status updated to "${data.status}"`);
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update parcel status.");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="container mx-auto p-8 my-16 bg-white dark:bg-neutral-900 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-red-500 mb-8 text-center">
                Manage Parcels
            </h2>

            {parcels?.data?.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">No parcels found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <Table className="border border-gray-200 dark:border-neutral-700 rounded-2xl">
                        <TableHeader className="bg-gray-100 dark:bg-neutral-800">
                            <TableRow className="*:text-center">
                                <TableHead>Type</TableHead>
                                <TableHead>Weight</TableHead>
                                <TableHead>Fee</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Blocked</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {parcels?.data?.map((parcel: IParcel, idx: number) => (
                                <TableRow
                                    key={parcel._id}
                                    className={`${idx % 2 === 0
                                        ? "bg-white dark:bg-neutral-900"
                                        : "bg-gray-50 dark:bg-neutral-800"
                                        } hover:bg-gray-100 dark:hover:bg-neutral-700 transition *:text-center`}
                                >
                                    <TableCell className="font-medium">{parcel.type}</TableCell>
                                    <TableCell>{parcel.weight} kg</TableCell>
                                    <TableCell>{parcel.fee} BDT</TableCell>
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
                                    <TableCell>
                                        {parcel.isBlocked ? (
                                            <span className="text-red-600 font-semibold">Blocked</span>
                                        ) : (
                                            <span className="text-green-600 font-semibold">Active</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="flex gap-2 justify-center">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setSelectedParcel(parcel);
                                                setOpen(true);
                                            }}
                                            disabled={
                                                parcel.currentStatus === "Delivered" ||
                                                parcel.currentStatus === "Cancelled"
                                            }
                                        >
                                            Update Status
                                        </Button>

                                        <Button
                                            variant={parcel.isBlocked ? "outline" : "destructive"}
                                            size="sm"
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleToggleBlock(parcel._id, parcel.isBlocked)
                                            }
                                        >
                                            {parcel.isBlocked ? "Unblock" : "Block"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            <StatusUpdateModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={(data) => handleStatusSubmit(data)}
                currentStatus={selectedParcel?.currentStatus || "Requested"}
            />
        </div>
    );
};

export default ManageParcels;