import React from 'react';
import './ProductCard.scss';
import { ProductCardProps } from '../../types';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card" data-testid="product-card">
            <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">${product.price.toFixed(2)}</div>
            </div>
        </div>
    );
};

export default ProductCard;
