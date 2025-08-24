/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Package, MapPin, User, Calendar, BadgeCheck, Phone, Mail } from "lucide-react";
import Loading from "@/components/Loading";
import { useHistoryParcelQuery } from "@/redux/features/parcel/receiver.api";

const DeliveryHistory = () => {
    const { data, isFetching } = useHistoryParcelQuery(undefined);

    if (isFetching) return <Loading />;
    // if (isError) return <p className="text-red-500 text-center">Failed to load delivery history.</p>;

    const parcels = data?.data || [];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl text-center font-bold text-red-500 mb-12"
            >
                Delivery History
            </motion.h1>

            {parcels.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">
                    No delivery history found.
                </p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {parcels.map((parcel: any, index: number) => (
                        <motion.div
                            key={parcel._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-neutral-800">
                                <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg md:text-xl">
                                    {parcel.trackingId}
                                </p>
                                <span
                                    className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                                    <BadgeCheck className="h-5 w-5" />
                                    {parcel.currentStatus}
                                </span>
                            </div>
                            <div className="p-6 flex-1 space-y-4">
                                <div className="space-y-1 text-sm md:text-base text-gray-600 dark:text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-red-500" />
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
                                <div className="space-y-1 text-sm md:text-base text-gray-600 dark:text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-blue-500" />
                                        <span className="font-medium">Receiver: {parcel.receiver?.name}</span>
                                    </div>
                                    {parcel.receiver?.email && (
                                        <div className="flex items-center gap-2 pl-6">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <span>{parcel.receiver.email}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
                                    <Package className="h-5 w-5 text-yellow-500" />
                                    <span>{parcel.type} • {parcel.weight}kg • Fee: {parcel.fee}৳</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
                                    <MapPin className="h-5 w-5 text-purple-500 mt-1" />
                                    <div className="space-y-1">
                                        <p><strong>Pickup:</strong> {parcel.pickupAddress}</p>
                                        <p><strong>Delivery:</strong> {parcel.deliveryAddress}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
                                    <Calendar className="h-5 w-5 text-orange-500" />
                                    <span>Delivery: {new Date(parcel.deliveryDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="px-6 pb-6 border-t border-gray-100 dark:border-neutral-800">
                                <h4 className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-200 mb-3">
                                    Status Logs
                                </h4>
                                <ul className="space-y-3 text-xs md:text-sm">
                                    {[...parcel.statusLogs].reverse().map((log: any, idx: number) => (
                                        <li key={idx} className="relative border-l-2 border-red-500 pl-4">
                                            <div className="absolute -left-[8px] top-1 w-3 h-3 rounded-full bg-red-500"></div>
                                            <p className="font-medium text-gray-800 dark:text-gray-100">
                                                {log.status} • {new Date(log.updateAt).toLocaleString()}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">{log.location}</p>
                                            {log.note && (
                                                <p className="italic text-gray-500 dark:text-gray-400">{log.note}</p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeliveryHistory;