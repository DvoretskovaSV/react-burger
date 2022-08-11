import React, {FC} from 'react';
import linkStyles from './link.module.css';
import {NavLink as NavLinkRouter} from "react-router-dom";
import {Location} from "history";

type LocationType = {
    from?: Location;
    pathname?: string;
    state?: LocationType;
};

type TProps = {
    text?: string;
    type?: 'nav' | 'form' | 'sub';
    children?: JSX.Element | Array<JSX.Element>;
    to: string | LocationType;
    exact?: boolean;
    onClick?: (e: any) => void;
} & LocationType;

const Link: FC<TProps> = (props ) => {
    const {text, type = 'nav', children} = props;

    return (
        <NavLinkRouter
            {...props}
            className={`${linkStyles.link} ${linkStyles[type]}`}
            activeClassName={linkStyles.active}
        >
            {children}
            {text && <span>{text}</span>}
        </NavLinkRouter>
    )
};

export default Link;