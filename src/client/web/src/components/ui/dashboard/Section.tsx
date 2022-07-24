import React, {PropsWithChildren} from "react";
import {NavLink} from "react-router-dom";

interface Props {
    title: string,
    link?: {
        text: string,
        href: string
    }
}

const Section = ({...props}: PropsWithChildren<Props>) => (
    <div>
        <h2>{props.title}</h2>
        {
            props.link && <NavLink className="absolute top-6 right-6" to={props.link.href}>{props.link.text}</NavLink>
        }
        {props.children}
    </div>
)

export default Section;