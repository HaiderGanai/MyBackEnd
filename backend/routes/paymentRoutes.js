const express = require("express");
const { authenticateJWT } = require("../middlewares/authenticateJWT");
const { createPaymentIntent } = require("../controllers/paymentController");
const { stripeWebHook } = require("../controllers/webHookController");

const paymentRouter = express.Router();


//Payment intent route
paymentRouter.post('/create-payment-intent', authenticateJWT, createPaymentIntent);

paymentRouter.post('/stripe-webhook',
    express.raw({ type: 'application/json' }),
    stripeWebHook
);


module.exports = { paymentRouter };