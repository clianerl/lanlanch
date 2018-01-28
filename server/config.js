var config = {
	'appid':'wx712a66d9433a366b',
	'secret':'ba011511bcb3e1af1438253f692887ad',
	'access_token':'',
	'starttime':'',
	'expires_in':'',
	'regettime':0,
	'max_regettime':5,
	accessTokenIsRight:function(){
		if(this.access_token=='' || this.starttime=='' || this.expires_in=='')return false;
		if((this.starttime+(this.expires_in*1000))<=(new Date().getTime())){
			//说明失效了，重新获取
			return false;
		}else{
			return true;
		}
	},
	getAccessToken:function(doFun){
		//记录请求次数，最多五次
		this.regettime++;
		if(this.regettime>this.max_regettime){
			console.log("超出第"+this.max_regettime+"次请求微信服务器～不再请求～");
			console.log("获取微信access_token失败！！！请检查网络连接～");
			return false;
		}
		console.log("第"+this.regettime+"次请求微信服务器～");
		console.log("==========getAccessToken start=======")
		if(this.accessTokenIsRight()){
			console.log("!!already had access_token!!"+this.access_token);
			doFun(this.access_token);
		}
		console.log("!!get new access_token!!")
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
		var $this = this;
		console.log('我要开始发送get请求了！'); 
		var req = https.request(options, function (res) { 
			console.log('--OPTIONS: ' + JSON.stringify(options)); 
		    console.log('--STATUS: ' + res.statusCode); 
		    console.log('--HEADERS: ' + JSON.stringify(res.headers)); 
		    res.setEncoding('utf8'); 
		    var body = "";
		    res.on('data', function (chunk) { 
		    	body += chunk;
		    }); 
		    res.on('end',function(){
		    	console.log('BODY: ' + body); 
		    	var bodyData = eval('('+body+')');
		    	if(bodyData.errcode!=undefined){
		    		//如果errcode不为空，则请求失败，重新发送请求
		    		setTimeout(function(){$this.getAccessToken(doFun)},"1000");
		    	}else{
		    		//请求成功，将token存入config
		    		console.log('成功获取access_token！！！开心！！！'); 
		    		$this.access_token = bodyData.access_token;
		    		$this.expires_in = bodyData.expires_in;
		    		$this.starttime = new Date().getTime();
		    		$this.regettime = 0;
		    		console.log("success!!config:"+JSON.stringify($this));
		    		doFun($this.access_token);
		    	}
		    })
		}); 
		   
		req.on('error', function (e) { 
		    console.log('problem with request: ' + e.message); 
		}); 
		//node 发送请求时，request也必须end，否则会 socket hang up
		req.end();
		
	}
}


module.exports = config;