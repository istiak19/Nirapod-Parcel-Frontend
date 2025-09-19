/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUpdatedUserMutation } from "@/redux/features/auth/auth.api";
import { useGetAllUserQuery } from "@/redux/features/user/user.api";
import type { IUser } from "@/types";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageRidersList = () => {
    const { data: users, isLoading } = useGetAllUserQuery(undefined);
    const [updateUser] = useUpdatedUserMutation();

    const handleApproveReject = async (id: string, action: "Approve" | "Reject") => {
        const newStatus = action === "Approve" ? "Active" : "Inactive";

        try {
            const result = await Swal.fire({
                title: `${action} Rider?`,
                text: `You want to ${action.toLowerCase()} this rider.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: `Yes, ${action} it!`,
                cancelButtonText: "Cancel",
                confirmButtonColor: action === "Approve" ? "#3085d6" : "#d33",
            });

            if (!result.isConfirmed) return;
            const userInfo = {
                isStatus: newStatus
            };

            await updateUser({ id, userInfo }).unwrap();
            toast.success(`Rider ${action}d successfully!`);
        } catch (err: any) {
            toast.error(err?.data?.message || `Failed to ${action.toLowerCase()} rider.`);
        }
    };

    if (isLoading) return <Loading />;

    const riders = users?.data?.filter((user: IUser) => user.role === "Rider");

    return (
        <div className="container mx-auto p-8 my-16 bg-white dark:bg-neutral-900 rounded-3xl shadow-lg">
            <Helmet>
                <title>Manage Riders | Nirapod Parcel</title>
                <meta name="description" content="Welcome to Nirapod Parcel manage riders page" />
            </Helmet>

            <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Manage Riders List</h2>

            {riders?.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">No riders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <Table className="border border-gray-200 dark:border-neutral-700 rounded-2xl">
                        <TableHeader className="bg-gray-100 dark:bg-neutral-800">
                            <TableRow className="*:text-center">
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {riders?.map((user: IUser, idx: number) => (
                                <TableRow
                                    key={user._id}
                                    className={`${idx % 2 === 0
                                        ? "bg-white dark:bg-neutral-900"
                                        : "bg-gray-50 dark:bg-neutral-800"
                                        } hover:bg-gray-100 dark:hover:bg-neutral-700 transition *:text-center`}
                                >
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone || "N/A"}</TableCell>
                                    <TableCell className="max-w-xs truncate">{user.address || "N/A"}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${user.isStatus === "Active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {user.isStatus || "Inactive"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="space-x-2">
                                        {(user.phone || user.address) && (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="cursor-pointer"
                                                    onClick={() => handleApproveReject(user._id as string, "Approve")}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="cursor-pointer"
                                                    onClick={() => handleApproveReject(user._id as string, "Reject")}
                                                >
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default ManageRidersList;