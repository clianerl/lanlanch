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
						<option v-if="classifyArr.length==0" value="">暂无,请添加类别</option>
					</select>
				</div>
				<div class="form-group add-sort" >		
					<label for="name">新增分类</label>
					<input type="text" class="form-control" placeholder="请输入分类名称" v-model="newClassify">
					<button type="button" class="btn btn-default" @click="doAddClassify">+</button>
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
import leftpanel from '../components/leftPanel.vue'

export default {
	data () {
		return {
			editorContent: '',
			editorTitle:'',
			isSecret:false,
			fl:'',
			classifyArr:[],
			newClassify:'',
			imgid:''//发布时，回写图片ID
		}
	},
	components:{
		myheader,leftpanel
	},
	created () {
		this.initClassify()
	},
	methods: {
        getContent () {
            this.alertOk("alert",this.editorContent)
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
        // 点击确认，新增数据
	    doAddClassify () {
	      // 修改数据
	      // 最大字数20字
	      if(this.newClassify.length>20){
	        this.alertOk("alert","类别字数不能超过20字")
	        return false
	      }
	      //类别名称不能重复
	      for(var i=0;i<this.classifyArr.length;i++){
	        if(this.classifyArr[i].name==$.trim(this.newClassify)){
	          this.alertOk("alert","类别名称不能重复")
	          return false
	        }
	      }
	      this.showloading()
	      var param = {
	        name:$.trim(this.newClassify),
	        id:'',
	        user_id:this.$utils.getUserMsg().userid,  
	      }
	      // 后台根据id是否为空，判断是新增还是修改
	      this.$api.post('message/insertClassify', param, data => {
	            console.log(data)
	            this.hideloading()
	            if(data.status==0){
	              var id = data.id
	              this.fl = id
	              this.classifyArr.push({id:id,name:this.newClassify})
	              this.newClassify = ''
	            }else{
	              this.alertOk("alert","添加类别失败！")
	            }
	      },data => {
	        this.hideloading()
	        this.alertOk("alert","系统繁忙！")
	      })
	    },
        // 点击发布，将内容上传到服务器
        doAdd () {
        	// 判断标题和内容是否为空
        	if(this.editorTitle == ''){
        		this.alertOk("alert","标题不能为空！")
        		return false
        	}
        	if(this.editorTitle.length>50){
        		this.alertOk("alert","标题不能大于50字")
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
        		'title':this.editorTitle,
        		'content':this.editorContent,
        		'is_secret':this.isSecret?'1':'0',
        		'user_id':this.$utils.getUserMsg().userid,
        		'img_str':'',
        		'datetime':this.$utils.getFormatDate(),
        		'classify_id':this.fl,
        		'img_str':this.imgid
        	}
        	this.showloading()
        	this.$api.post('message/insertMessage', param, data => {
			        console.log(data)
			        this.hideloading()
			        if(data.status==0){
			        	this.alertOk("alert","发布成功！")
			        	setTimeout(() => {this.$router.push({path: '/listcontent/'+data.id})},1000)
			        }else{
			        	this.alertOk("alert","发布失败！")
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
	    editor.customConfig.uploadImgServer = '/SSM_WEB_DEV/message/upload'
	    // 将图片大小限制为 3M
		editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
		// 限制一次最多上传 5 张图片
		editor.customConfig.uploadImgMaxLength = 5
		editor.customConfig.customAlert = function (info) {
		    // info 是需要提示的内容
    		alert('自定义提示：' + info)
		}
		var $this = this
		editor.customConfig.uploadImgHooks = {
		    before: function (xhr, editor, files) {
		    	console.log("before")
		        // 图片上传之前触发
		        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
		        
		        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
		        // return {
		        //     prevent: true,
		        //     msg: '放弃上传'
		        // }
		    },
		    success: function (xhr, editor, result) {
		    	console.log("success")
		        // 图片上传并返回结果，图片插入成功之后触发
		        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
		    },
		    fail: function (xhr, editor, result) {
		    	console.log("fail")
		        // 图片上传并返回结果，但图片插入错误时触发
		        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
		    },
		    error: function (xhr, editor) {
		    	console.log("error")
		        // 图片上传出错时触发
		        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
		    },
		    timeout: function (xhr, editor) {
		    	console.log("timeout")
		        // 图片上传超时时触发
		        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
		    },

		    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
		    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
		    customInsert: function (insertImg, result, editor) {
		    	console.log("customInsert")
		        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
		        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

		        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
		        for(var i=0;i<result.data.length;i++){
		        	var url = result.data[i]
		        	insertImg(url)
		        }
		        $this.imgid += result.img_id

		        // result 必须是一个 JSON 格式字符串！！！否则报错
		    }
		}
		editor.customConfig.customAlert = function (info) {
		    // info 是需要提示的内容
		    console.log('自定义提示：' + info)
		}
	    editor.create()
	    
	}
}
</script>
<style scoped  lang="scss">
@import "../style/base/add";
</style>