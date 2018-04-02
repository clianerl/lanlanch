<template>
<div>
  <myheader></myheader>
  
  <div class="mypage container">
  	<div class="row">
  		<div class="col-sm-2 " style="height:100%;">
  			<leftpanel :mylist-active="false" :classifymanage-active="false"></leftpanel>
  		</div>
  		<div class="col-sm-10" style="border-left:1px solid #F0F0F0">
  			<DIV class="mycontent">
  				<div class="title"><h3>{{title}}</h3></div>
  				<hr>
          <div class="datetime">{{datetime}}</div>
  				<div class="content" id="content" v-html="content"></div>
				<div class="form-group" >			
					<button type="button" class="btn btn-default btn-edit" @click="redirectToUpdate">点击编辑</button>
          <button type="button" class="btn btn-default btn-del" @click="doDelete">删除</button>
				</div>
  			</DIV>
  		</div>
  	</div>
  </div>
  </div>
</template>
<script>
import myheader from '../components/header.vue'
import leftpanel from '../components/leftPanel.vue'

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
		myheader,leftpanel
	},
	created () {
    // 根据id获取内容
    this.getContent()
	},
	methods: {
        redirectToUpdate () {
        	console.log(this.$route.params.id)
        	sessionStorage.setItem('title', this.title)
        	sessionStorage.setItem('content', this.content)
        	this.$router.push({path: '/update/'+this.id});
        },
        // 根据ID获取文章内容
        getContent () {
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
              this.content = message.str_content
              this.datetime = message.datetime
            }else{
              this.alertOk("alert",data.errormsg)
            }
          },data => {
            this.hideloading()
            this.alertOk("alert","系统繁忙！")
          })
        },
        // 点击删除按钮，删除当前文章
        doDelete () {
          var param = {
                'id':this.id
              }
          this.showloading()
          this.$api.get('message/delMessage', param, data => {
            console.log(data)
            this.hideloading()
            this.$router.push({path: '/mylist/all'});
          },data => {
            this.hideloading()
            this.alertOk("alert","系统繁忙！")
          })
        }
    }
}
</script>
<style scoped  lang="scss">
@import "../style/base/add";
$btn-color : #FF4500;
.mycontent{
  .datetime{
    margin-top:-15px;
    color:#999;
  }
  .content{
    margin-top:5px;
  }
  .btn-edit{
    border:1px solid dodgerblue;
    color:dodgerblue;
  }
  .btn-del{
    margin-left:15px;

    border:1px solid $btn-color; 
    color:$btn-color ;
    background-color:white ;
  }
}
</style>