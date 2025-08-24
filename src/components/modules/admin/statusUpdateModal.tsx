"use client";

import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FormData } from "@/types";

const parcelStatuses = [
    "Requested",
    "Approved",
    "Dispatched",
    "In Transit",
    "Delivered",
    "Cancelled",
    "Returned",
    "Rescheduled",
] as const;

export default function StatusUpdateModal({
    open,
    onClose,
    onSubmit,
    currentStatus,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
    currentStatus: string;
}) {
    const form = useForm<FormData>({
        defaultValues:
        {
            status: currentStatus || "Requested",
            location: "",
            note: ""
        }
    });

    const handleSubmit = (data: FormData) => {
        onSubmit({
            ...data,
            updatedAt: new Date().toISOString(),
        });
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Parcel Status</DialogTitle>
                    <DialogDescription>
                        Update the parcel status, location, and optional note. Current status: <b>{currentStatus}</b>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <Select
                            onValueChange={(value) => form.setValue("status", value)}
                            defaultValue={form.watch("status")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {parcelStatuses.map((s) => (
                                    <SelectItem key={s} value={s}>
                                        {s}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <Input {...form.register("location", { required: true })} placeholder="Enter hub / city" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Note</label>
                        <Textarea {...form.register("note")} placeholder="Optional note for this status update" />
                    </div>
                    <DialogFooter className="flex justify-between">
                        <Button variant="outline" className="cursor-pointer" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className="cursor-pointer" type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}