import React, { forwardRef } from 'react';
import './SearchBar.scss';
import { SearchBarProps } from '../../types';

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({ searchTerm, onSearchChange }, ref) => {
    return (
        <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input
                ref={ref}
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
                placeholder="Search products by name or description..."
                data-testid="search-input"
            />
        </div>
    );
});

export default SearchBar;
