/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Package, MapPin, User, CalendarIcon, BadgeCheck, Phone, Mail } from "lucide-react";
import Loading from "@/components/Loading";
import { useIncomingParcelQuery, useRescheduleParcelMutation, useReturnParcelMutation } from "@/redux/features/parcel/receiver.api";
import clsx from "clsx";
import { Helmet } from "react-helmet-async";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const statusColor = (status: string) => {
    switch (status) {
        case "Approved":
            return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
        case "Requested":
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
        case "Rescheduled":
            return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
        case "In-transit":
            return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
        default:
            return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
};

const IncomingParcels = () => {
    const { data, isFetching } = useIncomingParcelQuery(undefined);
    const [rescheduleParcel] = useRescheduleParcelMutation();
    const [returnParcel] = useReturnParcelMutation();
    const [open, setOpen] = useState(false);
    const [openReturned, setOpenReturned] = useState(false);
    const [selectedParcel, setSelectedParcel] = useState<any>(null);
    const [returnedParcel, setReturnedParcel] = useState<any>(null);
    const [newDate, setNewDate] = useState<Date | undefined>(undefined);

    if (isFetching) return <Loading />;

    const handleReschedule = async () => {
        try {
            if (!selectedParcel || !newDate) return;

            const parcelInfo = {
                newDate: newDate.toISOString(),
                statusLogs: [{ status: "Rescheduled" }]
            };

            await rescheduleParcel({
                id: selectedParcel._id,
                parcelInfo
            }).unwrap();

            toast.success("Parcel rescheduled successfully!");
            setOpen(false);
            setNewDate(undefined);
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Failed to reschedule parcel");
        }
    };

    const handleReturned = async () => {
        try {
            if (!returnedParcel) return;

            const parcelInfo = {
                currentStatus: "Returned"
            };

            await returnParcel({
                id: returnedParcel._id,
                parcelInfo
            }).unwrap();

            toast.success("Parcel marked as Returned successfully!");
            setOpenReturned(false);
            setReturnedParcel(null);
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Failed to mark parcel as Returned");
        }
    };

    const parcels = data?.data || [];

    return (
        <div className="p-4 container mx-auto">
            <Helmet>
                <title>Incoming Parcels | Nirapod Parcel</title>
                <meta name="description" content="Welcome to Nirapod Parcel incoming parcels page" />
            </Helmet>

            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl text-center font-bold text-red-500 mb-10"
            >
                Incoming Parcels
            </motion.h1>

            {parcels.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">
                    No incoming parcels found.
                </p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {parcels.map((parcel: any, index: number) => (
                        <motion.div
                            key={parcel._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl flex flex-col p-4"
                        >
                            {/* Parcel Header */}
                            <div className="px-5 py-3 flex items-center justify-between border-b gap-5 border-gray-100 dark:border-neutral-800">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{parcel.trackingId}</p>
                                <span className={clsx(
                                    "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                                    statusColor(parcel.currentStatus)
                                )}>
                                    <BadgeCheck className="h-4 w-4" />
                                    {parcel.currentStatus}
                                </span>
                            </div>

                            {/* Parcel Details */}
                            <div className="p-5 flex-1 space-y-3">
                                {/* Sender Info */}
                                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-red-500" />
                                        <span className="font-medium">Sender: {parcel.sender?.name}</span>
                                    </div>
                                    {parcel.sender?.email && (
                                        <div className="flex items-center gap-2 pl-6">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <span>{parcel.sender.email}</span>
                                        </div>
                                    )}
                                    {parcel.sender?.phone && (
                                        <div className="flex items-center gap-2 pl-6">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <span>{parcel.sender.phone}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Receiver Info */}
                                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-blue-500" />
                                        <span className="font-medium">Receiver: {parcel.receiver?.name}</span>
                                    </div>
                                    {parcel.receiver?.email && (
                                        <div className="flex items-center gap-2 pl-6">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <span>{parcel.receiver.email}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Rider Info */}
                                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mt-2">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-green-500" />
                                        {parcel.rider ? (
                                            <span className="font-medium">
                                                Rider: {parcel.rider.name} ({parcel.rider.phone || "N/A"})
                                            </span>
                                        ) : (
                                            <span className="italic text-gray-500">Rider not assigned</span>
                                        )}
                                    </div>
                                </div>

                                {/* Parcel Info */}
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <Package className="h-4 w-4 text-yellow-500" />
                                    <span>{parcel.type} • {parcel.weight}kg</span>
                                </div>

                                {/* Full Address */}
                                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <MapPin className="h-4 w-4 text-purple-500 mt-1" />
                                    <div className="space-y-1">
                                        <p><strong>Pickup:</strong> {parcel.pickupAddress}</p>
                                        <p><strong>Delivery:</strong> {parcel.deliveryAddress}</p>
                                    </div>
                                </div>

                                {/* Delivery Date */}
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <CalendarIcon className="h-4 w-4 text-orange-500" />
                                    <span>Delivery: {new Date(parcel.deliveryDate).toLocaleDateString()}</span>
                                </div>

                                <div className="flex gap-3 mt-3">
                                    {/* Reschedule Button */}
                                    {parcel.currentStatus === "In Transit" && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex items-center gap-2 text-indigo-600 border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-900/20 cursor-pointer"
                                            onClick={() => {
                                                setSelectedParcel(parcel);
                                                setOpen(true);
                                            }}
                                        >
                                            <CalendarIcon className="h-4 w-4" />
                                            Reschedule
                                        </Button>
                                    )}

                                    {/* Returned Button */}
                                    {parcel.currentStatus === "In Transit" && (
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="flex items-center gap-2 cursor-pointer"
                                            onClick={() => {
                                                setReturnedParcel(parcel);
                                                setOpenReturned(true);
                                            }}
                                        >
                                            <Package className="h-4 w-4" />
                                            Returned
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Status Logs */}
                            <div className="px-5 pb-5 border-t border-gray-100 dark:border-neutral-800">
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Status Logs</h4>
                                <ul className="space-y-3 text-xs">
                                    {[...parcel.statusLogs].reverse().map((log: any, idx: number) => (
                                        <li key={idx} className="relative border-l-2 border-red-500 pl-3">
                                            <div className="absolute -left-[6px] top-1 w-3 h-3 rounded-full bg-red-500"></div>
                                            <p className="font-medium text-gray-800 dark:text-gray-100">{log.status} • {new Date(log.updateAt).toLocaleString()}</p>
                                            <p className="text-gray-600 dark:text-gray-400">{log.location}</p>
                                            {log.note && <p className="italic text-gray-500 dark:text-gray-400">{log.note}</p>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Reschedule Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Reschedule Parcel</DialogTitle>
                        <DialogDescription>Select a new delivery date for the parcel.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">New Delivery Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left">
                                    {newDate ? format(newDate, "PPP") : "Select date"}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={newDate}
                                    onSelect={setNewDate}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <DialogFooter className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" className="cursor-pointer" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-2 text-indigo-600 border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-900/20 cursor-pointer"
                            disabled={!newDate}
                            onClick={handleReschedule}
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={openReturned} onOpenChange={setOpenReturned}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Return Parcel</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to mark this parcel as <strong>Returned</strong>?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" className="cursor-pointer" onClick={() => setOpenReturned(false)}>Cancel</Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-2 text-indigo-600 border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-900/20 cursor-pointer"
                            onClick={handleReturned}
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default IncomingParcels;