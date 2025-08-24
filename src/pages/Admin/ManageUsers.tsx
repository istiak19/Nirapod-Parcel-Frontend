/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllUserQuery, useUpdateUserMutation } from "@/redux/features/user/user.api";
import type { IUser } from "@/types";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const { data: users, isLoading } = useGetAllUserQuery(undefined);
    const [userStatus] = useUpdateUserMutation();

    const handleToggleStatus = async (id: string, isBlocked: boolean) => {
        const newStatus = isBlocked ? "Active" : "Blocked";
        try {
            const result = await Swal.fire({
                title: `Are you sure?`,
                text: `You want to ${newStatus.toLowerCase()} this user.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: `Yes, ${newStatus} it!`,
                cancelButtonText: "Cancel",
                confirmButtonColor: isBlocked ? "#3085d6" : "#d33",
            });

            if (!result.isConfirmed) return;
            await userStatus({ id, isBlocked: newStatus }).unwrap();
            toast.success(`User ${newStatus} successfully!`);
        } catch (err: any) {
            console.log(err)
            toast.error(err?.data?.message || `Failed to ${newStatus.toLowerCase()} user.`);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="container mx-auto p-8 my-16 bg-white dark:bg-neutral-900 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Manage Users</h2>

            {users?.data?.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <Table className="border border-gray-200 dark:border-neutral-700 rounded-2xl">
                        <TableHeader className="bg-gray-100 dark:bg-neutral-800">
                            <TableRow className="*:text-center">
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Verified</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users?.data?.map((user: IUser, idx: number) => {
                                const isBlocked = user.isBlocked === "Blocked";
                                return (
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
                                        <TableCell className="capitalize">{user.role}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${user.isVerified
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {user.isVerified ? "Yes" : "No"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${user.isBlocked === "Blocked"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-green-100 text-green-800"
                                                    }`}
                                            >
                                                {user.isBlocked}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant={isBlocked ? "outline" : "destructive"}
                                                size="sm"
                                                onClick={() => handleToggleStatus(user._id as string, isBlocked)}
                                            >
                                                {isBlocked ? "Unblock" : "Block"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;