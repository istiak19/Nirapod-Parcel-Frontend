import { useState } from "react";
import { AlertCircle, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useTrackQuery } from "@/redux/features/parcel/parcel.api";
import Loading from "@/components/Loading";
import type { ITrack } from "@/types";
import { Helmet } from "react-helmet-async";

const TrackingPage = () => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [Tracking, setTracking] = useState<string | null>(null);
    const { data, isFetching, isError } = useTrackQuery(Tracking!, { skip: !Tracking, });

    const handleTrack = () => {
        if (trackingNumber.trim() === "") {
            alert("Please enter a tracking number");
            return;
        }
        setTracking(trackingNumber);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <Helmet>
                <title>Tracking | Nirapod Parcel</title>
                <meta name="description" content="Welcome to Nirapod Parcel tracking page" />
            </Helmet>
            
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-red-600 mb-6 text-center drop-shadow-sm"
            >
                Track Your Parcel
            </motion.h1>

            <p className="text-muted-foreground mb-8 text-center max-w-lg">
                Enter your tracking number below and check the live status of your parcel
                delivery.
            </p>
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex w-full max-w-2xl rounded-2xl shadow-lg border border-red-300 overflow-hidden"
            >
                <input
                    type="text"
                    placeholder="e.g. NPRC123456789BD"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1 px-5 py-3 outline-none"
                />
                <button
                    onClick={handleTrack}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 transition-all duration-200 cursor-pointer"
                >
                    <Search size={20} /> {isFetching ? "Tracking..." : "Track"}
                </button>
            </motion.div>
            <div className="mt-8 w-full max-w-3xl">
                {isFetching && <Loading />}
                {isError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <div>
                            <p className="font-semibold">Tracking Unavailable</p>
                            <p className="text-sm">
                                We couldn’t retrieve your parcel status right now. Please verify your
                                tracking number or try again later.
                            </p>
                        </div>
                    </div>
                )}
                {data?.success && (
                    <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-neutral-700 transition-colors">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Tracking Details</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Parcel ID: <span className="font-medium dark:text-muted-foreground">{data.data._id}</span>
                            </p>
                        </div>
                        <ul className="relative border-l-2 border-red-500 space-y-6 pl-6">
                            {[...data.data.statusLogs]?.reverse().map((log: ITrack, idx: number) => (
                                <li key={idx} className="relative">
                                    <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-2 border-red-500 bg-white dark:bg-neutral-900 flex items-center justify-center">
                                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                                    </span>
                                    <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-4 shadow-sm hover:shadow-2xl transition-all border-b-8">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{log.status}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(log.updateAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{log.location}</p>
                                        {log.note && (
                                            <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-1">{log.note}</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackingPage;