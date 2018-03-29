<template>
  <div class="header">
      <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
          <!-- 标题 -->
          <div class="navbar-header">
              <router-link to="/" class="navbar-brand" href="#">My</router-link>
          </div>
          <!-- 导航栏 -->
          <div>
              <ul class="nav navbar-nav" @click="doActive">
                  <li id="rm"><router-link to="/">热门</router-link></li>
                  <li id="lt"><router-link to="/" active-class="active">论坛</router-link></li>
                  <li id="mysort" class="dropdown" > 
                      <router-link to="/" class="dropdown-toggle" active-class="active" data-toggle="dropdown">
                        我的分类
                          <b class="caret"></b>
                      </router-link>
                      <ul class="dropdown-menu">
                          <li><a href="#">jmeter</a></li>
                          <li><a href="#">EJB</a></li>
                          <li><a href="#">Jasper Report</a></li>
                          <li class="divider"></li>
                          <li><a href="#">分离的链接</a></li>
                          <li class="divider"></li>
                          <li><a href="#">另一个分离的链接</a></li>
                      </ul>
                  </li>
              </ul>
          </div>
          <!-- 登陆 -->
          <div class="login pull-right" v-if="!isLogin">
            <router-link to="/login" class="btn btn-default" >登陆</router-link>
            <!-- <button type="button" class="btn btn-default" @click="redirectToLogin">登陆</button> -->
          </div>
          <!-- 注册 -->
          <div class="login pull-right" v-if="!isLogin">
          <router-link to="/regist" class="btn btn-default" >注册</router-link>
            <!-- <button type="button" class="btn btn-default" id="regist" @click="redirectToRegist">注册</button> -->
          </div>
          <!-- 欢迎语 -->
          <div class="login pull-right" v-if="isLogin" >
            <span style="line-height:35px;margin-right:10px;">欢迎您！{{username}}</span>
            <a style="line-height:35px;" @click="dologout">注销</a>
          </div>
          <!-- 发文章按钮 -->
          <div class="add pull-right" v-if="isAdd">
            <router-link to="/add" class="btn btn-default" style="color:#1E90FF">发博客</router-link>
          </div>
          <!-- 搜索框 -->
          <div class="search pull-right">
            <div class="input-group">
              <input type="text" class="form-control">
              <span class="input-group-btn">
                <button class="btn btn-default" type="button">
                  搜索
                </button>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
</template>
<script>
	export default{
		data () {
			return {
				// isLogin:false,
				username:'lan',
				userid:""
			}
		},
		created () {
      var userObj = this.$utils.getUserMsg()

			this.userid = userObj.userid
      this.username = (userObj.username==null?"":userObj.username.substring(0,10) )
		},
    mounted () {
      // 如果地址不是首页，添加校验是否登录
      var path = this.$route.path
      if(path!="/"){
        if(!this.isLogin){
          this.$router.push({path: '/'})   
          alert("请先登录！")
        }
        // // 导航栏高亮变化
        // $("#mysort").addClass("active").siblings().removeClass("active")
      }
    },
		computed:{
	    isLogin :function() {
	      if(this.userid == null || this.userid == ""){
	        return false 
	      }else{
	        return true 
	      }
	    },
      isAdd :function() {
        var path = this.$route.path
        if(path=="/add"){
          return false
        }else return true
       
      }
    },
    methods:{
    	// redirectToLogin () {
     //    // 跳转到login
	    //   this.$router.push({path: '/login'}) 
	    // },
	    // redirectToRegist () {
     //    // 跳转到regist
	    //   this.$router.push({path: '/regist'}) 
	    // },
	    dologout () {
	    	this.userid = ''
        this.$utils.setUserMsg({
          'userid':'',
          'username':''
        })
        this.$router.push({path: '/'}) 
	    },
      doActive (e) {
        // var $li = $(e.target).parent()
        // $li.addClass("active").siblings().removeClass("active")
      }
    }
	}
</script>
<style>
  @import '../style/base/index.css';
  
</style>