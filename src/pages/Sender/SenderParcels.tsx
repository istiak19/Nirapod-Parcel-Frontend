/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading";
import StatusFilter from "@/components/modules/statusFilter";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetMeParcelQuery, useParcelCancelMutation } from "@/redux/features/parcel/sender.api";
import type { IParcel } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Search from "@/components/Search";

const SenderParcels = () => {
    const [searchParams] = useSearchParams();
    const currentStatus = searchParams.get("currentStatus") || undefined;
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState<number | undefined>(10);
    const [search, setSearch] = useState("");
    const { data, isLoading } = useGetMeParcelQuery({ currentStatus, page: currentPage, limit, search });
    const [cancelParcel] = useParcelCancelMutation();
    const parcels: IParcel[] = data?.data?.parcel ?? [];
    const totalPage = data?.meta?.totalPage || 1;

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

    const handleClearLimit = () => {
        setLimit(10);
    };

    if (isLoading) return <Loading />;
    // if (isError) return <p className="text-center mt-10 text-red-500">Failed to load parcels.</p>;

    return (
        <div className="container mx-auto p-8 my-16 bg-white dark:bg-neutral-900 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">My Parcels</h2>

            <div className="mb-6 w-full">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">

                    <div className="w-full md:w-1/2 lg:w-1/3">
                        <StatusFilter />
                    </div>

                    <div className="w-full md:w-1/3">
                        <Search
                            onSearch={(value) => {
                                setSearch(value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <div className="w-full md:w-auto flex flex-col md:items-end">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-end w-full gap-4 mb-3">
                            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                                Results per page
                            </h1>

                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleClearLimit}
                                className="cursor-pointer"
                            >
                                Reset to Default
                            </Button>
                        </div>

                        <Select value={limit ? String(limit) : undefined} onValueChange={(value) => setLimit(Number(value))}>
                            <SelectTrigger className="w-full md:w-40 cursor-pointer">
                                <SelectValue placeholder="Select limit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Limit</SelectLabel>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

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

                        <div className="flex justify-center mt-5">
                            <div>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                                onClick={() => setCurrentPage((prv) => prv - 1)} />
                                        </PaginationItem>
                                        {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                                            (page) => (
                                                <PaginationItem
                                                    className="cursor-pointer"
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    <PaginationLink isActive={currentPage === page}>
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        )}
                                        <PaginationItem>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                                onClick={() => setCurrentPage((prv) => prv + 1)} />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>

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