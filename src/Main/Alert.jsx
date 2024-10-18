import React from 'react';
import './Alert.css';
import { Link } from 'react-router-dom';

export default function Alert({ onClose, data, totalQuantity }) {
    return (
        <div className="alert-message" role="alert">
            <button className="close-btn" aria-label="Close alert" onClick={onClose}>×</button>
            <div className="content-wrapper">
                <img className="ordered-item-pic" src={data.img} alt={data.name} />
                <div className="text-content">
                    <strong className="order-title">Mahsulot savatga qo`shildi</strong>
                    <p>{data.name} ({totalQuantity})x</p>
                </div>
            </div>
            <Link to='/order' className="action-link">SAVATGA O'TISH</Link>
        </div>
    );
}
