<template>
<div>
  <myheader></myheader>
  
  <div class="pageadd container">
    <div class="row">
      <div class="col-sm-2 " style="height:100%;">
        <span class="my-menu-title">我的文章</span>
        <ul class="my-menu">
          <li >全部文章</li>
          <li >分类管理</li> 
        </ul>
      </div>
      <div class="col-sm-10" style="border-left:1px solid #F0F0F0">
        <DIV class="myeditor">
          <div class="form-group">
          <label for="name">标题</label>
          <input type="text" class="form-control" placeholder="请输入标题" v-model="editorTitle">
        </div>
        <div class="form-group" style="margin-bottom:-1px;">
            <div id="editorNav" class="editor-nav" style="text-align:left" v-model="editorContent"></div>
          </div>
          <div class="form-group">
            <div id="editorContent" class="editor-content" style="text-align:left"></div> 
          </div>
          <div class="form-group choose-sort" >   
          <label for="name">选择分类</label>
          <select class="form-control" v-model="fl">
            <option value="fl1">分类1</option>
            <option value="fl2">分类2</option>
            <option value="fl3">分类3</option>
            <option value="fl4">分类4</option>
            <option value="fl5">分类5</option>
          </select>
        </div>
        <div class="form-group add-sort" >    
          <label for="name">新增分类</label>
          <input type="text" class="form-control" placeholder="请输入分类名称">
          <button type="button" class="btn btn-default">+</button>
        </div>
        <div class="form-group">
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="isSecret">保存为私密
              </label>
            </div>
        </div>
        <div class="form-group" >     
          <button type="button" class="btn btn-default" @click="doAdd">发布</button>
        </div>
        </DIV>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import myheader from '../components/header.vue'
import E from 'wangeditor'

export default {
  data () {
    return {
      editorContent: '',
      editorTitle:'',
      isSecret:false,
      fl:'我的文章'
    }
  },
  components:{
    myheader
  },
  methods: {
        getContent () {
            this.alertOk("alert",this.editorContent)
        },
        doAdd () {
          // 判断标题和内容是否为空
          if(this.editorTitle == ''){
            this.alertOk("alert","标题不能为空！")
            return false
          }
          if(this.editorContent == ''){
            this.alertOk("alert","内容不能为空！")
            return false
          }
          var param = {
            'title':this.editorTitle,
            'content':this.editorContent,
            'isSecret':this.isSecret,
            'fl':this.fl
          }
          //TODO 添加内容
          this.showloading()
   //       this.$api.post('user/add', param, data => {
      //         console.log(data)
      //         $this.hideloading()
      //         if(data.loginflag=="success"){
      //          this.alertOk("alert","发布成功！")
      //          var userid = data.userid
      //          // $this.$utils.setCookie("userid",userid);
      //          // $this.$utils.setCookie("username",username);
      //          this.$utils.setUserMsg({
      //            'userid':userid,
      //            'username':username
      //          })
      //          setTimeout(function(){$this.$router.push({path: '/'})},1000)
      //         }else{
      //          alert("登录失败，请重试或联系管理员")
      //         }
      // },data => {
      //  console.log(data)
      //  $this.hideloading()
      //  alert("系统繁忙")
      // })
      var $this = this
      setTimeout(function(){
        $this.hideloading()
        $this.$router.push({path: '/'})
      },1000)
        }
    },
  mounted() { 
      var editor = new E('#editorNav','#editorContent')
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      // 开启debug模式
      editor.customConfig.debug = true
      // 开启上传本地图片
      editor.customConfig.uploadImgServer = '/upload'
      // 将图片大小限制为 3M
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
    // 限制一次最多上传 5 张图片
    editor.customConfig.uploadImgMaxLength = 5
    editor.customConfig.customAlert = function (info) {
        // info 是需要提示的内容
        alert('自定义提示：' + info)
    }
      editor.create()
  }
}
</script>
<style scoped>
.pageadd.container{
  width:100%;
  padding:0 30px;
  margin-bottom:20px;
}
.pageadd.container>.row{background-color: white;}
.pageadd.container>.row>div{padding:0;}
.pageadd.container .my-menu{
  height:100%;
  width:100%;
  padding:0;
  margin:0;

  list-style: none;
  background-color: white;
}
.pageadd.container .my-menu-title{
  display: inline-block;
  width:100%;
  line-height:50px;
  padding:0 20px;

  color:#bbb;

  font-size:14px;
}
.pageadd.container .my-menu>li{
  line-height:35px;
  padding:0 30px;

  color:#666;
}
.pageadd.container .my-menu>li:hover{
  background-color: rgb(30, 144, 255);
  color:white;
  cursor:pointer;
}
.pageadd.container .myeditor{padding:20px;}
.pageadd.container .editor-nav{
  height:30px;

  background-color: white;
  border: 1px solid #ccc;
}
.pageadd.container .editor-content{
  height: 500px;
  padding-bottom:40px;
  border: 1px solid #ccc;
  background-color:white;
}
.choose-sort{width:200px;}
.add-sort>label{width:100%;}
.add-sort>input{width:150px;display:inline-block;}
.add-sort>button{width:40px;display:inline-block;}
</style>