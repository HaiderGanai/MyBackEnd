const express = require("express");
const { router } = require('./routes/routes');
const { UserModel } = require("./models/userModel");
const { dbConnection, sequelize } = require("./config/dbConnect");
const { booksRouter } = require("./routes/booksRoutes");
const { authRouter } = require("./routes/authRoutes");
const { paymentRouter } = require("./routes/paymentRoutes");
const app = express();
require('./associations');
require('dotenv').config();  // This loads the environment variables from your .env file



app.use(express.json());

app.use('/api', router);
app.use('/api/books',booksRouter);
app.use('/api/auth', authRouter);
app.use('/api/payment',paymentRouter);

sequelize.sync({ force: false})

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server is listen at port ${PORT}`);
    console.log("stripe key:" + process.env.STRIPE_SECRET_KEY);
    dbConnection();
})