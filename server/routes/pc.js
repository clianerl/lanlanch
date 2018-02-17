var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// conn.query("SELECT * FROM lanlan.lan_message;",function(data){
	// 	res.render('index', { title: 'Express' });
	// })
	res.sendfile('../dist/main.html');
});

module.exports = router;
