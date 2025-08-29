const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config({ path: './config.env' });

const { connectToDatabase } = require('./config/database');
const errorHandler = require('./middleware/error');

const app = express();

const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running'
    });
});

app.use('/api/v1/products', require('./routes/products'));

app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use(errorHandler);

const startServer = async () => {
    try {
        await connectToDatabase();

        app.listen(PORT, () => {
            console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
            console.log(`API Base URL: http://localhost:${PORT}/api/v1`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

if (process.env.NODE_ENV !== 'test') {
    startServer();
}

module.exports = app;
