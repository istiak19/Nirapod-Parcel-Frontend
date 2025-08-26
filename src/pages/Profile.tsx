import { useGetMeUserQuery } from "@/redux/features/user/user.api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, XCircle, Pencil, BadgeCheck } from "lucide-react";
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
        Admin: "bg-red-100 text-red-600",
        Sender: "bg-blue-100 text-blue-600",
        Receiver: "bg-green-100 text-green-600",
    };

    const roleClass = roleColors[user.role as keyof typeof roleColors] || "bg-gray-100 text-gray-600";

    return (
        <div className="flex justify-center px-4 py-16">
            <Helmet>
                <title>Profile | Nirapod Parcel</title>
                <meta name="description" content="Welcome to Nirapod Parcel profile page" />
            </Helmet>
            
            <Card className="w-full max-w-lg rounded-xl shadow-lg border border-border bg-card transition-transform relative">
                <div className="relative h-32 bg-gradient-to-r from-pink-500 to-red-400 rounded-t-xl">
                    <div className="absolute top-3 right-3">
                        <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="flex items-center gap-1 shadow-md"
                        >
                            <Link to={`/profile/${user?._id}`}> <Pencil className="w-4 h-4" />
                                Edit</Link>
                        </Button>
                    </div>

                    <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
                        <Avatar className="w-28 h-28 border-4 border-background shadow-lg">
                            <AvatarImage
                                src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                                alt={user?.name}
                            />
                            <AvatarFallback className="text-2xl font-bold">
                                {user?.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <CardHeader className="mt-16 flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold text-foreground">{user?.name}</h2>
                    <p
                        className={`mt-2 text-sm px-4 py-1 rounded-full font-medium shadow-sm ${roleClass || "bg-muted text-muted-foreground"
                            }`}
                    >
                        {user?.role}
                    </p>
                </CardHeader>

                <CardContent className="space-y-5 px-6 pb-8">
                    <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                        <div>
                            <p className="text-xs text-muted-foreground">Email</p>
                            <p className="text-foreground font-medium">{user?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-green-500 dark:text-green-400" />
                        <div>
                            <p className="text-xs text-muted-foreground">Phone</p>
                            <p className="text-foreground font-medium">{user?.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-pink-500 dark:text-pink-400" />
                        <div>
                            <p className="text-xs text-muted-foreground">Address</p>
                            <p className="text-foreground font-medium">{user?.address}</p>
                        </div>
                    </div>
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
                    <div className="flex items-center gap-3">
                        {user?.isVerified ? (
                            <MdOutlineVerifiedUser className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                        <div>
                            <p className="text-xs text-muted-foreground">Verification</p>
                            <p
                                className={`font-medium ${user?.isVerified ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                    }`}
                            >
                                {user?.isVerified ? "Verified Account" : "Not Verified"}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 border-t border-red-300 pt-4 text-center text-xs text-muted-foreground">
                        <p>Joined: {new Date(user?.createdAt).toLocaleDateString()}</p>
                        <p>Updated: {new Date(user?.updatedAt).toLocaleDateString()}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;