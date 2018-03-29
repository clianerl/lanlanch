var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// conn.query("SELECT * FROM lanlan.lan_message;",function(data){
	// 	res.render('index', { title: 'Express' });
	// })
	// res.sendfile('main');
	res.render("pc!!!");
});

module.exports = router;
