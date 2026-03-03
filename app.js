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
    'https://easybusy-c9c0af9251be.herokuapp.com'
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
    // origin: 'https://easybusy-c9c0af9251be.herokuapp.com',
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

app.post("/api/v1/log-error", (req, res) => {
    console.log("Frontend error received:", req.body);
    res.status(200).json({ message: "Error logged (dummy)" });
});

// Test 
const corsOptions = {
    origin: function (origin, callback) {
        // allow requests from GitHub Pages + Heroku frontend
        const allowed = [
            "https://mayabargig.github.io",
            "https://easybusy-c9c0af9251be.herokuapp.com"
        ];
        // אם אין origin (לדוגמה מ־curl או mobile), אפשר לאפשר
        if (!origin) return callback(null, true);
        if (allowed.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"), false);
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));

// חובה – כדי לאפשר preflight request:
app.options("*", cors(corsOptions));

module.exports = { app };
