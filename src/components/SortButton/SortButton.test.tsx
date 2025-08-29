import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortButton from './SortButton';
import { SortButtonProps } from '../../types';

const mockProps: SortButtonProps = {
    sortOrder: 'asc',
    onSort: jest.fn()
};

describe('SortButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders sort button with correct test ID', () => {
        render(<SortButton {...mockProps} />);

        const sortButton = screen.getByTestId('sort-button');
        expect(sortButton).toBeInTheDocument();
    });

    test('displays correct text for ascending sort order', () => {
        render(<SortButton {...mockProps} sortOrder="asc" />);

        expect(screen.getByText('Sort by Price (Low to High)')).toBeInTheDocument();
    });

    test('displays correct text for descending sort order', () => {
        render(<SortButton {...mockProps} sortOrder="desc" />);

        expect(screen.getByText('Sort by Price (High to Low)')).toBeInTheDocument();
    });

    test('calls onSort when button is clicked', () => {
        render(<SortButton {...mockProps} />);

        const sortButton = screen.getByTestId('sort-button');
        fireEvent.click(sortButton);

        expect(mockProps.onSort).toHaveBeenCalledTimes(1);
    });

    test('renders correct icon for ascending sort', () => {
        render(<SortButton {...mockProps} sortOrder="asc" />);

        const icon = screen.getByTestId('sort-button').querySelector('.fas.fa-sort-amount-down');
        expect(icon).toBeInTheDocument();
    });

    test('renders correct icon for descending sort', () => {
        render(<SortButton {...mockProps} sortOrder="desc" />);

        const icon = screen.getByTestId('sort-button').querySelector('.fas.fa-sort-amount-up');
        expect(icon).toBeInTheDocument();
    });

    test('is a button element', () => {
        render(<SortButton {...mockProps} />);

        const sortButton = screen.getByTestId('sort-button');
        expect(sortButton.tagName).toBe('BUTTON');
    });

    test('handles multiple clicks', () => {
        render(<SortButton {...mockProps} />);

        const sortButton = screen.getByTestId('sort-button');

        fireEvent.click(sortButton);
        fireEvent.click(sortButton);
        fireEvent.click(sortButton);

        expect(mockProps.onSort).toHaveBeenCalledTimes(3);
    });

    test('has proper button type', () => {
        render(<SortButton {...mockProps} />);

        const sortButton = screen.getByTestId('sort-button');
        // HTML buttons default to type="submit" if not specified, but React buttons default to type="button"
        expect(sortButton).toBeInTheDocument();
    });

    test('is accessible with proper role', () => {
        render(<SortButton {...mockProps} />);

        const sortButton = screen.getByRole('button');
        expect(sortButton).toBeInTheDocument();
        expect(sortButton).toHaveTextContent('Sort by Price');
    });
});
