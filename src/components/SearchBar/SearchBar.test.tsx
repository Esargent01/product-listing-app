import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';
import { SearchBarProps } from '../../types';

const mockProps: SearchBarProps = {
    searchTerm: '',
    onSearchChange: jest.fn()
};

describe('SearchBar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders search input with correct placeholder', () => {
        render(<SearchBar {...mockProps} />);

        const searchInput = screen.getByTestId('search-input');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveAttribute('placeholder', 'Search products by name or description...');
    });

    test('displays the current search term', () => {
        const searchTerm = 'test search';
        render(<SearchBar {...mockProps} searchTerm={searchTerm} />);

        const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
        expect(searchInput.value).toBe(searchTerm);
    });

    test('calls onSearchChange when input value changes', () => {
        render(<SearchBar {...mockProps} />);

        const searchInput = screen.getByTestId('search-input');
        const newValue = 'new search term';

        fireEvent.change(searchInput, { target: { value: newValue } });

        expect(mockProps.onSearchChange).toHaveBeenCalledWith(newValue);
        expect(mockProps.onSearchChange).toHaveBeenCalledTimes(1);
    });

    test('has correct input type and attributes', () => {
        render(<SearchBar {...mockProps} />);

        const searchInput = screen.getByTestId('search-input');
        expect(searchInput).toHaveAttribute('type', 'text');
        expect(searchInput).toHaveClass('search-input');
    });

    test('renders search icon', () => {
        render(<SearchBar {...mockProps} />);

        const searchIcon = document.querySelector('.fas.fa-search');
        expect(searchIcon).toBeInTheDocument();
    });

    test('forwards ref correctly', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<SearchBar {...mockProps} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
        expect(ref.current).toHaveAttribute('data-testid', 'search-input');
    });

    test('handles empty search term', () => {
        render(<SearchBar {...mockProps} searchTerm="" />);

        const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
        expect(searchInput.value).toBe('');
    });

    test('handles special characters in search', () => {
        render(<SearchBar {...mockProps} />);

        const searchInput = screen.getByTestId('search-input');
        const specialValue = 'test@#$%^&*()';

        fireEvent.change(searchInput, { target: { value: specialValue } });

        expect(mockProps.onSearchChange).toHaveBeenCalledWith(specialValue);
    });
});
