require("dotenv").config();

// Example: mongodb://user:Password@10.12.90.101:27017/userapi/?authSource=admin
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/userapidb';

// Example: 3000
const PORT = process.env.PORT || 3000;

// Example: nsadiunsaldiusdiu1n2981ndiasdlsiuahddm12i9heds0a8d9
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Example: http://localhost:3000,https://yourdomain.com
const ORIGINS = process.env.ORIGINS ? process.env.ORIGINS.split(',') : ['http://localhost:3000'];

// Example: true
const HTTPS_ENABLED = process.env.HTTPS_ENABLED === 'true' || false;

// Example: development
const NODE_ENV = process.env.NODE_ENV || 'development';

if (!DB_URL || !JWT_SECRET) {
    console.error('Missing required environment variables: DB_URL or JWT_SECRET');
    process.exit(1);
}

module.exports = {
    DB_URL,
    PORT,
    JWT_SECRET,
    ORIGINS,
    HTTPS_ENABLED,
    NODE_ENV
};