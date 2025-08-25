/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Package, MapPin, User, Calendar, BadgeCheck, Phone, Mail } from "lucide-react";
import Loading from "@/components/Loading";
import { useIncomingParcelQuery } from "@/redux/features/parcel/receiver.api";
import clsx from "clsx";

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
    console.log(data)

    if (isFetching) return <Loading />;
    // if (isError)
    //     return <p className="text-red-500 text-center">Failed to load parcels.</p>;

    const parcels = data?.data || [];
    return (
        <div className="p-4 container mx-auto">
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
                            <div className="px-5 py-3 flex items-center justify-between border-b gap-5 border-gray-100 dark:border-neutral-800">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    {parcel.trackingId}
                                </p>
                                <span
                                    className={clsx(
                                        "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                                        statusColor(parcel.currentStatus)
                                    )}
                                >
                                    <BadgeCheck className="h-4 w-4" />
                                    {parcel.currentStatus}
                                </span>
                            </div>

                            <div className="p-5 flex-1 space-y-3">
                                {/* Sender Info */}
                                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-red-500" />
                                        <span className="font-medium">
                                            Sender: {parcel.sender?.name}
                                        </span>
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
                                        <span className="font-medium">
                                            Receiver: {parcel.receiver?.name}
                                        </span>
                                    </div>
                                    {parcel.receiver?.email && (
                                        <div className="flex items-center gap-2 pl-6">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <span>{parcel.receiver.email}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Parcel Info */}
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <Package className="h-4 w-4 text-yellow-500" />
                                    <span>
                                        {parcel.type} • {parcel.weight}kg
                                    </span>
                                </div>

                                {/* Full Address */}
                                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <MapPin className="h-4 w-4 text-purple-500 mt-1" />
                                    <div className="space-y-1">
                                        <p>
                                            <strong>Pickup:</strong>{" "}
                                            {parcel.pickupAddress}
                                        </p>
                                        <p>
                                            <strong>Delivery:</strong>{" "}
                                            {parcel.deliveryAddress}
                                        </p>
                                    </div>
                                </div>

                                {/* Delivery Date */}
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <Calendar className="h-4 w-4 text-orange-500" />
                                    <span>
                                        Delivery:{" "}
                                        {new Date(parcel.deliveryDate).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Status Logs */}
                            <div className="px-5 pb-5 border-t border-gray-100 dark:border-neutral-800">
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                                    Status Logs
                                </h4>
                                <ul className="space-y-3 text-xs">
                                    {[...parcel.statusLogs].reverse().map(
                                        (log: any, idx: number) => (
                                            <li
                                                key={idx}
                                                className="relative border-l-2 border-red-500 pl-3"
                                            >
                                                <div className="absolute -left-[6px] top-1 w-3 h-3 rounded-full bg-red-500"></div>
                                                <p className="font-medium text-gray-800 dark:text-gray-100">
                                                    {log.status} •{" "}
                                                    {new Date(log.updateAt).toLocaleString()}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    {log.location}
                                                </p>
                                                {log.note && (
                                                    <p className="italic text-gray-500 dark:text-gray-400">
                                                        {log.note}
                                                    </p>
                                                )}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IncomingParcels;