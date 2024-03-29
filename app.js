const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const usersRouter = require("./routes/users.routes");
// const adminRouter = require("./routes/admin.routes");
const productsRouter = require("./routes/products.routes");
const businessRouter = require("./routes/business.routes");
const favoritesPRouter = require("./routes/favoriteP.routes");
const paymentRouter = require("./routes/payments.routes");
const appointmentRouter = require("./routes/appointments.routes");
const cartRouter = require("./routes/cart.routes")
const cors = require("cors");

const app = express();
app.use(cors());//option to add origin to specific address- white list //ip{"https://..."}
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