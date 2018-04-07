<template>
  <div class="img-container">
    <img v-bind:src="source"/>
  </div>
</template>
<script>
/* eslint-disable */
	export default {
		props:['source'],
		mounted () {
			this.changeImgFit()
		},
		methods:{
			// 基于正方形,图片剧中显示
			changeImg () {
				var $thisImgContainer = $(this.$el)
				var $thisImg = $thisImgContainer.find('img')
				var image = new Image()
	    		image.src = $thisImg[0].src
	    		image.onload = function() {
	          		var imgWidth = image.width
		    		var imgHeight = image.height
					var cWdith = $thisImgContainer[0].clientWidth
					var cHeight = cWdith
					$thisImgContainer.height(cWdith)
			        if(imgWidth>=imgHeight){
			          $thisImg.height(cHeight)
			          $thisImg.width(cHeight/imgHeight*imgWidth)
			          var leftFix = ((cHeight/imgHeight*imgWidth)-$thisImgContainer.width())/2*(-1)
			          $thisImg.css('left',leftFix)
			        }else{
								$thisImg.width(cWdith)
			          $thisImg.height(cWdith/imgWidth*imgHeight);
			          var topFix = ((cWdith/imgWidth*imgHeight)-$thisImgContainer.height())/2*(-1)
			          $thisImg.css('top',topFix)
			        }
		        }
			},
			// 让图片适应边框大小
			changeImgFit () {
				var $thisImgContainer = $(this.$el)
				$thisImgContainer.height('100%')
				$thisImgContainer.width('100%')
				var height = $thisImgContainer.height()
				var width = $thisImgContainer.width()
				// 获取图片原始宽高
				var $thisImg = $thisImgContainer.find('img')
				var image = new Image()
	    		image.src = $thisImg[0].src
	    		var imgWidth = image.width
		    	var imgHeight = image.height
		    	// 如果图片比父级宽
		    	if((imgWidth/imgHeight)>(width/height)){

		    	}
			}
		}
	}
</script>