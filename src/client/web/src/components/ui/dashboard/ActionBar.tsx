import React from "react";
import {useAppDispatch} from "../../../state/hooks";
import {add} from "../../../state/notificationsSlice";

const ActionBar = () => {
    const dispatch = useAppDispatch();


    return <div className="grid grid-cols-5 mb-4">
        <div className="col-span-4 pr-4">
            <input
                className="w-full rounded-xl h-12 px-6 bg-transparent border-slate-500 border"
                placeholder="Search files, document, etc."/>
        </div>
        <div>
            <button className="bg-blue-600 h-12 w-full rounded-xl hover:bg-blue-700" onClick={() => {
                dispatch(add({
                    title: "test",
                    text: "test",
                    status: "error"
                }))
                dispatch(add({
                    title: "test",
                    text: "test",
                    status: "success"
                }))
                dispatch(add({
                    title: "test",
                    text: "test",
                    status: "info"
                }))
                dispatch(add({
                    title: "test",
                    text: "test",
                    status: "warning"
                }))
            }
            }>Upload
                File
            </button>
        </div>
    </div>
};

export default ActionBar;