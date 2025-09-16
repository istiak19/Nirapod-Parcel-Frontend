import { useGetSingleUserQuery } from "@/redux/features/user/user.api";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useUpdatedUserMutation } from "@/redux/features/auth/auth.api";
import SingleImageUpload from "@/components/singleImageUpload";

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
    const [image, setImage] = useState<File | null>(null);
    const { data, isFetching } = useGetSingleUserQuery(id as string);
    const [updateUser] = useUpdatedUserMutation();
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
        const formData = new FormData();
        formData.append("data", JSON.stringify(values))
        formData.append("file", image as File);

        try {
            const res = await updateUser({ id, userInfo: formData }).unwrap();
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
        <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Update Profile | Nirapod Parcel</title>
                <meta
                    name="description"
                    content="Welcome to Nirapod Parcel update profile page"
                />
            </Helmet>

            <Card className="w-full max-w-3xl backdrop-blur-xl bg-gray-800/60 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 shadow-md">
                    <CardTitle className="text-3xl font-bold text-center py-6 text-white tracking-wide">
                        Update Profile
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-10 space-y-8">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                            id="update-profile-form"
                        >
                            {/* Upload image */}
                            <div className="flex w-full justify-center">
                                <SingleImageUpload onChange={setImage} />
                            </div>

                            {/* Profile Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-600 pb-2 mb-4">
                                    Profile Information
                                </h3>

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your name"
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
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
                                        <FormItem className="mt-4">
                                            <FormLabel className="text-gray-300">Email</FormLabel>
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
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-600 pb-2 mb-4">
                                    Contact Information
                                </h3>
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Phone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter phone number"
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
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
                                        <FormItem className="mt-4">
                                            <FormLabel className="text-gray-300">Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter address"
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400 text-sm" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>

                    {/* Buttons */}
                    <div className="flex justify-end gap-5">
                        <Button
                            variant="outline"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 rounded-xl border-gray-600 text-gray-200 hover:bg-gray-700 transition cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="update-profile-form"
                            className="px-6 py-3 rounded-xl bg-red-400 hover:bg-red-500 text-white shadow-lg cursor-pointer"
                        >
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateProfile;