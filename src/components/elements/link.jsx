import React from 'react';
import PropTypes from 'prop-types';
import linkStyles from './link.module.css';
import {NavLink as NavLinkRouter} from "react-router-dom";

const Link = (props) => {
    const {text, type = 'nav', children} = props;

    return <NavLinkRouter
        { ...props }
        className={`${linkStyles.link} ${linkStyles[type]}`}
        activeClassName={linkStyles.active}
    >
        {children}
        {text && <span>{text}</span>}
    </NavLinkRouter>
};

Link.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
};

export default Link;