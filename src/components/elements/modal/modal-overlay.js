import React from 'react';
import overlayStyles from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({children, onClick = () => undefined})=> (
    <div className={overlayStyles.overlay} onClick={onClick}>{children}</div>
);

ModalOverlay.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onClick: PropTypes.func,
}

export default ModalOverlay;