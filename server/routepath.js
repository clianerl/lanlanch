var index = require('./routes/index');
var users = require('./routes/users');
var getMessage = require('./routes/interfaces/getMessage');
var pullwx = require('./routes/interfaces/pullwx');
var setmenu = require('./routes/interfaces/setmenu');
var pc = require('./routes/pc');

function setPath(app){
	app.use('/', index);
	app.use('/users', users);
	app.use('/node/getMessage',getMessage);
	app.use('/wx',pullwx);
	app.use('/setMenu',setmenu);
	app.use('/pc',pc);
}
module.exports = setPath
