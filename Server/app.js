const Express = require('express');
const Cors = require('cors');
const Morgan = require('morgan');
const BodyParser = require('body-parser');
const App = Express();

const Routes = require('./api/Routes');

App.use(BodyParser.urlencoded({ extended: true }));
App.use(BodyParser.json());
App.use(Cors());
App.use(Morgan('combined'));

App.use('/api/v1/', Routes);

module.exports = App;