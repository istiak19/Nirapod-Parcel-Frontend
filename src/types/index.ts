import type { ComponentType } from "react";

export interface ISidebarItem {
    title: string;
    items: {
        title: string;
        url: string;
        component: ComponentType;
    }[];
};

export interface SectionHeadingProps {
    kicker?: string;
    title: string;
    subtitle?: string;
    align?: "left" | "center";
};

export type IRole = "Receiver" | "Admin" | "Sender";

export interface ITrack {
    status: string
    updateBy: string
    updateAt: string
    location: string
    note: string
};

export interface Auth {
    provider: string
    providerId: string
};

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    role: "Admin" | "Sender" | "Receiver";
    phone?: string;
    picture?: string;
    address?: string;
    isDelete?: boolean;
    isBlocked?: string;
    companyName?: string;
    isVerified?: boolean;
    auths: Auth[];
    parcelId?: string[];
    createdAt?: Date
};

export type ParcelStatus = "Requested" | "Approved" | "Dispatched" | "In Transit" | "Delivered" | "Cancelled" | "Returned" | "Rescheduled";

export interface IParcel {
    _id: string;
    type: string;
    weight: number;
    fee: number;
    pickupAddress: string;
    deliveryAddress: string;
    deliveryDate: string;
    currentStatus: ParcelStatus;
    statusLogs: { status: ParcelStatus; note: string; updateAt?: string }[];
};