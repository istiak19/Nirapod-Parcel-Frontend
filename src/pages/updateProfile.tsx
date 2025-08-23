import { useGetSingleUserQuery, useUpdateUserMutation } from "@/redux/features/user/user.api";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";

const profileSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),
    address: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UpdateProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isFetching } = useGetSingleUserQuery(id as string);
    const [updateUser] = useUpdateUserMutation();
    const user = data?.data;

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
            });
        }
    }, [user, form]);

    const onSubmit = async (values: ProfileFormValues) => {
        try {
            const res = await updateUser({ id, userInfo: values }).unwrap();
            if (res?.success) {
                toast.success("Your profile has been updated successfully")
                if (user?.role === "Admin") {
                    navigate("/admin/profile");
                } else if (user?.role === "Sender") {
                    navigate("/sender/profile");
                } else {
                    navigate("/receiver/profile");
                }
            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    if (isFetching) return <Loading />;

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-lg shadow-2xl border border-gray-700 rounded-3xl overflow-hidden bg-gray-800 text-white">
                <CardHeader className="bg-gradient-to-r from-red-400 via-red-300 to-pink-500 dark:from-red-400 dark:via-red-300 dark:to-pink-500 shadow-md">
                    <CardTitle className="text-3xl font-bold text-center py-5 text-white tracking-wide">
                        Update Profile
                    </CardTitle>
                </CardHeader>
                <CardContent className="bg-gray-900 p-8">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                            id="update-profile-form"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200 font-medium">Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your name"
                                                {...field}
                                                className="bg-gray-700 border-gray-600 text-white rounded-xl px-4 py-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-sm" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200 font-medium">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                {...field}
                                                readOnly
                                                className="bg-gray-700 border-gray-600 text-gray-300 rounded-xl px-4 py-2 cursor-not-allowed"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-sm" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200 font-medium">Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter phone number"
                                                {...field}
                                                className="bg-gray-700 border-gray-600 text-white rounded-xl px-4 py-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-sm" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200 font-medium">Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter address"
                                                {...field}
                                                className="bg-gray-700 border-gray-600 text-white rounded-xl px-4 py-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-sm" />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <div className="flex justify-end gap-4 mt-8">
                        <Button
                            variant="outline"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 rounded-xl border-gray-600 text-white hover:bg-gray-700 transition duration-200 cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="update-profile-form"
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition duration-200 cursor-pointer"
                        >
                            Save
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateProfile;