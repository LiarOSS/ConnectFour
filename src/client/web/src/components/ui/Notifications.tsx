import {XIcon} from '@heroicons/react/solid'
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {remove, selectNotifications} from "../../state/notificationsSlice";
import React from "react";

const Notifications = () => {
    const notifications = useAppSelector(selectNotifications)
    const dispatch = useAppDispatch();

    return (
        <div
            aria-live="assertive"
            className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-40"
        >
            <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                {
                    Object.entries(notifications).map(([key, notification]) => (
                            <div
                                className="max-w-sm w-full bg-slate-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <notification.status.icon
                                                className={`h-6 w-6 ${notification.status.color}`}
                                                aria-hidden="true"/>
                                        </div>
                                        <div className="ml-3 w-0 flex-1 pt-0.5">
                                            <p className="text-sm font-medium text-white">{notification.title}</p>
                                            <p className="mt-1 text-sm text-gray-200">{notification.text}</p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0 flex">
                                            <button
                                                type="button"
                                                className="rounded-md inline-flex text-gray-300 hover:text-white"
                                                onClick={() => {
                                                    dispatch(remove(key))
                                                }}
                                            >
                                                <span className="sr-only">Close</span>
                                                <XIcon className="h-5 w-5" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Notifications;