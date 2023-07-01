import React from "react";

import styles from './modal-overlay.module.css';
type TModalOverlay = {
    onClick: ()=>void;
    children?: React.ReactNode;
}
const ModalOverlay: React.FC<TModalOverlay> = ({ children, onClick }) => {

    return (
        <div className={styles.modalOverlay} onClick={onClick}>
            {children}
        </div>
    )
}


export default ModalOverlay