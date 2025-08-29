const errorHandler = require('../../middleware/error');

describe('Error Middleware', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        mockNext = jest.fn();
    });

    it('should handle CastError', () => {
        const error = new Error('Cast to ObjectId failed');
        error.name = 'CastError';

        errorHandler(error, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            error: 'Resource not found'
        });
    });

    it('should handle ValidationError', () => {
        const error = new Error('Validation failed');
        error.name = 'ValidationError';
        error.errors = {
            name: { message: 'Name is required' },
            price: { message: 'Price must be positive' }
        };

        errorHandler(error, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            error: ['Name is required', 'Price must be positive']
        });
    });

    it('should handle generic errors', () => {
        const error = new Error('Something went wrong');

        errorHandler(error, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            error: 'Something went wrong'
        });
    });
});
