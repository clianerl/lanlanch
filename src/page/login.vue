<template>
<div>
  <div class="row login row-content">
	<div class="left-panel col-sm-4">
	  <div class="text">
	  	<h2>知识～</h2>
	  	<h2>&nbsp;&nbsp;&nbsp;就是力量</h2>
	  </div>
	</div>
	<div class="right-panel col-sm-8">
		<form class="form-horizontal login-form" role="form">
			<div class="form-group">
				<label for="username" class="col-sm-4 control-label">用户名</label>
				<div class="col-sm-8">
					<input type="text" class="form-control" id="username" 
						   placeholder="请输入用户名">
				</div>
			</div>
			<div class="form-group">
				<label for="password" class="col-sm-4 control-label">密码</label>
				<div class="col-sm-8">
					<input type="text" class="form-control" id="password" 
						   placeholder="请输入密码">
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
					<button type="submit" class="btn btn-default login-button" id="login_button">登录</button>
				</div>
			</div>
		</form>
		<button class="btn btn-default returntoindex" id="returntoindex" @click="returntoindex">返回首页</button>
	</div>
  </div class="row">
	
</div>
</template>
<script>
	/* eslint-disable */
export default {
	// data () {
	// 	return {}
	// },
	mounted () {
	  
	},
	methods: {
		returntoindex () {
			this.$router.push({path: '/'});
		}
	}
}
</script>
<style 	scoped>
@import '../style/base/login.css'
</style>