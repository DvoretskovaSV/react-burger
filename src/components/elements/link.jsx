import React from 'react';
import PropTypes from 'prop-types';
import linkStyles from './link.module.css';

const Link = ({text, children, url = '#', active = false, onClick = () => undefined}) => (
    <a
        href={url}
        className={`${linkStyles.link} ${active ? linkStyles.active : ''} p-5`}
        onClick={onClick}
    >
        {children}
        {text && <span>{text}</span>}
    </a>
);

Link.propTypes = {
    text: PropTypes.string,
    url: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Link;