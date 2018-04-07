<template>
<div>
<!-- <myAlert :show="showAlert" :type="alertType" :text="alertText" :ok="alertOk" :cancel="alertCancel"></myAlert> -->
  <div class="row row-content">
	<div class="left-panel col-sm-4">
	  <div class="text">
	  	<h2>请在右侧输入～</h2>
	  	<h2>&nbsp;&nbsp;&nbsp;您的注册信息</h2>
	  </div>
	</div>
	<div class="right-panel col-sm-8">
		<form class="form-horizontal login-form" role="form">
			<div class="form-group">
				<label for="username" class="col-sm-4 control-label">用户名</label>
				<div class="col-sm-8">
					<input type="text" class="form-control" id="username" v-model="username"
						   placeholder="请输入用户名" @focus="removeReadonly" readonly>
				</div>
			</div>
			<div class="form-group">
				<label for="password" class="col-sm-4 control-label">密码</label>
				<div class="col-sm-8">
					<input type="password" class="form-control" id="password" v-model="password"
						   placeholder="请输入密码" @focus="removeReadonly" readonly>
				</div>
			</div>
			<!-- <div class="form-group">
				<div class="col-sm-offset-2 col-sm-10">
					<div class="checkbox">
						<label>
							<input type="checkbox"> 请记住我
						</label>
					</div>
				</div>
			</div> -->
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-10">
					<button type="submit" class="btn btn-default login-button" id="login_button" @click="doRegist">注册</button>
				</div>
			</div>
			<div class="form-group" style="padding-left:50px;">
				<router-link to="/login" style="display:inline-block;text-decoration:underline;width:100%;text-align:center;">已有账号，去登录</router-link>
			</div>
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-10">
					<span class="errmsg"><b>{{errMsg}}</b></span>
				</div>
			</div>
		</form>
		<button class="btn btn-default returntoindex" id="returntoindex" @click="returntoindex">返回首页</button>

	</div>
  </div class="row">
	

</div>
</template>
<script>
export default {
	data () {
		return{
			username:"",
			password:"",
			errMsg:""
		}
	},
	mounted () {
	  
	},
	methods: {
		doRegist () {
			if(!this.doCheck()){
				return false;
			}
			var $this = this
			$this.showloading()
			var param = {
		    		name:this.username,
		    		password:this.password
			}
		    this.$api.post('user/regUserInfo', param, data => {
			        console.log(data)
			        alert("注册成功！自动跳转到登录～")
			        $this.hideloading()
			        setTimeout(function(){
			        	$this.$router.push({path: '/login'})
			        },500)
			},data => {
				console.log(data)
				$this.hideloading()
				alert("系统繁忙")
			})
		},
		doCheck () {
			var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    		regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
			var n = this.username;
			var p = this.password;
			if(n=="" || n == null){
				this.errMsg = "用户名不能为空"
				return false;
			}else if (regEn.test(n) || regCn.test(n)) {
				this.errMsg = "用户名不能包含特殊字符"
				return false;
			}
			if(p=="" || p == null){
				this.errMsg = "密码不能为空"
				return false;
			}else if (regEn.test(p) || regCn.test(p)) {
				this.errMsg = "密码不能包含特殊字符"
				return false;
			}
			return true;
		},
		returntoindex () {
			this.$router.push({path: '/'});
		},
		removeReadonly (events) {
			$(events.target).removeAttr("readonly")
		}
	}
}
</script>
<style scoped>
@import '../style/base/login.css'
</style>