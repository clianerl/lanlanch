<template>
<div>
  <myheader></myheader>
  
  <div class="mypage container">
  	<div class="row">
  		<div class="col-sm-2 " style="height:100%;">
  			<leftpanel :mylist-active="false" :classifymanage-active="false"></leftpanel>
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
						<option v-for="c in classifyArr" :value="c.id">{{c.name}}</option>
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
import leftpanel from '../components/leftPanel.vue'
import E from 'wangeditor'

export default {
	data () {
		return {
			editor:null,
			editorContent: '',
			editorTitle:'',
			isSecret:false,
			fl:'',
			id:this.$route.params.id,
			classifyArr:[]
		}
	},
	components:{
		myheader,leftpanel
	},
	created () {
		this.getContent()
	    this.initClassify()
	},
	methods: {
        getContent () {
            this.alertOk("alert",this.editorContent)
        },
        // 根据id获取内容
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
		        this.editorTitle = message.title
		        this.editorContent = message.str_content
		        this.isSecret = message.is_secret=='0'?false:true
		        this.fl = message.lan_classify_id
		        console.log(this.editorContent)
		        if(this.editor!=null){
		        	this.editor.txt.html(this.editorContent)
		        }
		      }else{
		        this.alertOk("alert",data.errormsg)
		      }
		    },data => {
		      this.hideloading()
		      this.alertOk("alert","系统繁忙！")
		    })
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
        },
        // 更新文章
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
        	if(this.fl == ''){
        		this.alertOk("alert","请选择分类")
        		return false
        	}

        	var param = {
        		'id':this.id,
        		'title':this.editorTitle,
        		'content':this.editorContent,
        		'is_secret':this.isSecret?'1':'0',
        		'user_id':this.$utils.getUserMsg().userid,
        		'img_str':'',
        		'datetime':this.$utils.getFormatDate(),
        		'classify_id':this.fl
        	}
        	this.showloading()
        	this.$api.post('message/mondifyMessage', param, data => {
			        console.log(data)
			        this.hideloading()
			        if(data.status==0){
			        	this.alertOk("alert","修改成功！")
			        	setTimeout(() => {this.$router.push({path: '/listcontent/'+this.id})},1000)
			        }else{
			        	this.alertOk("alert","修改失败！")
			        }
			},data => {
				this.hideloading()
				this.alertOk("alert","系统繁忙！")
			})
        }
    },
	mounted() {	
		// 初始化富文本编辑器
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
	    editor.txt.html(this.editorContent)
	    this.editor = editor
	    
	}
}
</script>
<style scoped  lang="scss">
@import "../style/base/add";
</style>