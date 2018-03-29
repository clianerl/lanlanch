<template>
<div>
  <myheader></myheader>
  
  <div class="mypage container">
  	<div class="row">
  		<div class="col-sm-2 " style="height:100%;">
  			<span class="my-menu-title">我的文章</span>
  			<ul class="my-menu">
  				<router-link to="/mylist" tag="li">全部文章</router-link>
  				<router-link class="active" to="/classifymanage" tag="li">分类管理</router-link>
  			</ul>
  		</div>
  		<div class="col-sm-10 mylist" style="border-left:1px solid #F0F0F0" >
  			<ul class="list">
  				<li v-for="(li, index) in list">
            <input :disabled="!li.edit" :class="{disable:!li.edit}" v-model="li.name"/>
            <div class="but-group">
              <button v-if="!li.edit" @click="li.edit=true" class="btn-edit">修改</button>
              <button v-if="li.edit" @click="li.edit=false;doSure(li)" class="btn-sure">确定</button>
              <button class="btn-del" @click="doDelete(li.id,index)">删除</button>  
            </div>
          </li>
          <button class="btn-add" @click="addLi">新增</button>
  			</ul>
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
			list:[]
		}
	},
  created () {
    // 初始化下拉类别
      this.showloading()
      var $this = this
      this.$api.post('message/queryClassify', {}, data => {
            console.log(data)
            $this.hideloading()
            if(data.queryflag==0){
              var classifyArr = data.data
              for(var i =0;i<classifyArr.length;i++){
                $this.list.push({
                  name:classifyArr[i].lan_classify_name,
                  id:classifyArr[i].lan_classify_id,
                  edit:false
                })
              }
            }else{
              $this.alertOk("alert","获取类别失败！")
            }
    },data => {
      $this.hideloading()
      $this.alertOk("alert","系统繁忙！")
    })
  },
	components:{
		myheader
	},
	methods: {
    addLi () {
      this.list.push({
        name:'',
        id:null,
        edit:true
      })
    },
    doSure (li) {
      // 修改数据
      this.showloading()
      var $this = this
      var param = {
        name:li.name,
        id:li.id,
        user_id:this.$utils.getUserMsg().userid,  
      }
      this.$api.post('message/insertClassify', param, data => {
            console.log(data)
            $this.hideloading()
            if(data.status==0){
              var id = data.id
              li.id = id
            }else{
              $this.alertOk("alert","添加类别失败！")
            }
      },data => {
        $this.hideloading()
        $this.alertOk("alert","系统繁忙！")
      })
    },
    doDelete (id,index) {
      if(id==null || id==""){
        this.list.splice(index,1)
        return 
      }
      var param = {
        id:id
      }
      this.$api.post('message/deleteClassify', param, data => {
            console.log(data)
            this.hideloading()
            if(data.status==0){
              this.list.splice(index,1)
            }else{
              this.alertOk("alert","添加类别失败！")
            }
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
@import "../style/base/list";
.mylist{
  min-height:600px;
  ul.list li{
    padding:10px 0;
    line-height:20px;
  }
  input{
    display:inline-block;
    padding:0 10px;
    width:50%;
    border:1px solid #ccc;
    border-radius:4px;
  }
  input.disable{
    border:none;
  }
  .but-group{
    display:inline-block;
    width:48%;
    text-align:right;
    button{
      border:none;
      border-radius:4px;
    }
    .btn-sure{
      background-color:rgb(30, 144, 255);
      color:white;
    }
    .btn-del{
      border:1px solid #FF4500;
      color:#FF4500;
    }
    .btn-edit{
      border:1px solid rgb(30, 144, 255);
      color:rgb(30, 144, 255); 
    }
  }
  .btn-add{
    display:block;
    width:200px;
    margin:20px auto;

    border:1px solid #8FBC8F;
    border-radius:4px;
    background-color:#8FBC8F;
    color:white;
  }
}

</style>