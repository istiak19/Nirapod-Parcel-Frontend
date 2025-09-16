/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useSetPasswordMutation } from "@/redux/features/auth/auth.api";
import { Eye, EyeOff } from "lucide-react";
import { useGetMeUserQuery } from "@/redux/features/user/user.api";

const passwordSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type PasswordFormValues = z.infer<typeof passwordSchema>;

const SetPassword = () => {
    const navigate = useNavigate();
    const { data } = useGetMeUserQuery(undefined);
    const user = data?.data;
    const [setPassword, { isLoading }] = useSetPasswordMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    const onSubmit = async (values: PasswordFormValues) => {
        try {
            const res = await setPassword({ password: values.password }).unwrap();
            if (res.success) {
                toast.success("Password set successfully!");
                if (user?.role === "Admin") navigate("/admin/profile");
                else if (user?.role === "Sender") navigate("/sender/profile");
                else navigate("/receiver/profile");
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to set password");
        }
    };

    return (
        <>
            <Helmet>
                <title>Set Password | Nirapod Parcel</title>
            </Helmet>

            <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
                <Card className="w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden transition-colors duration-300 bg-white dark:bg-gray-800">
                    <CardHeader className="bg-gradient-to-r from-red-400 via-pink-500 to-red-500 text-white">
                        <CardTitle className="text-center text-3xl font-extrabold py-6 tracking-wide">
                            Set Your Password
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Password Field */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-200 font-semibold">
                                                New Password
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter new password"
                                                        {...field}
                                                        className="pr-10 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-red-400 focus:border-red-400 dark:focus:ring-red-400 dark:focus:border-red-400 transition-colors duration-200"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm mt-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Confirm Password Field */}
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
                                                        placeholder="Confirm your password"
                                                        {...field}
                                                        className="pr-10 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-red-400 focus:border-red-400 dark:focus:ring-red-400 dark:focus:border-red-400 transition-colors duration-200"
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

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-red-500 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-500 text-white py-3 rounded-xl shadow-lg font-semibold transition duration-200 cursor-pointer"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Saving..." : "Set Password"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default SetPassword;