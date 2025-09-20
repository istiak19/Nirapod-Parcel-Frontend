/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { useAssignRiderMutation } from "@/redux/features/parcel/parcel.api";
import { useGetAllRidersQuery } from "@/redux/features/user/user.api";

const AssignRider = ({ parcelId }: { parcelId: string }) => {
    const { data: users, isLoading } = useGetAllRidersQuery(undefined);
    const [assignRider] = useAssignRiderMutation();

    const [open, setOpen] = useState(false);
    const [selectedRider, setSelectedRider] = useState<string>("");

    const handleAssign = async () => {
        if (!selectedRider) {
            toast.error("Please select a rider");
            return;
        }

        try {
            await assignRider({ id: parcelId, rider: selectedRider }).unwrap();
            toast.success("Rider assigned successfully!");
            setOpen(false);
            setSelectedRider("");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to assign rider");
        }
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(true)}
                className="cursor-pointer"
            >
                Assign Rider
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Rider</DialogTitle>
                        <DialogDescription>
                            Choose an active rider to assign this parcel.
                        </DialogDescription>
                    </DialogHeader>

                    {isLoading ? (
                        <p className="text-sm text-gray-500">Loading riders...</p>
                    ) : (
                        <Select onValueChange={(value) => setSelectedRider(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose a Rider" />
                            </SelectTrigger>
                            <SelectContent>
                                {users?.data
                                    ?.filter(
                                        (u: any) => u.isStatus === "Active"
                                    )
                                    .map((r: any) => (
                                        <SelectItem key={r._id} value={r._id}>
                                            {r.name} ({r.phone || "N/A"})
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    )}

                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAssign}
                            disabled={!selectedRider}
                            className="cursor-pointer"
                        >
                            Assign
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AssignRider;