<template>
<div>
<transition name="fade">
    <div class="loading-background" v-if="show">
		<div class="loading-icon">
			<vue-loading type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
		</div>
	</div>
</transition>
</div>
</template>
<script>
import vueLoading from 'vue-loading-template'
export default {
	components: {
      vueLoading
    },
    props:['show']
}
</script>
<style scoped>
	.loading-background{
		position:fixed;
		z-index: 20000;
		height:100%;
		width:100%;
		background-color: rgba(0,0,0,.6)
	}
	.loading-icon{
		width:50px;
		height:50px;
		position:fixed;
		top:50%;
		left:50%;
		margin-top: -25px;
		margin-left:-25px;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
</style>