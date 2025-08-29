const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../config.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/product-listing';

let client = null;
let db = null;

const connectToDatabase = async () => {
    try {
        if (!client) {
            client = new MongoClient(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await client.connect();
            db = client.db();
            console.log('Connected to MongoDB');
        }
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        console.log('Please make sure MongoDB is running or use a cloud MongoDB instance');
        console.log('You can install MongoDB locally or use MongoDB Atlas (cloud)');
        console.log('For local installation: brew install mongodb-community');
        console.log('For MongoDB Atlas: https://www.mongodb.com/atlas');
        console.log('Continuing in development mode without database...');
        return null;
    }
};

const getDatabase = () => {
    return db;
};

const closeDatabase = async () => {
    if (client) {
        await client.close();
        client = null;
        db = null;
        console.log('Disconnected from MongoDB');
    }
};

module.exports = {
    connectToDatabase,
    getDatabase,
    closeDatabase
};
