var express = require('express');
var router = express.Router();
var config = require('../../config');

/* GET home page. */
router.get('/', function(req, res, next) {
	config.getAccessToken(function(access_token){
		// 设置自定义菜单
		console.log("========开始设置自定义菜单=========");
		var https = require('https'); 
		var qs = require('querystring'); 
   
		var getData = { 
		    access_token: access_token
		}
		var getContent = qs.stringify(getData); 
		var postData = {
		    "button": [
		        {
		            "type": "view", 
		            "name": "主页", 
		            "url": "http://www.baidu.com"
		        }
		    ]
		}
		var postContent = qs.stringify(postData); 
		console.log("--postContent:"+postContent);
		var options = { 
		    hostname: 'api.weixin.qq.com', 
		    // port: 10086, 
		    path: '/cgi-bin/menu/create?' + getContent, 
		    method: 'POST',
		    //post请求必须加头文件
		    headers:{
		        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		        'Content-Length':postContent.length
		    } 
		}; 
		console.log('--OPTIONS: ' + JSON.stringify(options)); 
		var reqinner = https.request(options, function (resinner) { 
		    console.log('--STATUS: ' + resinner.statusCode); 
		    console.log('--HEADERS: ' + JSON.stringify(resinner.headers)); 
		    resinner.setEncoding('utf8'); 
		    var body = "";
		    resinner.on('data', function (chunk) { 
		    	body += chunk;
		    }); 
		    resinner.on('end',function(){
		    	var bodyData = eval('('+body+')');
		    	var errcode = bodyData.errcode;
		    	var errmsg = bodyData.errmsg;
		    	if(errcode!=0){
		    		console.log("--请求失败--errcode:"+errcode+",errmsg:"+errmsg);
		    	}else{
		    		console.log("success!")
		    	}
		    	
		    	// if(bodyData.errcode!=undefined){
		    	// 	//如果errcode不为空，则请求失败，重新发送请求
		    	// 	setTimeout(function(){$this.getAccessToken()},"1000");
		    	// }else{
		    	// 	//请求成功，将token存入config
		    	// 	console.log('成功获取access_token！！！开心！！！'); 
		    	// 	$this.access_token = bodyData.access_token;
		    	// 	$this.expires_in = bodyData.expires_in;
		    	// 	$this.starttime = new Date().getTime();
		    	// 	$this.regettime = 0;
		    	// 	console.log("success!!config:"+JSON.stringify($this));
		    	// 	doFun($this.access_token);
		    	// }
		    	res.end();
		    })
		}); 
		reqinner.write(postContent);
		reqinner.on('error', function (e) { 
		    console.log('problem with request: ' + e.message); 
		}); 
		//node 发送请求时，request也必须end，否则会 socket hang up
		reqinner.end;		
	});
	
});

module.exports = router;
