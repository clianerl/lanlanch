<template>
<div>
  <myheader></myheader>
  
  <div class="mypage container">
  	<div class="row">
  		<div class="col-sm-2 " style="height:100%;">
  			<leftpanel :mylist-active="false" :classifymanage-active="true"></leftpanel>
  		</div>
  		<div class="col-sm-10 mylist" style="border-left:1px solid #F0F0F0" >
  			<ul class="list">
  				<li v-for="(li, index) in list">
            <input :disabled="!li.edit" :class="{disable:!li.edit}" v-model="li.name"/>
            <div class="but-group">
              <button class="btn-num" v-if="li.id!=null">{{li.num}}</button>
              <button v-if="!li.edit" @click="li.edit=true" class="btn-edit">修改</button>
              <button v-if="li.edit" @click="doSure(li)" class="btn-sure">确定</button>
              <button class="btn-del" @click="doDelete(li.id,index)">删除</button>  
            </div>
          </li>
          <li v-if="list.length==0" style="border:none;color:#9D9D9D;">暂无分类</li>
          <button class="btn-add" @click="addLi">新增</button>
  			</ul>
  		</div>
  	</div>
  </div>
  </div>
</template>
<script>
import myheader from '../components/header.vue'
import leftpanel from '../components/leftPanel.vue'
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
      this.$api.get('message/queryClassify', {userid:this.$utils.getUserMsg().userid}, data => {
            console.log(data)
            $this.hideloading()
            if(data.queryflag==0){
              var classifyArr = data.data
              var classifyNumArr = data.classifyNum
              for(var i =0;i<classifyArr.length;i++){
                this.list.push({
                  name:classifyArr[i].lan_classify_name,
                  id:classifyArr[i].lan_classify_id,
                  edit:false,
                  num:0
                })
              }
              for(i=0;i<this.list.length;i++){
                for(var j =0;j<classifyNumArr.length;j++){
                  if(this.list[i].id == classifyNumArr[j].lan_classify_id){
                    this.list[i].num = classifyNumArr[j].num
                  }  
                }
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
		myheader,leftpanel
	},
	methods: {
    // 点击新增，页面上添加一行数据
    addLi () {
      this.list.push({
        name:'',
        id:null,
        edit:true
      })
    },
    // 点击确认，新增或修改数据
    doSure (li) {
      // 修改数据
      // 最大字数20字
      if(li.name.length>20){
        this.alertOk("alert","类别字数不能超过20字")
        return false
      }
      this.showloading()
      var param = {
        name:li.name,
        id:li.id,
        user_id:this.$utils.getUserMsg().userid,  
      }
      // 后台根据id是否为空，判断是新增还是修改
      this.$api.post('message/insertClassify', param, data => {
            console.log(data)
            this.hideloading()
            if(data.status==0){
              var id = data.id
              li.id = id
              li.edit=false
            }else{
              this.alertOk("alert","添加类别失败！")
            }
      },data => {
        this.hideloading()
        this.alertOk("alert","系统繁忙！")
      })
    },
    // 点击删除，删除类别
    doDelete (id,index) {
      if(id==null || id==""){
        this.list.splice(index,1)
        return 
      }
      // 如果类别下已经有文章，不允许删除
      if(this.list[index].num>0){
        this.alertOk("alert","此类别下有文章，不可删除类别")
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
  ul.list li:hover{
    background-color:#F0F0F0;
    input{
      background-color:#F0F0F0;
    }
  }
  input{
    display:inline-block;
    padding:0 10px;
    width:48%;
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
    .btn-num{
      background-color:#999;
      color:white;
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
    margin:20px 0;

    border:1px solid #8FBC8F;
    border-radius:4px;
    background-color:#8FBC8F;
    color:white;
  }
}

</style>