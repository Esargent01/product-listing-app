import { Product } from '../types';

const API_BASE_URL = 'http://localhost:5001/api/v1';


interface BackendProduct {
    _id: string;
    name: string;
    price: number;
    description: string;
    image_url: string;
    category: string;
}

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

interface BackendProductsResponse extends ApiResponse<BackendProduct[]> {
    count?: number;
    total?: number;
    products?: BackendProduct[];
}



export interface ProductsResponse {
    products: Product[];
    total: number;
    count: number;
}

interface ProductStatsResponse extends ApiResponse<{
    overall: {
        total_products: number;
        average_price: number;
        min_price: number;
        max_price: number;
        total_value: number;
    };
    byCategory: Array<{
        _id: string;
        count: number;
        average_price: number;
    }>;
}> {
    stats?: {
        total_products: number;
        average_price: number;
        min_price: number;
        max_price: number;
        total_value: number;
    };
}

class ProductService {
    private convertBackendToFrontend(backendProduct: BackendProduct): Product {
        return {
            id: backendProduct._id,
            name: backendProduct.name,
            price: backendProduct.price,
            description: backendProduct.description,
            imageUrl: backendProduct.image_url,
            category: backendProduct.category
        };
    }

    private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
                ...options,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async getAllProducts(params?: { search?: string; category?: string; sort?: string }): Promise<ProductsResponse> {
        try {
            const queryParams = new URLSearchParams();
            if (params?.search) queryParams.append('search', params.search);
            if (params?.category) queryParams.append('category', params.category);
            if (params?.sort) queryParams.append('sort', params.sort);

            const endpoint = queryParams.toString() ? `/products?${queryParams.toString()}` : '/products';
            const response: BackendProductsResponse = await this.makeRequest(endpoint);

            if (!response.success) {
                throw new Error(response.error || 'Failed to fetch products');
            }

            const products = (response.products || []).map(backendProduct => this.convertBackendToFrontend(backendProduct));

            return {
                products,
                total: response.count || products.length,
                count: response.count || products.length
            };
        } catch (error) {
            console.error('Failed to get products:', error);
            throw error;
        }
    }



    async getProductStats(): Promise<{
        total_products: number;
        average_price: number;
        min_price: number;
        max_price: number;
        total_value: number;
    }> {
        try {
            const response: ProductStatsResponse = await this.makeRequest('/products/stats');

            if (!response.success) {
                throw new Error(response.error || 'Failed to fetch product statistics');
            }

            return response.stats || {
                total_products: 0,
                average_price: 0,
                min_price: 0,
                max_price: 0,
                total_value: 0
            };
        } catch (error) {
            console.error('Failed to get product stats:', error);
            throw error;
        }
    }


}

export const productService = new ProductService();
export default productService;
