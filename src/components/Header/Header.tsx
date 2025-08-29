import React from 'react';
import './Header.scss';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">
                    <i className="fas fa-shopping-bag"></i>
                    Product Store
                </h1>
            </div>
        </header>
    );
};

export default Header;
