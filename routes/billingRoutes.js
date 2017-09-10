const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/stripe', requireLogin, (req, res) => {
		stripe.charges
			.create({
				amount: 500,
				currency: 'USD',
				description: 'Credits purchase',
				source: req.body.id
			})
			.then(charge => {
				//PassportJS hace un append del user al request cuando lo deserializa(middleware) y nosotros lo tenemos disponible en todos los request
				req.user.credits += 5;
				req.user.save().then(user => {
					res.send(user);
				});
			});
	});
};
