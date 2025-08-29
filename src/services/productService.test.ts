import { productService } from './productService';

global.fetch = jest.fn();

describe('ProductService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllProducts', () => {
        it('should fetch all products successfully', async () => {
            const backendProducts = [
                {
                    _id: '1',
                    name: 'Test Product 1',
                    price: 100,
                    description: 'Test description 1',
                    image_url: 'https://example.com/1.jpg',
                    category: 'Electronics'
                },
                {
                    _id: '2',
                    name: 'Test Product 2',
                    price: 200,
                    description: 'Test description 2',
                    image_url: 'https://example.com/2.jpg',
                    category: 'Electronics'
                }
            ];

            const mockResponse = {
                success: true,
                products: backendProducts,
                count: 2
            };

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            const result = await productService.getAllProducts();

            expect(fetch).toHaveBeenCalledWith('http://localhost:5001/api/v1/products', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            expect(result.products).toHaveLength(2);
            expect(result.total).toBe(2);
            expect(result.count).toBe(2);
            expect(result.products[0]).toMatchObject({
                id: '1',
                name: 'Test Product 1',
                price: 100,
                description: 'Test description 1',
                imageUrl: 'https://example.com/1.jpg',
                category: 'Electronics'
            });

            expect(result.products[1]).toMatchObject({
                id: '2',
                name: 'Test Product 2',
                price: 200,
                description: 'Test description 2',
                imageUrl: 'https://example.com/2.jpg',
                category: 'Electronics'
            });

        });

        it('should handle API error response', async () => {
            const mockResponse = {
                success: false,
                error: 'Database connection failed'
            };

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            await expect(productService.getAllProducts()).rejects.toThrow('Database connection failed');
        });

        it('should handle network error', async () => {
            (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

            await expect(productService.getAllProducts()).rejects.toThrow('Network error');
        });

        it('should handle HTTP error status', async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 500
            });

            await expect(productService.getAllProducts()).rejects.toThrow('HTTP error! status: 500');
        });
    });



    describe('getProductStats', () => {
        it('should fetch product statistics successfully', async () => {
            const mockStats = {
                overall: {
                    total_products: 2,
                    average_price: 150,
                    min_price: 100,
                    max_price: 200,
                    total_value: 300
                },
                byCategory: [
                    {
                        _id: 'Electronics',
                        count: 2,
                        average_price: 150
                    }
                ]
            };

            const mockResponse = {
                success: true,
                stats: {
                    total_products: 2,
                    average_price: 150,
                    min_price: 100,
                    max_price: 200,
                    total_value: 300
                }
            };

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            const result = await productService.getProductStats();

            expect(fetch).toHaveBeenCalledWith('http://localhost:5001/api/v1/products/stats', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            expect(result).toEqual(mockResponse.stats);
        });
    });


});
