<template>
<div>
  <myheader></myheader>
  
  <div class="mypage container">
  	<div class="row">
  		<div class="col-sm-2 " style="height:100%;">
  			<span class="my-menu-title">我的文章</span>
  			<ul class="my-menu">
  				<router-link to="/mylist" tag="li">全部文章</router-link>
  				<router-link to="/classifymanage" tag="li">分类管理</router-link>
  			</ul>
  		</div>
  		<div class="col-sm-10" style="border-left:1px solid #F0F0F0">
  			<DIV class="mycontent">
  				<div class="title"><h3>{{title}}</h3></div>
  				<hr>
          <div class="datetime">{{datetime}}</div>
  				<div class="content" id="content" v-html="content"></div>
				<div class="form-group" >			
					<button type="button" class="btn btn-default" @click="redirectToUpdate">点击编辑</button>
				</div>
  			</DIV>
  		</div>
  	</div>
  </div>
  </div>
</template>
<script>
import myheader from '../components/header.vue'

export default {
	data () {
		return {
			title:"--",
			content:"--",
      datetime:'--',
      id:this.$route.params.id
		}
	},
	components:{
		myheader
	},
	created () {
    // 根据id获取内容
    var param = {
          'id':this.id
        }
    this.showloading()
    this.$api.get('message/queryMessageById', param, data => {
      console.log(data)
      this.hideloading()
      if(data.status==0){
        var message = data.data[0]
        this.title = message.title
        this.content = message.content
        this.datetime = message.datetime
      }else{
        this.alertOk("alert",data.errormsg)
      }
    },data => {
      this.hideloading()
      this.alertOk("alert","系统繁忙！")
    })
	},
	methods: {
        redirectToUpdate () {
        	console.log(this.$route.params.id)
        	sessionStorage.setItem('title', this.title)
        	sessionStorage.setItem('content', this.content)
        	this.$router.push({path: '/update/'+this.id});
        }
    }
}
</script>
<style scoped  lang="scss">
@import "../style/base/add";
.mycontent{
  .datetime{
    margin-top:-15px;
    color:#999;
  }
  .content{
    margin-top:5px;
  }
}
</style>