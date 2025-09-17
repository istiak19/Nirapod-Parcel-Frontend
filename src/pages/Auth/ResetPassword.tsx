/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";

const schema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

type FormValues = z.infer<typeof schema>;

const ResetPassword = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: FormValues) => {
        try {
            const res = await resetPassword({
                id,
                newPassword: values.newPassword,
            }).unwrap();

            if (res.success) {
                toast.success("Password reset successfully!");
                navigate("/login");
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to reset password");
        }
    };

    return (
        <>
            <Helmet>
                <title>Reset Password | Nirapod Parcel</title>
            </Helmet>

            <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
                <Card className="w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden transition-colors duration-300 bg-white dark:bg-gray-800">
                    <CardHeader className="bg-gradient-to-r from-red-400 via-red-500 to-red-500 text-white">
                        <CardTitle className="text-center text-3xl font-bold py-6 tracking-wide">
                            Reset Password
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                                        className="pr-10 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-red-400 focus:border-red-400 transition-colors"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowNew(!showNew)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"
                                                    >
                                                        {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm mt-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Confirm Password */}
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showConfirm ? "text" : "password"}
                                                        placeholder="Confirm new password"
                                                        {...field}
                                                        className="pr-10 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-red-400 focus:border-red-400 transition-colors"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirm(!showConfirm)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"
                                                    >
                                                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm mt-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl shadow-lg font-semibold transition duration-200 cursor-pointer"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Updating..." : "Reset Password"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ResetPassword;