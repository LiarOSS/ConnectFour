import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "./store";
import {v4 as uuid} from 'uuid';
import {CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon} from "@heroicons/react/outline";
import React from "react";

export interface NotificationsState {
    value: Record<string, Notification>;
}

export interface Notification {
    title: string,
    text: string,
    status: {
        color: string,
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    }
}

export interface NotificationPayload {
    title: string,
    text: string,
    status: 'error' | 'success' | 'warning' | 'info'
}

const icons = {
    warning: {
        icon: ExclamationCircleIcon,
        color: "text-amber-400"
    },
    success: {
        icon: CheckCircleIcon,
        color: "text-green-400"
    },
    info: {
        icon: InformationCircleIcon,
        color: "text-blue-500"
    },
    error: {
        icon: XCircleIcon,
        color: "text-red-600"
    },
}

const initialState: NotificationsState = {
    value: {},
};

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<NotificationPayload>) => {
            state.value[uuid()] = {
                ...action.payload,
                status: icons[action.payload.status]
            };
        },
        remove: (state, action: PayloadAction<string>) => {
            delete state.value[action.payload]
        },
    },
});

export const selectNotifications = (state: RootState) => state.notifications.value;

export const {add, remove} = notificationsSlice.actions;

export default notificationsSlice.reducer;