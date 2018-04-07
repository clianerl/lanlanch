<template>
<div>
  <myheader></myheader>
  
  <div class="mypage container">
  	<div class="row">
  		<div class="col-sm-2 " style="height:100%;">
  			<!-- 作者信息 -->
        <div class="authormsg">
          <div class="author-photo">
            <img src="static/image/photo.jpg">
          </div>
          <div class="author-name">
            <span>lan</span>
          </div>
          <div class="author-slogan">
            <span>我想在这里说一句话，但是又不知道说点什么啊</span>
          </div>
          <hr>
          <div class="author-hot">
            <ul>
              <li>热门文章1</li>
              <li>热门文章2</li>
              <li>热门文章3</li>
              <li>热门文章4</li>
              <li>热门文章5</li>
            </ul>
          </div>
        </div>
  		</div>
  		<div class="col-sm-10" style="border-left:1px solid #F0F0F0">
  			<DIV class="mycontent">
  				<div class="title"><h3>{{title}}</h3></div>
  				<hr>
          <div class="datetime">{{datetime}}</div>
  				<div class="content" id="content" v-html="content"></div>
				<!-- <div class="form-group" >			
					<button type="button" class="btn btn-default btn-edit" @click="redirectToUpdate">点击编辑</button>
          <button type="button" class="btn btn-default btn-del" @click="doDelete">删除</button>
				</div> -->
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
      id:this.$route.params.id,
      author:''
		}
	},
	components:{
		myheader
	},
	created () {
    // 根据id获取内容
    this.getContent()
	},
	methods: {
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
.authormsg{
  color:#333;
  padding:20px;
  .author-photo{

    width:100%;
    img{
      width:100%;
      height:auto;
      border:1px solid #F0F0F0;
    }
  }
  .author-name{
    margin-top:10px;
    text-align:center;
    padding:0 20px;
    span{
      text-align:center;
      font-size:17px;
    }
  }
  .author-slogan{
    margin-top:10px;
    text-align:left;
    padding:0 20px;
    span{
      font-size:14px;
    }
  }
  .author-hot{
    ul{
      padding:0;
      margin:0;
      list-style:none;
      li{
        display:inline-block;
        height:40px;
        width:100%;
        line-height:20px;
        overflow:hidden;
      }
    }
  }
}
</style>