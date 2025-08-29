import React, { useState, useEffect, useRef } from 'react';
import './App.scss';
import ProductCard from './components/ProductCard/ProductCard';
import SearchBar from './components/SearchBar/SearchBar';
import SortButton from './components/SortButton/SortButton';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { Product, SortOrder } from './types';
import { productService } from './services/productService';

const App: React.FC = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);





    useEffect(() => {
        const loadAllProducts = async (): Promise<void> => {
            try {
                setLoading(true);
                const response = await productService.getAllProducts();
                setAllProducts(response.products);
                setFilteredProducts(response.products);
                setLoading(false);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
                setLoading(false);
            }
        };

        loadAllProducts();
    }, []);

    useEffect(() => {
        let filtered = allProducts;

        if (searchTerm.trim() !== '') {
            filtered = allProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        const sortedProducts = [...filtered].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

        setFilteredProducts(sortedProducts);
    }, [searchTerm, sortOrder, allProducts]);

    const handleSort = (): void => {
        const newOrder: SortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
    };

    const totalProducts: number = filteredProducts.length;
    const averagePrice: string = filteredProducts.length > 0
        ? (filteredProducts.reduce((sum, product) => sum + product.price, 0) / filteredProducts.length).toFixed(2)
        : '0.00';

    if (loading) {
        return (
            <div className="app">
                <Header />
                <main className="main">
                    <div className="container">
                        <div className="loading">
                            <div className="spinner"></div>
                            <p>Loading products...</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app">
                <Header />
                <main className="main">
                    <div className="container">
                        <div className="error">
                            <h2>Error</h2>
                            <p>{error}</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="app">
            <Header />
            <main className="main">
                <div className="container">
                    <div className="controls">
                        <SearchBar
                            ref={searchInputRef}
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                        />
                        <SortButton
                            sortOrder={sortOrder}
                            onSort={handleSort}
                        />
                    </div>

                    <div className="products-container">
                        {filteredProducts.length > 0 ? (
                            <>
                                <div className="products-grid">
                                    {filteredProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                            </>
                        ) : (
                            <div className="no-results">
                                <i className="fas fa-search"></i>
                                <h3>No products found</h3>
                                <p>Try adjusting your search terms</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer
                totalProducts={totalProducts}
                averagePrice={averagePrice}
            />
        </div>
    );
};

export default App;
