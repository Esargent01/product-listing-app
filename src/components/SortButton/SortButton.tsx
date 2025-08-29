import React from 'react';
import './SortButton.scss';
import { SortButtonProps } from '../../types';

const SortButton: React.FC<SortButtonProps> = ({ sortOrder, onSort }) => {
    return (
        <button
            onClick={onSort}
            className="sort-button"
            data-testid="sort-button"
        >
            <i className={`fas fa-sort-amount-${sortOrder === 'asc' ? 'down' : 'up'}`}></i>
            Sort by Price {sortOrder === 'asc' ? '(Low to High)' : '(High to Low)'}
        </button>
    );
};

export default SortButton;
