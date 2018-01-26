var index = require('./routes/index');
var users = require('./routes/users');
var getMessage = require('./routes/interfaces/getMessage');

function setPath(app){
	app.use('/', index);
	app.use('/users', users);
	app.use('/node/getMessage',getMessage);
}
module.exports = setPath
