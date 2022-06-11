import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createStripeSession(req, res) {
    if (req.method === 'POST') {
        try {
            const {item} = req.query;
			const stripeSession = await stripe.checkout.sessions.create({
				line_items: [
					{
                       price_data: {
                           currency: "zar",
                           product_data: {
                               images: [item.image],
                               name: item.name,
                           },
                           unit_amount: item.price
                       }
					},
				],
				payment_method_types: ["card"],
				mode: 'payment',
				success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/?canceled=true`,
			});
			res.redirect(303, stripeSession.url);
        } catch(error) {
            res.status(error.statusCode || 500 ).json(error.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
    }
}

export default createStripeSession;