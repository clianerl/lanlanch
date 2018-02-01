var express = require('express');
var router = express.Router();
var conn = require('../connection');

/* GET home page. */
router.get('/', function(req, res, next) {
	// conn.query("SELECT * FROM lanlan.lan_message;",function(data){
	// 	res.render('index', { title: 'Express' });
	// })
	res.send("Welcome!!!");
});

module.exports = router;
