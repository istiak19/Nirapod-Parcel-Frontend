/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMeUserQuery } from "@/redux/features/user/user.api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, XCircle, Pencil, BadgeCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import { Link } from "react-router";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const Profile = () => {
    const { data, isFetching } = useGetMeUserQuery(undefined);

    if (isFetching) return <Loading />;
    if (!data) return <p className="text-center text-red-500 italic">No profile information available.</p>;

    const user = data?.data;

    const roleColors: Record<"Admin" | "Sender" | "Receiver", string> = {
        Admin: "from-red-500 to-red-600 text-white",
        Sender: "from-blue-500 to-blue-600 text-white",
        Receiver: "from-green-500 to-green-600 text-white",
    };

    const roleClass = roleColors[user.role as keyof typeof roleColors] || "from-gray-400 to-gray-500 text-white";

    // Google login check
    const isGoogleLogin = user.auths?.some((auth: any) => auth.provider === "google");
    const hasCredentials = user.auths?.some((auth: any) => auth.provider === "credentials");

    return (
        <div className="flex justify-center px-4 py-16">
            <Helmet>
                <title>Profile | Nirapod Parcel</title>
                <meta name="description" content="Welcome to Nirapod Parcel profile page" />
            </Helmet>

            <Card className="w-full max-w-3xl rounded-2xl shadow-xl border border-border bg-card relative overflow-hidden">
                {/* Top gradient cover */}
                <div className="relative h-36 bg-gradient-to-r from-pink-500 via-red-500 to-red-400 rounded-t-2xl">
                    {/* Edit button */}
                    <div className="absolute top-3 right-3">
                        <Button asChild variant="secondary" size="sm" className="shadow-md">
                            <Link to={`/profile/${user?._id}`}>
                                <span className="flex items-center gap-1">
                                    <Pencil className="w-4 h-4" />
                                    Edit
                                </span>
                            </Link>
                        </Button>
                        {hasCredentials && (
                            <Button asChild variant="secondary" size="sm" className="shadow-md ml-2">
                                <Link to="/change-password">
                                    <span className="flex items-center gap-1">
                                        <Lock className="w-4 h-4" />
                                        Change Password
                                    </span>
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Avatar */}
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                        <Avatar className="w-32 h-32 border-4 border-background shadow-2xl rounded-full ring-4 ring-white dark:ring-gray-900 hover:scale-105 hover:ring-pink-400 transition-transform duration-300">
                            {user?.picture ? (
                                <AvatarImage src={user.picture} alt={user.name} />
                            ) : (
                                <AvatarFallback className="text-3xl font-bold">{user.name.charAt(0)}</AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                </div>

                <CardHeader className="mt-20 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-extrabold text-foreground">{user?.name}</h2>
                    <p className={`mt-3 text-sm px-5 py-1.5 rounded-full font-medium shadow-sm bg-gradient-to-r ${roleClass}`}>
                        {user?.role}
                    </p>
                </CardHeader>

                <CardContent className="space-y-6 px-8 pb-10">
                    {/* Google login notice */}
                    {isGoogleLogin && !user?.password && !hasCredentials && (
                        <div className="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-sm font-medium text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-200 shadow-sm">
                            <p className="text-center">
                                You logged in via <span className="font-semibold">Google</span>.{" "}
                                Please{" "}
                                <Link
                                    to="/set-password"
                                    className="underline font-semibold text-yellow-900 dark:text-yellow-100 hover:text-yellow-700 dark:hover:text-yellow-50 transition"
                                >
                                    set your password
                                </Link>{" "}
                                to secure your account.
                            </p>
                        </div>
                    )}

                    {/* Info rows */}
                    <div className="grid gap-4">
                        <InfoRow icon={<Mail className="h-5 w-5 text-indigo-500" />} label="Email" value={user?.email} />
                        <InfoRow icon={<Phone className="h-5 w-5 text-green-500" />} label="Phone" value={user?.phone} />
                        <InfoRow icon={<MapPin className="h-5 w-5 text-pink-500" />} label="Address" value={user?.address} />
                    </div>

                    {/* Account Status */}
                    <div className="flex items-center gap-3">
                        <BadgeCheck
                            className={`h-6 w-6 ${user?.isBlocked === "Active"
                                ? "text-green-500"
                                : user?.isBlocked === "Inactive"
                                    ? "text-yellow-500"
                                    : "text-red-500"
                                }`}
                        />
                        <div>
                            <p className="text-xs font-medium text-muted-foreground">Account Status</p>
                            <span
                                className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${user?.isBlocked === "Active"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                    : user?.isBlocked === "Inactive"
                                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                                        : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                                    }`}
                            >
                                {user?.isBlocked}
                            </span>
                        </div>
                    </div>

                    {/* Verification */}
                    <div className="flex items-center gap-3">
                        {user?.isVerified ? (
                            <MdOutlineVerifiedUser className="h-6 w-6 text-green-600 dark:text-green-400" />
                        ) : (
                            <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        )}
                        <div>
                            <p className="text-xs text-muted-foreground">Verification</p>
                            <p className={`font-medium ${user?.isVerified ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                                {user?.isVerified ? "Verified Account" : "Not Verified"}
                            </p>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="mt-6 border-t pt-4 text-center text-xs italic text-muted-foreground">
                        <p>Joined: {new Date(user?.createdAt).toLocaleDateString()}</p>
                        <p>Last Updated: {new Date(user?.updatedAt).toLocaleDateString()}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Reusable info row
const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors">
        {icon}
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-foreground font-medium">{value}</p>
        </div>
    </div>
);

export default Profile;