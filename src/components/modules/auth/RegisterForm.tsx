import { z } from "zod";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router";
// import Password from "../ui/Password";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import config from "@/config";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Password from "@/components/ui/password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
const registerFormSchema = z
    .object({
        name: z.string().min(2, {
            message: "Name must be at least 2 characters",
        }),
        email: z.email({ message: "Enter a valid email address" }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters",
        }).regex(passwordRegex, {
            message: "Password must include uppercase, lowercase, number, and special character",
        }),
        confirmPassword: z.string().min(6, {
            message: "Confirm Password must be at least 6 characters",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const RegisterForm = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        const { name, email, password } = data;
        const userInfo = { name, email, password };
        console.log(userInfo)
        try {
            const result = await register(userInfo).unwrap();
            console.log(result)
            // if (result.success === true) {
            //     navigate("/verify")
            // };

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-center mb-6">     Create your account </h1>
                <p className="text-sm text-muted-foreground">
                    Fill in your details to register
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/** Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your full name" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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

                    {/** Confirm Password */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Password {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display confirm password.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full cursor-pointer bg-red-500 text-foreground hover:bg-red-400">
                        Create Account
                    </Button>
                </form>
            </Form>

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>
            <Button
                onClick={() => { window.location.href = `${config.baseUrl}/auth/google` }}
                type="button"
                variant="outline"
                className="w-full cursor-pointer"
            >
                Continue with Google
            </Button>

            <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-primary font-medium hover:underline"
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;