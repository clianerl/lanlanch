<template>
<div class="container lan" id="container">
	<div class="row header">
		<div class="col-xs-2 header-btn return"><span>返回啊</span></div>
		<div class="col-xs-8 header-btn title"><span>查看</span></div>
		<div class="col-xs-2 header-btn add"><span>新增</span></div>
	</div>
	<!-- <item v-for="msgitem in msg" :msg="msgitem"></item> -->
</div>
</template>
<script>
/* eslint-disable */
import item from '../components/main_item.vue'
export default {
  components: { item },
  data () {
  	return {
  	  // msg: {
     //    name: '小猴子',
     //    intro: '介绍介绍',
     //    img: 'static/image/Leon-1.jpg,static/image/Leon-2.jpg,static/image/Leon-3.jpg,static/image/img-1.jpg'
  	  // },
      msg: []
  	}
  },
  created () {
    this.init()
    console.log(this.list)
  },
  methods: {
    init () {
      //获取数据
      var $this = this
      this.$api.get('getMessage', null, data => {
        $this.msg = data
      })
    }
  }
}
</script>
<style>
  @import '../style/base/main.css'
</style>