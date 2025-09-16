/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Eye, EyeOff } from "lucide-react";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";
import { useGetMeUserQuery } from "@/redux/features/user/user.api";

const passwordSchema = z
    .object({
        oldPassword: z.string().min(6, "Old password is required"),
        newPassword: z
            .string()
            .min(6, "New password must be at least 6 characters"),
        confirmNewPassword: z.string().min(6, "Confirm new password"),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
    });

type PasswordFormValues = z.infer<typeof passwordSchema>;

const ChangePassword = () => {
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const navigate = useNavigate();
    const { data } = useGetMeUserQuery(undefined);
    const user = data?.data;
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const onSubmit = async (values: PasswordFormValues) => {
        try {
            const res = await changePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword }).unwrap();

            if (res.success) {
                toast.success("Password changed successfully!");
                if (user?.role === "Admin") navigate("/admin/profile");
                else if (user?.role === "Sender") navigate("/sender/profile");
                else navigate("/receiver/profile");
                form.reset();
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to change password");
        }
    };

    return (
        <>
            <Helmet>
                <title>Change Password | Nirapod Parcel</title>
            </Helmet>

            <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
                <Card className="w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden bg-white dark:bg-gray-800">
                    <CardHeader className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white">
                        <CardTitle className="text-center text-3xl font-bold py-6 tracking-wide">
                            Change Password
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                {/* Old Password */}
                                <FormField
                                    control={form.control}
                                    name="oldPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Old Password
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showOld ? "text" : "password"}
                                                        placeholder="Enter old password"
                                                        {...field}
                                                        className="pr-10 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 transition-colors"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowOld(!showOld)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                                    >
                                                        {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm mt-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* New Password */}
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-200 font-semibold">
                                                New Password
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showNew ? "text" : "password"}
                                                        placeholder="Enter new password"
                                                        {...field}
                                                        className="pr-10 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 transition-colors"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowNew(!showNew)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                                    >
                                                        {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm mt-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Confirm New Password */}
                                <FormField
                                    control={form.control}
                                    name="confirmNewPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Confirm New Password
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showConfirm ? "text" : "password"}
                                                        placeholder="Confirm new password"
                                                        {...field}
                                                        className="pr-10 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 transition-colors"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirm(!showConfirm)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                                    >
                                                        {showConfirm ? (
                                                            <EyeOff size={20} />
                                                        ) : (
                                                            <Eye size={20} />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm mt-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl shadow-lg font-semibold transition duration-200 cursor-pointer"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Updating..." : "Change Password"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ChangePassword;