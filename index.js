const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require('body-parser');
const keys = require("./config/keys");
require("./models/User");
require('./models/Survey');
require("./services/passport");
const port = process.env.PORT || 5000;

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === 'production') {
	//Express will serve up production assets like main.js or main.css
	app.use(express.static('client/build'));

    //Express will serve up the index.html if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(port);
