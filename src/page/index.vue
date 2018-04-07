<template>
  <div>
    <myheader></myheader>
    <div class="content container" id="content">
      <div class="row">
        <div class="col-sm-8 left-swiper">
          <div class="swiper-container-1">
            <div class="swiper-wrapper">
                <div class="swiper-slide" data-id="id1"><myimg source="static/image/Leon-1.jpg"></myimg></div>
                <div class="swiper-slide" data-id="id2"><myimg source="static/image/Leon-2.jpg"></myimg></div>
                <div class="swiper-slide" data-id="id3"><myimg source="static/image/Leon-3.jpg"></myimg></div>
            </div>
            <div class="swiper-pagination"></div>
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
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
          </div>
          <div style="position:relative;">
          <div class="swiper-container-3">
            <div class="swiper-wrapper">
              <div class="swiper-slide"><img src="static/image/Leon-7.jpg"></div>
              <div class="swiper-slide"><img src="static/image/Leon-8.jpg"></div>
              <div class="swiper-slide"><img src="static/image/Leon-9.jpg"></div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 content-item" v-for="m in list">
          <h4><router-link :to="'/indexcontent/'+m.id">{{m.title}}</router-link></h4>
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
import myimg from '../components/image.vue'
import pagination from '../components/pagination.vue'
export default {
  components:{
    myheader ,pagination,myimg
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

    // var animal = function(){
    //   this.head = 1
    // }
    // var cat = function(){

    // }
    // cat.prototype = new animal()
    // console.log("animal.prototype.head:"+animal.prototype.head)
    // console.log('cat.head:'+cat.head)
    // console.log('cat.prototype.head:'+cat.prototype.head)
    // cat.prototype.head = 3
    // console.log('animal.prototype.head:'+animal.prototype.head)

    console.log('========')
    // var Person = function(country) {
    //   this.country = country
    // };
    // Person.prototype.eat = function() {
    //   return 'food';
    // };
    // var Chinese = function(name,city){
    //   this.city = city
    //   this.name = name
    // }
    // Chinese.prototype = new Person('China')
    // Chinese.prototype.say = function(){
    //   return 'my name is '+this.name+',living in '+this.city
    // }
    // Chinese.prototype.constructor = Chinese
    // var lan = new Chinese('lan','Shenyang')

    // console.log('Chinese.prototype.constructor:'+Chinese.prototype.constructor)
    // console.log('lan.constructor:'+lan.constructor)
    // console.log('lan.say()  '+lan.say())
    // console.log(Chinese.prototype.__proto__==Person.prototype)
    // console.log(Chinese.prototype==Person.prototype)
    // console.log('Chinese._proto_:'+Chinese.__proto__)
    // console.log('lan._proto_:'+lan.__proto__)
    // console.log('lan.constructor:'+lan.constructor)
    var arr = [1,3,5,7,9,11];
    var arrCopy2 = arr.slice(1,5);
    console.log(arrCopy2)


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
  .swiper-button-prev{
    opacity:0.1;  
  }
  .swiper-button-prev:hover{
    opacity:1;
  }
  .swiper-button-next{
    opacity:0.1;  
  }
  .swiper-button-next:hover{
    opacity:1;
  }
</style>
