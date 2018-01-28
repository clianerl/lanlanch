var express = require('express');
var router = express.Router();
var config = require('../../config');

/* GET home page. */
router.get('/', function(req, res, next) {
	var access_token = config.getAccessToken();
	res.end();
});

module.exports = router;
