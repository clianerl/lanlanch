<template>
<DIV class="myeditor">
	<div class="form-group">
		<label for="name">标题</label>
		<input type="text" class="form-control" placeholder="请输入标题">
	</div>
	<div class="form-group" style="margin-bottom:-1px;">
			<div id="editorNav" class="editor-nav" style="text-align:left"></div>
		</div>
		<div class="form-group">
			<div id="editorContent" class="editor-content" style="text-align:left"></div>	
		</div>
		<div class="form-group choose-sort" >		
		<label for="name">选择分类</label>
		<select class="form-control">
			<option>分类1</option>
			<option>分类2</option>
			<option>分类3</option>
			<option>分类4</option>
			<option>分类5</option>
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
	      <input type="checkbox">保存为私密
	    </label>
	  </div>
	</div>
	<div class="form-group" >			
		<button type="button" class="btn btn-default">发布</button>
	</div>
</DIV>
</template>
<script>
import E from 'wangeditor'
export default {
	data () {
		return {
			editorContent: ''
		}
	},
	methods: {
        getContent: function () {
            alert(this.editorContent)
        }
    },
	mounted() {
	    var editor = new E('#editorNav','#editorContent')
	    editor.customConfig.onchange = (html) => {
	      this.editorContent = html
	    }
	    editor.customConfig.zIndex = 100
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