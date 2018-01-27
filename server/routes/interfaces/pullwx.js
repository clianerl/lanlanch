var express = require('express');
var router = express.Router();
var conn = require('../../connection');


const crypto = require('crypto');
const path = require('path');
const url = require('url');



//进行sha1加密
function sha1(str) {
  var shasum = crypto.createHash("sha1");
  shasum.update(str);
  str = shasum.digest("hex");
  return str;
}

function wechatAuth(req, res) {
  var query = url.parse(req.url, true).query;
  console.log("####wx content");
  console.log(query);
  
  var signature = query.signature;
  var echostr = query.echostr;
  var timestamp = query['timestamp'];
  var nonce = query.nonce;

  var reqArray = [nonce, timestamp, 'chonglou159'];

  //对数组进行字典排序
  reqArray.sort();
  var sortStr = reqArray.join('');//连接数组
  var sha1Str = sha1(sortStr);

  if (signature === sha1Str) {
    res.end(echostr);
  } else {
    res.end("false");
    console.log("授权失败!");
  }
}


/* GET home page. */
router.get('/',wechatAuth);

module.exports = router;
