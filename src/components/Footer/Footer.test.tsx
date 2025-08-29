import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';
import { FooterProps } from '../../types';

const mockProps: FooterProps = {
    totalProducts: 10,
    averagePrice: '99.99'
};

describe('Footer', () => {
    test('displays correct total products count', () => {
        render(<Footer {...mockProps} />);

        const totalProducts = screen.getByTestId('total-products');
        expect(totalProducts).toHaveTextContent('10');
    });

    test('displays correct average price', () => {
        render(<Footer {...mockProps} />);

        const averagePrice = screen.getByTestId('average-price');
        expect(averagePrice).toHaveTextContent('$99.99');
    });

    test('displays correct labels', () => {
        render(<Footer {...mockProps} />);

        expect(screen.getByText('Total Products:')).toBeInTheDocument();
        expect(screen.getByText('Average Price:')).toBeInTheDocument();
    });

    test('handles zero products', () => {
        render(<Footer totalProducts={0} averagePrice="0.00" />);

        const totalProducts = screen.getByTestId('total-products');
        const averagePrice = screen.getByTestId('average-price');

        expect(totalProducts).toHaveTextContent('0');
        expect(averagePrice).toHaveTextContent('$0.00');
    });

    test('handles large numbers', () => {
        render(<Footer totalProducts={9999} averagePrice="1234.56" />);

        const totalProducts = screen.getByTestId('total-products');
        const averagePrice = screen.getByTestId('average-price');

        expect(totalProducts).toHaveTextContent('9999');
        expect(averagePrice).toHaveTextContent('$1234.56');
    });

    test('handles decimal average price', () => {
        render(<Footer totalProducts={5} averagePrice="45.67" />);

        const averagePrice = screen.getByTestId('average-price');
        expect(averagePrice).toHaveTextContent('$45.67');
    });
});
