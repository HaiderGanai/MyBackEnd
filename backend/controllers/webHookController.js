const { Purchases } = require('../models/purchaseModel');

const stripe = require('stripe')('sk_test_51P2tVZKkOqRFUJKTytsCeVwS9bkonj4Y8ajGQqOz0A39BV2mkKzx29enX9LQnSvI8DsseZOCI00cYGtcngb16G0800cmNQs9tj');

const stripeWebHook = async (req, res) =>{
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    } catch (error) {
        return res.status(400).send(`webhook Error: ${error.message}`);
    }

    if(event.type === 'payment_intent.succeeded'){
        const paymentIntent = event.data.object;

        console.log("payment succeeded for intent: ", paymentIntent.id);

        //updating the schema
        await Purchases.update(
            {status: "success"},
            {where: { paymentIntentId: paymentIntent.id }}
        );
        return res.json({ received: true });
    }
    return res.json({ received: true });
};

module.exports = { stripeWebHook };