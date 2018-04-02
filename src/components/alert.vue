<template>
<div>
<transition name="fade">
    <div class="loading-background" v-if="isShow">
		<div class="alertContainer">
			<div class="text-container">{{alertText}}</div>
			<div v-if="typeIsAlert" class="alert-btn-group">
                <button @click="doClose">{{okText}}</button>
            </div>
            <div v-if="typeIsConfirm" class="confirm-btn-group">
                <button @click="doClose">{{okText}}</button>
                <button @click="doClose">{{cancelText}}</button>
            </div>
			
		</div>
	</div>
</transition>
</div>
</template>
<script>
export default {
    props:['show','type','text','ok','cancel'],
    computed: {
        isShow () {
            return this.show
        },
    	alertText () {
    		if((this.text).length>=20){
    			return (this.text).substring(0,20)
    		}else{
    			return this.text
    		}
    	},
    	okText () {
    		if(this.ok==null || this.ok==''){
    			return "确定"
    		}else if((this.ok).length>3){
    			return (this.ok).substring(0,4)
    		}else{
    			return this.ok
    		}
    	},
    	typeIsConfirm () {
    		if(this.type=="confirm"){
    			return true;
    		}else{
    			return false;
    		}
    	},
        typeIsAlert () {
            if(this.type=="alert"){
                return true;
            }else{
                return false;
            }
        },
    	cancelText () {
    		if(this.type=="confirm"){
    			if(this.cancel==null || this.cancel==''){ 
    				return "取消"
	    		}else if((this.cancel).length>3){
	    			return (this.cancel).substring(0,4)
	    		}else{
	    			return this.cancel
	    		}
    		}else{
    			return ""
    		}
    	}
    },
    methods:{
        doClose () {
            this.alertClose();
        }
    }
}
</script>
<style  lang="scss" type="text/css" scoped>
$main-color:rgb(30, 144, 255);
$text-color:#333;
$border-color:#D9D9D9;
button{
    outline:none;
}
	.loading-background{
		position:fixed;
		z-index: 20000;
		height:100%;
		width:100%;
		background-color: rgba(0,0,0,.6)
	}
	.alertContainer{
		width:300px;height:200px;
		position:absolute;top:50%;left:50%;margin-top:-100px;margin-left:-150px;

		background-color: white;
		border-radius:4px;
		border:1px solid $main-color;
        
	}
    .alertContainer>.text-container{
        width:300px;
        height:150px;
        text-align: center;
        display: table-cell; 
        vertical-align: middle;

        color:$main-color;
        border:none;
        border-bottom:1px solid $border-color;
        border-top-left-radius:4px;
        border-top-right-radius:4px;
        background-color:white;
    }
    .alertContainer>.alert-btn-group>button{
        display: block;
        width:100%;
        height:48px;
        border:none;
        border-bottom-left-radius:4px;
        border-bottom-right-radius:4px;
        color:$text-color;
    }
    .alertContainer>.confirm-btn-group>button{
        display:inline-block;
        width:147px;
        height:48px;
        line-height:48px; 
        border:none;
        
        color:$text-color;
        background-color:transparent;
    }
    .alertContainer>.confirm-btn-group>button:first-child{
        border-right:1px solid $border-color;
        border-bottom-left-radius:4px;
    }
    .alertContainer>.confirm-btn-group>button:last-child{
        border-bottom-right-radius:4px;
    }
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
</style>