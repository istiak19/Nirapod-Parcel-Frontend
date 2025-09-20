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

export type IRole = "Receiver" | "Admin" | "Sender" | "Rider";

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
    role: "Admin" | "Sender" | "Receiver" | "Rider";
    phone?: string;
    picture?: string;
    address?: string;
    isDelete?: boolean;
    isBlocked?: "Active" | "Inactive" | "Blocked";
    isStatus?: "Active" | "Inactive";
    companyName?: string;
    isVerified?: boolean;
    auths: Auth[];
    parcelId?: string[];
    createdAt?: Date
};

export type ParcelStatus = "Requested" | "Approved" | "Dispatched" | "In Transit" | "Delivered" | "Cancelled" | "Returned" | "Rescheduled";

export interface IStatusLog {
    status: ParcelStatus;
    note: string;
    updateAt?: string;
    location?: string;
    updateBy?: string;
};

export interface IParcel {
    _id: string;
    type: string;
    trackingId: string;
    weight: number;
    fee: number;
    rider?: {
        _id: string;
        name: string;
        phone?: string;
    };
    pickupAddress: string;
    deliveryAddress: string;
    deliveryDate: string;
    isBlocked: boolean;
    currentStatus: ParcelStatus;
    statusLogs: IStatusLog[];
    createdAt?: string;
};

export type FormData = {
    status: string;
    location: string;
    note: string;
    updatedAt?: string;
};

export interface StatusLog {
    status: ParcelStatus;
    timestamp: string;
};

export interface Parcel {
    id: string;
    currentStatus: ParcelStatus;
    createdAt: Date;
    statusLogs?: StatusLog[];
};

export interface ChartsProps {
    parcels: Parcel[];
};

export interface OverviewCardsProps {
    total: number;
    requested: number;
    approved: number;
    dispatched: number;
    delivered: number;
    inTransit: number;
    cancelled: number;
};