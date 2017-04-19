const path = require('path');
const debug = require('debug')('express');
const express = require('express');

require('dotenv').config();

const app = express();

// Settings
app.set('view engine', 'ejs');
app.set('port', process.env.PORT);

// Static file serving
app.use('/assets', express.static(path.join(__dirname + '/build')))

app.get('/', (req, res) => {
	res.render('pages/index');
});

app.listen(app.get('port'), (err) => {
	if (err) debug(err);
	debug(`listening on http://localhost:${app.get('port')}`);
});
