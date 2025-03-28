const { Purchases } = require('../models/purchaseModel');

const stripe = require('stripe')('sk_test_51P2tVZKkOqRFUJKTytsCeVwS9bkonj4Y8ajGQqOz0A39BV2mkKzx29enX9LQnSvI8DsseZOCI00cYGtcngb16G0800cmNQs9tj'); // this line is causing error in my code


const createPaymentIntent = async (req, res) => {
    try {
        const { amount, bookId, userId } = req.body;

        if (!amount || !bookId || !userId) {
            return res.status(400).json({ message: "Amount, bookId, and userId are required" });
        }

        // Create Payment Intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: "usd",
        });

        // Create a new purchase record with the payment intent
        await Purchases.create({
            purchaseDate: new Date(),
            paymentIntentId: paymentIntent.id,
            amount,
            status: "pending",
            userId,
            BookId: bookId,
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            message: "Payment initiated",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Payment failed", error });
    }
};


module.exports = { createPaymentIntent };