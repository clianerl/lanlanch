<template>
	<div>
		<span class="my-menu-title">我的文章</span>
		<ul class="my-menu">
			<router-link to="/mylist/all" tag="li" :class="{active:mylist_active}">全部文章</router-link>
			<router-link to="/classifymanage" tag="li" :class="{active:classifymanage_active}">分类管理</router-link>
		</ul>
	</div>
</template>
<script>
	export default {
		props:['mylistActive','classifymanageActive'],
		data () {
			return {
				mylist_active:this.mylistActive,
				classifymanage_active:this.classifymanageActive
			}
		},
		created () {
			
		}
	}
</script>
<style scoped  lang="scss">
.my-menu{
		height:100%;
		width:100%;
		padding:0;
		margin:0;

		list-style: none;
		background-color: white;
		li{
			line-height:35px;
			padding:0 30px;
			color:#666;
		}
		li:hover{
			background-color: rgb(30, 144, 255);
			color:white;
			cursor:pointer;
		}
		li.active{
			color: rgb(30, 144, 255);
		}
		li.active:hover{
			color:white;
		}
	}
	.my-menu-title{
		display: inline-block;
		width:100%;
		line-height:50px;
		padding:0 20px;

		color:#bbb;

		font-size:14px;
	}
</style>