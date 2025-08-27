/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import config from "@/config";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import Password from "@/components/ui/password";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
const loginFormSchema = z
    .object({
        email: z.email({ message: "Enter a valid email address" }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters",
        }).regex(passwordRegex, {
            message: "Password must include uppercase, lowercase, number, and special character",
        })
    });

type RegisterFormValues = z.infer<typeof loginFormSchema>;

const LoginForm = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        const { email, password } = data;
        const userInfo = { email, password };
        try {
            const result = await login(userInfo).unwrap();
            if (result.success) {
                toast.success("Logged in successfully!")
                navigate("/")
            };
        } catch (error: any) {
            if (error.data.message === "User is not verified") {
                navigate("/verify", { state: data.email });
            };
            if (error.data.message === "Incorrect password") {
                toast.error("Incorrect password. Please try again.");
            };
            // console.log(error)
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                    {/** Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/** Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Password {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display password.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full cursor-pointer bg-red-500 hover:bg-red-600 text-foreground">
                        Login
                    </Button>
                </form>
            </Form>

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>
            {/* http://localhost:5000/api/v1/auth/google */}
            <Button
                onClick={() => { window.location.href = `${config.baseUrl}/auth/google` }}
                type="button"
                variant="outline"
                className="w-full cursor-pointer"
            >
                Continue with Google
            </Button>

            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" replace className="text-primary font-medium hover:underline">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;