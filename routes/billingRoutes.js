const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
	app.post('/api/stripe', (req, res) => {
    stripe.charges.create({
      amount: 500,
      currency: 'USD',
      description: 'Credits purchase',
      source: req.body.id
    })
      .then(charge => {
        console.log(charge);
      });
  });
};
