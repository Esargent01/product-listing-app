export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
}

export type SortOrder = 'asc' | 'desc';

export interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export interface SortButtonProps {
    sortOrder: SortOrder;
    onSort: () => void;
}

export interface ProductCardProps {
    product: Product;
}

export interface FooterProps {
    totalProducts: number;
    averagePrice: string;
}
