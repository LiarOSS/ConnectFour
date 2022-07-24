import React from "react";
import {NavLink} from "react-router-dom";

export interface CategoryProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    text: string,
    unit?: string,
    amount?: string | number,
    link: string,
    color: {
        text: string,
        bg: string
    }
}

const Category = ({...props}: CategoryProps) => (
    <NavLink to={`/files/${props.link}`}>
        <div className="border-slate-500 h-20 border rounded-xl py-4 px-10 cursor-pointer hover:bg-slate-800">
            <div className="w-full h-full grid grid-cols-7">
                <div className="col-span-5 flex items-center">
                    <div className={`${props.color.bg} rounded-full h-12 w-12 mr-4 relative`}>
                        <props.icon className="h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                    </div>
                    <span>{props.text}</span>
                </div>
                <div className={`${props.color.text} col-span-2 border-l-slate-500 border-l h-12 text-2xl relative`}>
                    <div className="absolute top-1/2 -translate-y-1/2 pl-4">
                        {props.amount || "###"}<span className="ml-1 text-sm text-white">{props.unit || "GB"}</span>
                    </div>
                </div>
            </div>
        </div>
    </NavLink>
)

export default Category;