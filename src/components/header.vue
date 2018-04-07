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
              <ul class="nav navbar-nav">
                  <li id="rm"><router-link to="/">热门</router-link></li>
                  <li id="lt"><router-link to="/lt">论坛</router-link></li>
                  <li id="mysort" class="dropdown" > 
                      <router-link to="/mylist/all" class="dropdown-toggle" data-toggle="dropdown">
                        我的分类
                          <b class="caret"></b>
                      </router-link>
                      <ul class="dropdown-menu" v-if="classifyArr.length!=0">
                          <li v-for="c in classifyArr">
                            <a href="javascript:void(0)" @click="linkToList(c.id)">{{c.name}}</a>
                          </li>
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
				userid:"",
        classifyArr:[]
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
      if(!this.isLogin){
        if(path!="/" && path.indexOf("/indexcontent")==-1){
          // 没登录，并且不是在首页，则提示登录，并跳转回首页
          this.$router.replace({path: '/login'})   
          alert("请先登录！")
        }
      }else{
        //已登录状态下，header才加载我的类别下级菜单
        this.initClassify()
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
	    dologout () {
	    	this.userid = ''
        this.$utils.setUserMsg({
          'userid':'',
          'username':''
        })
        this.$router.push({path: '/'}) 
	    },
      linkToList (id) {
        this.$router.push({path: '/mylist/'+id}) 
      },
      initClassify () {
        // 初始化下拉类别
        this.showloading()
        var $this = this
        this.$api.get('message/queryClassify', {userid:this.userid}, data => {
              console.log(data)
              $this.hideloading()
              if(data.queryflag==0){
                var classifyArr = data.data
                for(var i =0;i<classifyArr.length;i++){
                  $this.classifyArr.push({
                    name:classifyArr[i].lan_classify_name,
                    id:classifyArr[i].lan_classify_id
                  })
                }
              }else{
                $this.alertOk("alert","获取文章类别失败！")
              }
        },data => {
          $this.hideloading()
          $this.alertOk("alert","系统繁忙！")
        })
      }
    }
	}
</script>
<style>
  @import '../style/base/index.css';
  
</style>