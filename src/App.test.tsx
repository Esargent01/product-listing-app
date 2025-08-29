import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { productService } from './services/productService';

jest.mock('./services/productService');

const mockProducts = [
    {
        id: '1',
        name: "Wireless Bluetooth Headphones",
        price: 89.99,
        description: "High-quality wireless headphones with noise cancellation",
        imageUrl: "https://example.com/headphones.jpg",
        category: "Electronics",
        inStock: true,
        rating: 4.5,
        numReviews: 10,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '2',
        name: "Smart Fitness Watch",
        price: 199.99,
        description: "Advanced fitness tracker with heart rate monitoring",
        imageUrl: "https://example.com/watch.jpg",
        category: "Electronics",
        inStock: true,
        rating: 4.3,
        numReviews: 15,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '3',
        name: "Portable Bluetooth Speaker",
        price: 59.99,
        description: "Waterproof portable speaker with 360-degree sound",
        imageUrl: "https://example.com/speaker.jpg",
        category: "Electronics",
        inStock: true,
        rating: 4.1,
        numReviews: 8,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

describe('Product Listing App', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (productService.getAllProducts as jest.Mock).mockResolvedValue({
            products: mockProducts,
            total: 3,
            count: 3
        });
    });

    test('renders header with logo', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Product Store')).toBeInTheDocument();
        });
    });

    test('loads and displays all products with correct information', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Wireless Bluetooth Headphones')).toBeInTheDocument();
            expect(screen.getByText('Smart Fitness Watch')).toBeInTheDocument();
            expect(screen.getByText('Portable Bluetooth Speaker')).toBeInTheDocument();

            expect(screen.getByText('$89.99')).toBeInTheDocument();
            expect(screen.getByText('$199.99')).toBeInTheDocument();
            expect(screen.getByText('$59.99')).toBeInTheDocument();

            expect(screen.getByText('High-quality wireless headphones with noise cancellation')).toBeInTheDocument();
            expect(screen.getByText('Advanced fitness tracker with heart rate monitoring')).toBeInTheDocument();
            expect(screen.getByText('Waterproof portable speaker with 360-degree sound')).toBeInTheDocument();
        });
    });

    test('displays loading state initially', () => {
        (productService.getAllProducts as jest.Mock).mockImplementation(() => new Promise(() => { }));

        render(<App />);

        expect(screen.getByText('Loading products...')).toBeInTheDocument();
    });

    test('displays error state when API fails', async () => {
        (productService.getAllProducts as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Error')).toBeInTheDocument();
            expect(screen.getByText('API Error')).toBeInTheDocument();
        });
    });



    test('handles search with real-time filtering', async () => {
        (productService.getAllProducts as jest.Mock).mockResolvedValueOnce({
            products: mockProducts,
            total: 3,
            count: 3
        });

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Wireless Bluetooth Headphones')).toBeInTheDocument();
        });

        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'headphones' } });

        await waitFor(() => {
            expect(screen.getByText('Wireless Bluetooth Headphones')).toBeInTheDocument();
            expect(screen.queryByText('Smart Fitness Watch')).not.toBeInTheDocument();
            expect(screen.queryByText('Portable Bluetooth Speaker')).not.toBeInTheDocument();
        });
    });

    test('handles sorting', async () => {
        (productService.getAllProducts as jest.Mock).mockResolvedValueOnce({
            products: mockProducts,
            total: 3,
            count: 3
        });

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Wireless Bluetooth Headphones')).toBeInTheDocument();
        });

        const sortButton = screen.getByTestId('sort-button');
        fireEvent.click(sortButton);

        await waitFor(() => {
            expect(screen.getByText(/Sort by Price \(High to Low\)/)).toBeInTheDocument();
        });
    });

    test('displays correct statistics', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByTestId('total-products')).toHaveTextContent('3');
            expect(screen.getByTestId('average-price')).toHaveTextContent('$116.66');
        });
    });

    test('renders product images', async () => {
        render(<App />);

        await waitFor(() => {
            const images = screen.getAllByRole('img');
            expect(images).toHaveLength(3);

            expect(images[0]).toHaveAttribute('src', 'https://example.com/headphones.jpg');
            expect(images[0]).toHaveAttribute('alt', 'Wireless Bluetooth Headphones');

            expect(images[1]).toHaveAttribute('src', 'https://example.com/watch.jpg');
            expect(images[1]).toHaveAttribute('alt', 'Smart Fitness Watch');

            expect(images[2]).toHaveAttribute('src', 'https://example.com/speaker.jpg');
            expect(images[2]).toHaveAttribute('alt', 'Portable Bluetooth Speaker');
        });
    });
});
