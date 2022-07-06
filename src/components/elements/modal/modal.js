import React,  {useCallback, useEffect} from "react";
import ModalOverlay from './modal-overlay';
import {createPortal} from "react-dom";
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Modal = ({title, children, onClose}) => {
    const keyDownHandler = useCallback(({ key }) => {
        switch (key) {
            case 'Escape':
                onClose();
                break;
            default:
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler);
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, []);


    const modalRoot = document.getElementById('modals');

    return createPortal(
        <>
            <ModalOverlay onClick={onClose}>
                <div className={modalStyles.modal} onClick={e => e.stopPropagation()}>
                    <div className={`${modalStyles.header} mt-10 mr-10 ml-10 pt-5 pb-5`}>
                        <h2>{title}</h2>
                        <span className={modalStyles.close_icon} onClick={onClose}>
                            <CloseIcon type="primary"/>
                        </span>
                    </div>
                    <div className={`${modalStyles.content} pb-15 pr-25 pl-25`}>
                        {children}
                    </div>
                </div>
            </ModalOverlay>
        </>, modalRoot
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default Modal;