import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router";

const parcelStatuses = [
    "Requested",
    "Approved",
    "Dispatched",
    "In Transit",
    "Delivered",
    "Cancelled"
];

const StatusFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedStatus = searchParams.get("currentStatus") || "";

    const handleStatusChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("currentStatus", value);
        } else {
            params.delete("currentStatus");
        }
        setSearchParams(params);
    };

    const handleClearFilter = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("currentStatus");
        setSearchParams(params);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                    Filter by Parcel Status
                </h1>

                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleClearFilter}
                    className="cursor-pointer"
                >
                    Clear Filter
                </Button>
            </div>

            <div>
                <Select
                    onValueChange={handleStatusChange}
                    value={selectedStatus}
                >
                    <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select parcel status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            {parcelStatuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default StatusFilter;