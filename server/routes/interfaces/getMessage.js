var express = require('express');
var router = express.Router();
var conn = require('../../connection');
var config = require('../../config');

/* GET home page. */
router.get('/', function(req, res, next) {
	conn.query("SELECT * FROM lanlan.lan_message;",function(data){
		var msg = [];
		for(var i in data){
			var msgitem = {
				name : "小猴子",
				intro : data[i].content,
				img : data[i].img_str
			}
			msg.push(msgitem);
		}

		res.status(200);
		res.json(msg);
		// res.render('index', { title: 'Express' });
	})
	
	var openId = "";
	if(config.clickUserOpenId!=""){
		openId = config.clickUserOpenId;
		config.clickUserOpenId = "";
	}else{
		
	}
	// res.end();

});

module.exports = router;
