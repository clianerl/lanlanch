var express = require('express');
var router = express.Router();
var conn = require('../../connection');
var xml2js = require('xml2js');
var config = require('../../config');

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
  console.log("####wx start");


  if(req.query.echostr!=undefined){//说明是服务配置校验接口信息
      serverCheck(req, res);
  }else{//消息接收
      reciveMessage(req,res);
  }




}

function serverCheck(req,res){
    console.log("###服务配置检验###");

  var query = url.parse(req.url, true).query;
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

function  reciveMessage(req,res){

    console.log("####消息信息数据获取#####");
  var data ="";
  req.setEncoding('utf8');
  req.on('data',function(c){
    data +=c;
  });
  req.on('end',function(){
    //console.log(data);
    var retXml = parseMessage(data);
    res.send(retXml);
  });
  //res.end(data);
}

function  parseMessage(data){
  var MsgType = data.substring((data.indexOf("<MsgType>")+("<MsgType>").length),data.indexOf("</MsgType>"));
  console.log("接收消息类型："+MsgType+"    ,消息详细信息："+data);
  if(MsgType.indexOf("text")){
    //文字的时候才回复
    console.log("###消息接收解析并回复###");
    var FromUserName = data.substring((data.indexOf("<FromUserName>")+("<FromUserName>").length),data.indexOf("</FromUserName>"));
    var ToUserName = data.substring((data.indexOf("<ToUserName>")+("<ToUserName>").length),data.indexOf("</ToUserName>"));
    //===构造返回信息
    var xml = "<xml> <ToUserName>"+FromUserName+"</ToUserName> <FromUserName>"+ToUserName+"</FromUserName>"+
    "<CreateTime>"+Date.parse(new Date())+"</CreateTime> <MsgType><![CDATA[text]]></MsgType> <Content><![CDATA[兰兰欢迎您!]]></Content> </xml>";
    console.log(xml);
    return xml;
  }else if(MsgType.indexOf("event")){
    //如果是点击按钮事件，则把用户的openid放在一个全局变量里面，跳转链接页面会取到数据
    var FromUserName = data.substring((data.indexOf("<FromUserName>")+("<FromUserName>").length),data.indexOf("</FromUserName>"));
    FromUserName = FromUserName.split('< ![CDATA[')[1];
    FromUserName = FromUserName.split('] ]')[0];
    config.clickUserOpenId = FromUserName;
  }
}


/* GET home page. */
router.all('/',wechatAuth);

module.exports = router;
