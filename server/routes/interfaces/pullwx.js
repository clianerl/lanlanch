var express = require('express');
var router = express.Router();
var conn = require('../../connection');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.query);
	// conn.query("SELECT * FROM lanlan.lan_message;",function(data){
	// 	var msg = [];
	// 	for(var i in data){
	// 		var msgitem = {
	// 			name : "小猴子",
	// 			intro : data[i].content,
	// 			img : data[i].img_str
	// 		}
	// 		msg.push(msgitem);
	// 	}

	// 	res.status(200),
	// 	res.json(msg)
	// 	// res.render('index', { title: 'Express' });
	// })
});

module.exports = router;
