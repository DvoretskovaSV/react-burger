import React, {FC} from 'react';
import overlayStyles from './modal-overlay.module.css';

type TProps = {
    children: JSX.Element,
    onClick: () => void;
};

const ModalOverlay: FC<TProps> = ({children, onClick})=> (
    <div className={overlayStyles.overlay} onClick={onClick}>{children}</div>
);

export default ModalOverlay;