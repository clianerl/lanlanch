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
			this.changeImg()
		},
		methods:{
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
        // if(imgWidth>=imgHeight){
        //   $thisImg.css('height','100%')
        //   $thisImg.css('width','auto')
        //   $thisImg.css('left','50%')
        //   $thisImg.css('top','0')
        //   var leftFix = ($thisImg.width()/2)*(-1)
        //   $thisImg.css('margin-left',leftFix)
        // }else{
        // 	$thisImg.css('width','100%')
        //   $thisImg.css('height','auto')
        //   $thisImg.css('left','0')
        //   $thisImg.css('top','50%')
        //   var topFix = ($thisImg.height()/2)*(-1)
        //   $thisImg.css('margin-top',topFix)
        // }
			}
		}
	}
</script>