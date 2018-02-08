<template>
  <div>
    <div class="header">
      <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
          <!-- 标题 -->
          <div class="navbar-header">
              <a class="navbar-brand" href="#">哈哈哈</a>
          </div>
          <!-- 导航栏 -->
          <div>
              <ul class="nav navbar-nav">
                  <li class="active"><a href="#">热门</a></li>
                  <li><a href="#">论坛</a></li>
                  <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                          我的分类
                          <b class="caret"></b>
                      </a>
                      <ul class="dropdown-menu">
                          <li><a href="#">jmeter</a></li>
                          <li><a href="#">EJB</a></li>
                          <li><a href="#">Jasper Report</a></li>
                          <li class="divider"></li>
                          <li><a href="#">分离的链接</a></li>
                          <li class="divider"></li>
                          <li><a href="#">另一个分离的链接</a></li>
                      </ul>
                  </li>
              </ul>
          </div>
          <!-- 登陆 -->
          <div class="login pull-right">
            <button type="button" class="btn btn-default">登陆</button>
          </div>
          <!-- 发文章按钮 -->
          <div class="add pull-right">
            <button type="button" class="btn btn-default" style="color:#1E90FF">发博客</button>
          </div>
          <!-- 搜索框 -->
          <div class="search pull-right">
            <div class="input-group">
              <input type="text" class="form-control">
              <span class="input-group-btn">
                <button class="btn btn-default" type="button">
                  搜索
                </button>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="content container" id="content">
      <div class="row">
        <div class="col-sm-8 left-swiper">
          <div class="swiper-container-1">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="static/image/Leon-1.jpg"></div>
                <div class="swiper-slide"><img src="static/image/Leon-2.jpg"></div>
                <div class="swiper-slide"><img src="static/image/Leon-3.jpg"></div>
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
        <div class="col-sm-12 content-item">
          <h4>这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题</h4>
          <p class="text">正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。</p>
          <span class="text-footer">作者：<span class="writer">lanlanlan</span></span>
          <span class="text-footer">时间：<span>2018-01-02</span></span>
          <span class="text-footer">阅读量：<span>1000</span></span>
          <span class="text-footer">点赞：<span>500</span></span>
        </div>
        <div class="col-sm-12 content-item">
          <h4>这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题</h4>
          <p class="text">正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。</p>
          <span class="text-footer">作者：<span class="writer">lanlanlan</span></span>
          <span class="text-footer">时间：<span>2018-01-02</span></span>
          <span class="text-footer">阅读量：<span>1000</span></span>
          <span class="text-footer">点赞：<span>500</span></span>
        </div>
        <div class="col-sm-12 content-item">
          <h4>这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题</h4>
          <p class="text">正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。</p>
          <span class="text-footer">作者：<span class="writer">lanlanlan</span></span>
          <span class="text-footer">时间：<span>2018-01-02</span></span>
          <span class="text-footer">阅读量：<span>1000</span></span>
          <span class="text-footer">点赞：<span>500</span></span>
        </div>
        <div class="col-sm-12 content-item">
          <h4>这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题</h4>
          <p class="text">正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。</p>
          <span class="text-footer">作者：<span class="writer">lanlanlan</span></span>
          <span class="text-footer">时间：<span>2018-01-02</span></span>
          <span class="text-footer">阅读量：<span>1000</span></span>
          <span class="text-footer">点赞：<span>500</span></span>
        </div>
        <div class="col-sm-12 content-item">
          <h4>这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题这是一篇博客的标题</h4>
          <p class="text">正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦正文的一部分，我是正文的一部分啦啦啦啊，啦啦啦啦啦啦啦啦。</p>
          <span class="text-footer">作者：<span class="writer">lanlanlan</span></span>
          <span class="text-footer">时间：<span>2018-01-02</span></span>
          <span class="text-footer">阅读量：<span>1000</span></span>
          <span class="text-footer">点赞：<span>500</span></span>
        </div>
      </div>
      <div class="row">
        <div class="pagination-container">
          <ul class="pagination">
            <li class="previous"><a href="#">&laquo;</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li class="next"><a href="#" >&raquo;</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Swiper from 'Swiper'  
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.setSwiper()
  },
  methods: {
    setSwiper () {
      var swiperOption = {
        loop: true,
        
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
        speed:300,
        autoplay : {
          delay:3000,
          disableOnInteraction:false
        },
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
