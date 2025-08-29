import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
    test('renders the header with logo, title and shopping bag icon', () => {
        render(<Header />);

        expect(screen.getByRole('banner')).toBeInTheDocument();

        expect(screen.getByText('Product Store')).toBeInTheDocument();

        const icon = screen.getByRole('banner').querySelector('.fas.fa-shopping-bag');
        expect(icon).toBeInTheDocument();
    });
});
