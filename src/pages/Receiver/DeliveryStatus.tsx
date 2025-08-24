/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDeliveredParcelMutation } from "@/redux/features/parcel/receiver.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeliveryStatusProps {
    parcelId: string;
}

const DeliveryStatus = ({ parcelId }: DeliveryStatusProps) => {
    const [deliveredParcel, { isLoading }] = useDeliveredParcelMutation();
    const [isDelivered, setIsDelivered] = useState(false);

    const handleConfirmDelivery = async () => {
        try {
            const res = await deliveredParcel(parcelId).unwrap();
            setIsDelivered(true);
            console.log(res)
            // toast({
            //     title: "Success",
            //     description: "Parcel has been confirmed as delivered.",
            // });
        } catch (err: any) {
            console.log(err)
            // toast({
            //     title: "Error",
            //     description: err?.data?.message || "Failed to confirm delivery.",
            //     variant: "destructive",
            // });
        }
    };

    return (
        <Card className="max-w-md mx-auto mt-10 shadow-lg">
            <CardHeader>
                <CardTitle>Confirm Parcel Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-gray-700">
                    {isDelivered
                        ? "This parcel is already confirmed as delivered."
                        : "Click below to confirm delivery of this parcel."}
                </p>
                <Button
                    onClick={handleConfirmDelivery}
                    disabled={isLoading || isDelivered}
                    className="w-full"
                >
                    {isLoading ? "Confirming..." : isDelivered ? "Delivered" : "Confirm Delivery"}
                </Button>
            </CardContent>
        </Card>
    );
};

export default DeliveryStatus;