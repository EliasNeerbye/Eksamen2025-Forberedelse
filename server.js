const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const config = require('./config/config');

const app = express();

mongoose.connect(config.DB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

const corsOptions = {
    origin: config.ORIGINS,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}
app.use(cors(corsOptions));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        msg: null,
        error: 'Internal server error',
        data: null
    });
});

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});