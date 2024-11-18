import React from 'react';
import '../assets/css/modal.css';

const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <h4>{message}</h4>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default Modal;