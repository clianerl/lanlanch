var config = {
	'appid':'wx712a66d9433a366b',
	'secret':'ba011511bcb3e1af1438253f692887ad',
	'access_token':'',
	'starttime':'',
	'expires_in':'',
	'regettime':0,
	accessTokenIsRight:function(){
		if(this.access_token=='' || this.starttime=='' || this.expires_in=='')return false;
		if((this.starttime+(this.expires_in*1000))<=(new Date().getTime())){
			//说明失效了，重新获取
			return false;
		}else{
			return true;
		}
	},
	getAccessToken:function(){
		console.log("==========getAccessToken start=======")
		if(this.accessTokenIsRight()){
			return this.access_token;
		}
		var https = require('https'); 
		var qs = require('querystring'); 
   
		var data = { 
		    grant_type: 'client_credential', 
		    appid: this.appid,
		    secret: this.secret
		}
		   
		var content = qs.stringify(data); 
		   
		var options = { 
		    hostname: 'api.weixin.qq.com', 
		    // port: 10086, 
		    path: '/cgi-bin/token?' + content, 
		    method: 'GET' 
		}; 
		   
		var req = https.request(options, function (res) { 
			console.log('OPTIONS: ' + JSON.stringify(options)); 
		    console.log('STATUS: ' + res.statusCode); 
		    console.log('HEADERS: ' + JSON.stringify(res.headers)); 
		    res.setEncoding('utf8'); 
		    var body = "";
		    res.on('data', function (chunk) { 
		    	body+=chunk;
		    }); 
		    res.on('end',function(){
		    	console.log('BODY: ' + body); 
		    	if(eval('('+body+')').errcode!=undefined){

		    	}
		    	return "access_token";
		    })
		}); 
		   
		req.on('error', function (e) { 
		    console.log('problem with request: ' + e.message); 
		}); 
		   
		req.end();

	}
}


module.exports = config;