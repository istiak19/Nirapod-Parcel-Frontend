/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";
import { useEffect, useState } from "react";
import { Dot } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useSentOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ParcelRegister from "@/assets/images/contact.jpg";
import Logo from "@/assets/icons/Logo";

const Verify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state;
    const [sendOtp] = useSentOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    useEffect(() => {
        if (!email) navigate("/");
    }, [email, navigate]);

    const FormSchema = z.object({
        otp: z.string().min(6, { message: "Your one-time password must be 6 characters." }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { otp: "" },
    });

    const [confirm, setConfirm] = useState(false);
    const [timer, setTimer] = useState(120);

    useEffect(() => {
        if (!email || !confirm) return;
        const timerId = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timerId);
    }, [email, confirm]);

    const handleSentOtp = async () => {
        const toastId = toast.loading("Sending OTP...");
        try {
            const res = await sendOtp({ email }).unwrap();
            if (res.success) {
                toast.dismiss(toastId);
                toast.success(res.message || "OTP sent successfully!");
                setConfirm(true);
                setTimer(120);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || "Something went wrong while sending the OTP.");
        }
    };

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const toastId = toast.loading("Verifying OTP...");
        const userInfo = { email, otp: data.otp };
        try {
            const res = await verifyOtp(userInfo).unwrap();
            if (res.success) {
                toast.dismiss(toastId);
                toast.success(res.message || "OTP verified successfully!");
                navigate("/");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || "Something went wrong while verifying the OTP.");
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Image Section */}
            <div className="relative hidden lg:block w-1/2">
                <img
                    src={ParcelRegister}
                    alt="Register background"
                    className="absolute inset-0 h-full w-full object-cover brightness-95 dark:brightness-75"
                />
                <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute bottom-40 left-10 text-white max-w-md space-y-3"
                >
                    <div className="mb-10 flex justify-center md:justify-start">
                        <Link
                            to="/"
                            className="flex items-center gap-3 text-lg font-semibold hover:opacity-90 transition-opacity"
                            aria-label="Go to homepage"
                        >
                            <Logo className="w-12 h-12 text-red-500" />
                            <span className="sr-only">Go to homepage</span>
                            <p className="text-xl font-bold text-red-500">Nirapod Parcel</p>
                        </Link>
                    </div>
                    <h2 className="text-3xl font-bold">Join Nirapod Parcel</h2>
                    <p className="text-lg opacity-90">
                        Fast, secure, and reliable delivery services — built for you.
                    </p>
                </motion.div>
            </div>

            {/* OTP Verification Form */}
            <div className="flex justify-center items-center w-full lg:w-1/2 bg-muted px-4">
                {confirm ? (
                    <Card className="w-full max-w-md shadow-lg rounded-2xl p-6 border border-red-300">
                        <CardHeader className="text-center space-y-1">
                            <CardTitle className="text-2xl font-semibold">Email Verification</CardTitle>
                            <CardDescription className="text-muted-foreground text-sm">
                                Please enter the 6-digit code sent to{" "}
                                <span className="font-medium">{email}</span>
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-6">
                                    <FormField
                                        control={form.control}
                                        name="otp"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="sr-only">One-Time Password</FormLabel>
                                                <FormControl>
                                                    <InputOTP maxLength={6} {...field} className="mx-auto">
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={0} />
                                                            <InputOTPSlot index={1} />
                                                            <InputOTPSlot index={2} />
                                                            <Dot />
                                                            <InputOTPSlot index={3} />
                                                            <InputOTPSlot index={4} />
                                                            <InputOTPSlot index={5} />
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                </FormControl>
                                                <FormDescription className="text-center mt-2 text-sm text-muted-foreground">
                                                    {timer > 0 ? (
                                                        <>You can resend the code in <strong>{timer}s</strong></>
                                                    ) : (
                                                        <>Didn’t get the code? <button type="button" onClick={handleSentOtp} className="text-primary underline cursor-pointer">Resend</button></>
                                                    )}
                                                </FormDescription>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="px-12 cursor-pointer bg-red-500 hover:bg-red-600 text-foreground">Verify</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="w-full max-w-md shadow-lg rounded-2xl p-6 border border-red-300">
                        <CardHeader className="text-center space-y-1">
                            <CardTitle className="text-2xl font-semibold">Verify Your Email</CardTitle>
                            <CardDescription className="text-muted-foreground text-sm">
                                We’ve sent a 6-digit verification code to{" "}
                                <span className="font-medium">{email}</span>. Please enter it below to continue.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Button onClick={handleSentOtp} className="px-12 cursor-pointer bg-red-500 hover:bg-red-600 text-foreground">Send Code</Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Verify;