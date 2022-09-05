import React, {FC, ReactNode, useCallback, useEffect} from "react";
import ModalOverlay from './modal-overlay';
import {createPortal} from "react-dom";
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type TProps = {
    children: ReactNode | ReactNode[],
    onClose: () => void;
    title?: string | JSX.Element;
    isOpen?: boolean;
    contentClassName?: string;
};

const Modal: FC<TProps> = ({title, children, onClose, contentClassName}) => {
    const keyDownHandler = useCallback(({ key }: KeyboardEvent) => {
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


    const modalRoot = document.getElementById('modals') as HTMLElement;

    return createPortal(
        <>
            <ModalOverlay onClick={onClose}>
                <div className={modalStyles.modal} onClick={e => e.stopPropagation()} data-cy="modal">
                    <div className={`${modalStyles.header} mt-10 mr-10 ml-10 pt-5 pb-5`}>
                        <h2>{title}</h2>
                        <span className={modalStyles.close_icon} onClick={onClose} data-cy="close-icon">
                            <CloseIcon type="primary"/>
                        </span>
                    </div>
                    <div className={`${modalStyles.content} ${contentClassName}`}>
                        {children}
                    </div>
                </div>
            </ModalOverlay>
        </>, modalRoot
    );
};

export default Modal;