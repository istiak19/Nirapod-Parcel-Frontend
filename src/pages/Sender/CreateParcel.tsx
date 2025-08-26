/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useCreateParcelMutation } from "@/redux/features/parcel/sender.api";
import { Helmet } from "react-helmet-async";

// ✅ Zod Schema (use Date instead of string)
const parcelSchema = z.object({
    type: z.string().min(1, "Parcel type is required"),
    weight: z.number().positive("Weight must be positive"),
    fee: z.number().positive("Fee must be positive"),
    pickupAddress: z.string().min(1, "Pickup address is required"),
    deliveryAddress: z.string().min(1, "Delivery address is required"),
    deliveryDate: z.date({ message: "Delivery date is required" }),
    receiver: z.string().min(1, "Receiver ID is required"),
    note: z.string().optional(),
});

type ParcelFormValues = z.infer<typeof parcelSchema>;

const CreateParcel = () => {
    const form = useForm<ParcelFormValues>({
        resolver: zodResolver(parcelSchema),
        defaultValues: {
            type: "",
            weight: 0,
            fee: 0,
            pickupAddress: "",
            deliveryAddress: "",
            deliveryDate: undefined,
            receiver: "",
            note: "",
        },
    });

    const [create, { isLoading }] = useCreateParcelMutation();

    const onSubmit = async (data: ParcelFormValues) => {
        const parcelData = {
            type: data.type,
            weight: data.weight,
            fee: data.fee,
            pickupAddress: data.pickupAddress,
            deliveryAddress: data.deliveryAddress,
            deliveryDate: data.deliveryDate.toISOString(),
            receiver: data.receiver,
            currentStatus: "Requested",
            statusLogs: [
                {
                    status: "Requested",
                    location: data.pickupAddress.split(",")[0] || "Unknown",
                    note: data.note || "Initial request",
                }
            ],
        }
        console.log(parcelData);

        try {
            await create(parcelData).unwrap();
            toast.success("Parcel created successfully!");
            form.reset();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to create parcel");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-5 my-16 bg-white dark:bg-neutral-900 rounded-2xl shadow-md w-full">
            <Helmet>
                <title>Create Parcel | Nirapod Parcel</title>
                <meta name="description" content="Welcome to Nirapod Parcel create parcel page" />
            </Helmet>

            <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">
                New Parcel Request
            </h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parcel Type</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Documents" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Weight (kg)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            value={field.value || ""}
                                            onChange={(e) =>
                                                field.onChange(e.target.valueAsNumber || 0)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="fee"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fee (BDT)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={field.value || ""}
                                            onChange={(e) =>
                                                field.onChange(e.target.valueAsNumber || 0)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="receiver"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Receiver ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Receiver user ID" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="pickupAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pickup Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="New Market, Rajshahi" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Delivery Address */}
                    <FormField
                        control={form.control}
                        name="deliveryAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Delivery Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Banani, Dhaka" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="deliveryDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                                <FormLabel>Delivery Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date(new Date().setDate(new Date().getDate() - 1))
                                            }
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Note</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="h-32 resize-none"
                                        placeholder="Optional note for this parcel"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold cursor-pointer" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Parcel"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateParcel;