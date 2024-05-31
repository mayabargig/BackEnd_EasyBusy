const express = require("express");
const cors = require("cors");

const usersRouter = require("./routes/users.routes");
// const adminRouter = require("./routes/admin.routes");
const productsRouter = require("./routes/products.routes");
const businessRouter = require("./routes/business.routes");
const favoritesPRouter = require("./routes/favoriteP.routes");
const paymentRouter = require("./routes/payments.routes");
const appointmentRouter = require("./routes/appointments.routes");
const cartRouter = require("./routes/cart.routes");

const app = express();

// Specify allowed origins
const allowedOrigins = [
    'https://mayabargig.github.io',
    'https://easy-busy-50e71066dde3.herokuapp.com'
];
const checkOrigins = process.env.NODE_ENV === 'production';
app.use(cors({
    origin: checkOrigins ? (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        console.log('origin: ', origin)
        if (!allowedOrigins.some(i => origin?.startsWith(i))) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    } : '*',
    // origin: 'https://mayabargig.github.io',
    // origin: 'https://easy-busy-50e71066dde3.herokuapp.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],    // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 200 // For legacy browser support
}));

app.use(express.json());

app.use("/api/v1/users", usersRouter);
// app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/business", businessRouter);
app.use("/api/v1/favorites", favoritesPRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/cart", cartRouter);

module.exports = { app };
