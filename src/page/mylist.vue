<template>
<div>
  <myheader></myheader>
  
  <div class="mypage container">
  	<div class="row">
  		<div class="col-sm-2 " style="height:100%;">
  			<span class="my-menu-title">我的文章</span>
  			<ul class="my-menu">
  				<li class="active">全部文章</li>
  				<router-link to="/classifymanage" tag="li">分类管理</router-link>
  			</ul>
  		</div>
  		<div class="col-sm-10" style="border-left:1px solid #F0F0F0">
  			<DIV class="mylist">
  				<div class="form-group choose-sort" >		
					<label for="name">选择分类</label>
					<select class="form-control" name="fl1" v-model="fl">
						<option v-for="c in classifyArr" :value="c.id">{{c.name}}</option>
					</select>
				</div>
				<div class="form-group">
  					<ul class="list">
  						<li v-for="m in messageArr" >
  							<span class="title" @click="redirectToContent(m.id)">{{m.title}}</span>
  							<span class="list-right">
  								<button >{{m.lan_classify_name}}</button>
  								<span v-if="m.is_secret" class="icon glyphicon glyphicon-lock"></span>
  							</span>
  						</li>
  					</ul>
  				</div>
  				<div class="form-group">
  					 <pagination :show="pageShow" :now="pageNow" :max="pageMax" @changePage="changePage"></pagination>
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
import pagination from '../components/pagination.vue'
export default {
	data () {
		return {
			pageNow:1,
			pageMax:0,
			pageShow:true,
			classifyArr:[{name:'全部',id:'all'}],
			fl:'all',
			userid:this.$utils.getUserMsg().userid,
			messageArr:[]
		}
	},
	components:{
		myheader,pagination
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
		// 初始化显示第一页
		this.getMessage()
	},
	methods: {
        changePage (now) {
        	// 点击页码，请求新数据
        	this.pageNow = now
        	this.getMessage()
        },
        getMessage (){
        	var param = {
        		'pageno':this.pageNow,
        		'userid':this.userid
        	}
        	this.showloading()
        	this.$api.get('message/queryMessageByUser', param, data => {
			        this.hideloading()
			        if(data.status==0){
			        	this.messageArr = data.data
			        	for(var i =0;i<this.messageArr.length;i++){
			        		if(this.messageArr[i].is_secret=="0"){
			        			this.messageArr[i].is_secret = false
			        		}else{
			        			this.messageArr[i].is_secret = true
			        		}
			        	}
			        	this.pageMax = data.count
			        	this.pageNow = data.pageno
			        }else{
			        	this.alertOk("alert","发布失败！")
			        }
			},data => {
				this.hideloading()
				this.alertOk("alert","系统繁忙！")
			})
        },
        redirectToContent (id) {
        	this.$router.push({path: '/listcontent/'+id})
        }
    }
}
</script>
<style scoped  lang="scss">
@import "../style/base/add";
@import "../style/base/list";
</style>