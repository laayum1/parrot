// backend/server.js
const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes');
require('./config/passport'); // Passport configuration

const app = express();

// Middleware
app.use(cors({
    origin: 'https://parrotrblx.com',
    credentials: true,
}));
app.use(express.json());
app.use(session({
    secret: 'gh5832vg769832tyn02457398t7b35498n5n234h95820734987235098nv740984375243u90hgui4rhfgiqjhfkjdsghbsgsdfgs45y7w54t5425th23c45fiuoth298370t',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', routes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Define a route for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the Parrot Platform!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
