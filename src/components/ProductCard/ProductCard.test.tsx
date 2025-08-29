import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';
import { Product } from '../../types';

const mockProduct: Product = {
    id: '1',
    name: "Test Product",
    price: 99.99,
    description: "This is a test product description",
    imageUrl: "https://example.com/test-image.jpg",
    category: "Electronics"
};

describe('ProductCard', () => {
    test('renders product information correctly', () => {
        render(<ProductCard product={mockProduct} />);

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('This is a test product description')).toBeInTheDocument();
        expect(screen.getByText('$99.99')).toBeInTheDocument();
    });

    test('renders product image with correct alt text', () => {
        render(<ProductCard product={mockProduct} />);

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', 'https://example.com/test-image.jpg');
        expect(image).toHaveAttribute('alt', 'Test Product');
    });

    test('has correct test ID', () => {
        render(<ProductCard product={mockProduct} />);

        expect(screen.getByTestId('product-card')).toBeInTheDocument();
    });

    test('formats price correctly', () => {
        const productWithDecimal: Product = {
            ...mockProduct,
            price: 50.5
        };

        render(<ProductCard product={productWithDecimal} />);

        expect(screen.getByText('$50.50')).toBeInTheDocument();
    });
});
