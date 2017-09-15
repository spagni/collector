const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//Se importa el model así porque si hacemos un require del archivo, puede pinchar en algun framework de testing al requerir varias veces el modelo
const Survey = mongoose.model('surveys');

module.exports = app => {
	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title: title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })), // ES6 es lo mismo que map(email => { return { email: email }})
			_user: req.user.id,
			dateSent: Date.now()
		});

		const mailer = new Mailer(survey, surveyTemplate(survey));
		mailer
			.send()
			.then(() => survey.send())
			.then(() => {
				req.user.credits -= 1;
				req.user.save();
			})
			.then(user => res.send(user))
			.catch(err => res.status(422).send(err));
	});
};
