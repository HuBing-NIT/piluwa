<template>
  <div class='banner'>
    <div class="swiper-container">
      <div class="swiper-wrapper">
          <div class="swiper-slide" 
            v-for = '(item,index) in value'
            :key = 'index'
          >
          <img :src="item" alt="">
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
export default {
  props:{
    value:{ type :Array ,default:()=>{} }
  },
  methods:{
    initBanner(){
      new Swiper('.swiper-container',{
          autoplay : 2000,
          loop:true,
          speed:1000,
      })
    }
  },
  watch:{
    value(){
      //banners 改变 网络请求数据ok 之后进行初始化操作
      this.$nextTick(()=>{
        this.initBanner()
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~swiper/css/swiper.min.css';
 .banner{
    width: 100%;
    height: 3rem;
    background: #fff;
    .swiper-container{
        width: 100%;
        height: 100%;
        .swiper-slide{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        img{
            width: 2.5rem;
            height: 100%;
        }
    }
 }
</style>