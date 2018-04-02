<template>
  <div>
    <myheader></myheader>
    <div class="content container" id="content">
      <div class="row">
        <div class="col-sm-8 left-swiper">
          <div class="swiper-container-1">
            <div class="swiper-wrapper">
                <div class="swiper-slide" data-id="id1"><img src="static/image/Leon-1.jpg"></div>
                <div class="swiper-slide" data-id="id2"><img src="static/image/Leon-2.jpg"></div>
                <div class="swiper-slide" data-id="id3"><img src="static/image/Leon-3.jpg"></div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
        </div>
        <div class="col-sm-4">
        <div style="position:relative;">
          <div class="swiper-container-2">
            <div class="swiper-wrapper">
              <div class="swiper-slide"><img src="static/image/Leon-4.jpg"></div>
              <div class="swiper-slide"><img src="static/image/Leon-5.jpg"></div>
              <div class="swiper-slide"><img src="static/image/Leon-6.jpg"></div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
          </div>
          </div>
          <div style="position:relative;">
          <div class="swiper-container-3">
            <div class="swiper-wrapper">
              <div class="swiper-slide"><img src="static/image/Leon-7.jpg"></div>
              <div class="swiper-slide"><img src="static/image/Leon-8.jpg"></div>
              <div class="swiper-slide"><img src="static/image/Leon-9.jpg"></div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
          </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 content-item" v-for="m in list">
          <h4>{{m.title}}</h4>
          <p class="text" v-html="m.str_content"></p>
          <span class="text-footer">作者：<span class="writer">lanlanlan</span></span>
          <span class="text-footer">时间：<span>{{m.datetime}}</span></span>
          <span class="text-footer">阅读量：<span>1000</span></span>
          <span class="text-footer">点赞：<span>500</span></span>
        </div>
      </div>
      <pagination :show="true" :now="pageNow" :max="pageMax" @changePage="changePage"></pagination>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'  
import myheader from '../components/header.vue'
import pagination from '../components/pagination.vue'
export default {
  components:{
    myheader ,pagination
  },
  data () {
    return {
      list: [],
      pageNow:1,
      pageMax:0,
      userid:this.$utils.getUserMsg().userid
    }
  },
  created () {
    this.hideloading()
    this.getMessage()
  },
  mounted () {
    this.setSwiper()
  },
  methods: {
    changePage (now) {
          // 点击页码，请求新数据
          this.pageNow = now
          this.getMessage()
    },
    getMessage (){
          var param = {
            'pageno':this.pageNow==null?1:this.pageNow,
            'userid':'',
            classifyid:'',
          }
          this.showloading()
          this.$api.get('testmessage/getTestMessage', param, data => {
              this.hideloading()
              if(data.status==0){
                this.list = data.userData
                for(var i =0;i<this.list.length;i++){
                  if(this.list[i].is_secret=="0"){
                    this.list[i].is_secret = false
                  }else{
                    this.list[i].is_secret = true
                  }
                }
                this.pageMax = data.count
              }else{
                this.alertOk("alert","发布失败！")
              }
      },data => {
        this.hideloading()
        this.alertOk("alert","系统繁忙！")
      })
    },
    setSwiper () {
      var swiperOption = {
        loop: true,
        
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
        speed:300,
        // autoplay : {
        //   delay:3000,
        //   disableOnInteraction:false
        // },
        autoplayDisableOnInteraction : false,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }

      }

      var mySwiper1 = new Swiper ('.swiper-container-1', swiperOption);  
      var mySwiper2 = new Swiper ('.swiper-container-2', swiperOption);
      var mySwiper3 = new Swiper ('.swiper-container-3', swiperOption);
    }
  }
}
</script>
<style>
  @import '../style/base/index.css';
  @import '../assets/css/swiper-3.4.2.min.css';
</style>
