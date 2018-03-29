<template>
	<div class="row" v-if="show">
	    <div class="pagination-container" >
	      <ul class="pagination">
	        <li class="previous"><a href="javascript:void(0)" :class="{disable: isFirstDisable}">&laquo;</a></li>
	        <li v-for="item in arrayfor"><a href="javascript:void(0)" :class="{active: item.isActive}" @click="changePage(item.num)" :data="item.num">{{item.num}}</a></li>
	        <li class="next"><a href="javascript:void(0)" :class="{disable: isLastDisable}">&raquo;</a></li>
	      </ul>
	    </div>
	</div>
</template>
<script>
export default {
	props:['show','max','now'],
	computed:{
		innerMax () {
			return parseInt(this.max)
		},
		innerNow () {
			return parseInt(this.now)
		},
		arrayfor () {
			var newArrayfor = []
			for(var i=0;i<this.innerMax;i++){
				var num = i+1
				var isActive = false
				if(num == this.innerNow){
					isActive = true
				}
				newArrayfor.push({num:num,isActive:isActive})
			}
			return newArrayfor
		},
		isFirstDisable () {
			if(this.innerNow == 1){
				return true
			}else{
				return false
			}
		},
		isLastDisable () {
			if(this.innerNow == this.innerMax){
				return true
			}else{
				return false
			}
		}
	},
	methods:{
		changePage (num) {
			// 去掉当前的active
			for(var i=0;i<this.innerMax;i++){
				this.arrayfor[i].isActive = false	
			}
			this.$emit('changePage',num)
		}
	}
}
</script>
<style scoped>
	.pagination>li>.active{background-color: #eee;color:#23527c;}
	.pagination>li>.disable{color:#ddd;cursor: default;}
	.pagination>li>.disable:hover{background-color: white;}
</style>