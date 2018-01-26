<template>
	<div class="msg-item">
		<div class="row msg-item-head">
			<div class="col-xs-2 user-img">
				<fiximg source="static/image/Leon-1.jpg"></fiximg>
			</div>
			<div class="col-xs-10 user-name">
				{{msg.name}}
			</div>
		</div>
		<div class="row msg-item-content">
			<div class="msg-item-text">
				{{msg.intro}}
			</div>
			<div class="row msg-item-images-3">
				<!-- <div class="col-xs-4 img"><fiximg source="static/image/Leon-1.jpg"></fiximg></div>
				<div class="col-xs-4 img"><fiximg source="static/image/Leon-2.jpg"></fiximg></div>
				<div class="col-xs-4 img"><fiximg source="static/image/Leon-3.jpg"></fiximg></div>  -->
				<div class="col-xs-4 img" v-for="i in images">
				  <fiximg :source="i"></fiximg>
				</div>
			</div>
		</div>
		<div class="row msg-item-ctrl">
			<div class="col-xs-4 forward">
				<img src="static/image/icon/forward.jpg">
				<span>转发</span>
			</div>
			<div class="col-xs-4 comment">
				<img src="static/image/icon/comment.jpg">
				<span>评论</span>
			</div>
			<div class="col-xs-4 like">
				<img src="static/image/icon/like.jpg">
				<span>点赞</span>
			</div>
		</div>
	</div>
</template>
<script>
/* eslint-disable */
import fiximg from '../components/image.vue'
export default {
  components: { fiximg },
  data () {
    return {
      images: []
    }
  },
  props: ['msg'],
  mounted () {
    this.showImg()
  },
  methods: {
  	showImg () {
  		var imageStr = this.msg.img
  		if(imageStr!=null && $.trim(imageStr)!=''){
  			this.images = imageStr.split(',')
  		}
  	}
  }
}
</script>