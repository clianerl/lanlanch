<template>
<div>
  <myheader></myheader>
  
  <div class="mypage container">
  	<div class="row">
  		<div class="col-sm-2 " style="height:100%;">
  			<leftpanel :mylist-active="true" :classifymanage-active="false"></leftpanel>
  		</div>
  		<div class="col-sm-10" style="border-left:1px solid #F0F0F0">
  			<DIV class="mylist">
  				<div class="form-group choose-sort" >		
					<label for="name">选择分类</label>
					<select class="form-control" name="fl1" v-model="fl" @change="doQueryByFl">
						<option v-for="c in classifyArr" :value="c.id" >{{c.name}}</option>
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
  						<li v-if="messageArr.length==0" style="border:none;color:#9D9D9D">无数据</li>
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
import leftpanel from '../components/leftPanel.vue'
import E from 'wangeditor'
import pagination from '../components/pagination.vue'
export default {
	data () {
		return {
			pageNow:1,
			pageMax:0,
			pageShow:true,
			classifyArr:[{name:'全部',id:'all'}],
			fl:this.$route.params.classifyid,
			userid:this.$utils.getUserMsg().userid,
			messageArr:[]
		}
	},
	components:{
		myheader,pagination,leftpanel
	},
	created () {
		// 初始化下拉类别
		this.initClassify()
		// 初始化显示第一页
		this.getMessage()
	},
	watch:{
		'$route' (toUrl, fromUrl) { 
			this.fl = this.$route.params.classifyid
			this.getMessage()
		}
	},
	methods: {
		// 点击翻页后
        changePage (now) {
        	// 点击页码，请求新数据
        	this.pageNow = now
        	this.getMessage()
        },
        // 获取我的文章列表 
        getMessage (){
        	var param = {
        		'pageno':this.pageNow==null?1:this.pageNow,
        		'userid':this.userid,
        		'classifyid':this.fl=='all'?'':this.fl
        	}
        	this.showloading()
        	this.$api.get('testmessage/getTestMessage', param, data => {
			        this.hideloading()
			        if(data.status==0){
			        	this.messageArr = data.userData
			        	for(var i =0;i<this.messageArr.length;i++){
			        		if(this.messageArr[i].is_secret=="0"){
			        			this.messageArr[i].is_secret = false
			        		}else{
			        			this.messageArr[i].is_secret = true
			        		}
			        	}
			        	this.pageMax = data.count
			        }else{
			        	this.alertOk("alert","发布失败！")
			        }
			},data => {
				this.hideloading()
				this.alertOk("alert","系统繁忙！")
			})
        },
        // 选择上方类别后，重新按类别查询
        doQueryByFl(){
        	this.$router.push({path: '/mylist/'+this.fl})
        },
        // 点击某条记录后，跳转
        redirectToContent (id) {
        	this.$router.push({path: '/listcontent/'+id})
        },
        // 初始化下拉类别
        initClassify () {
	    	this.showloading()
	    	var $this = this
	    	this.$api.get('message/queryClassify', {userid:this.$utils.getUserMsg().userid}, data => {
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
<style scoped  lang="scss">
@import "../style/base/add";
@import "../style/base/list";
</style>