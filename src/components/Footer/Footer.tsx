import React from 'react';
import './Footer.scss';
import { FooterProps } from '../../types';

const Footer: React.FC<FooterProps> = ({ totalProducts, averagePrice }) => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-stats">
                    <div className="stat">
                        <span className="stat-label">Total Products:</span>
                        <span className="stat-value" data-testid="total-products">{totalProducts}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Average Price:</span>
                        <span className="stat-value" data-testid="average-price">${averagePrice}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
