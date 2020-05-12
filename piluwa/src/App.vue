<template>
 
  <div id="app">
              <heade></heade>
              <router-view class="view"></router-view>

                <transition
                  leave-active-class="animated slideOutRight"
                  enter-active-class="animated slideInRight"
                >  
                  <!-- 详情页组件 -->
                  <detail v-if="detailstatus"></detail>
                </transition>
                
                <transition
                  leave-active-class="animated slideOutRight"
                  enter-active-class="animated slideInRight"
                >   
                    <!-- 订单确认组件 -->
                    <checkorder v-if="orderstatus"></checkorder>
                </transition>
              <foot></foot>
  </div>

</template>



<script>
import foot from 'components/Footer/footer.vue'
import heade from 'components/Header/header.vue'
import checkorder from 'components/Order/checkOrder.vue'   //确认订单组件
import detail from 'components/Detail/shopDetail.vue'  //商品详情组件
import {mapState,mapMutations} from 'vuex';
export default {
  components:{foot,heade,checkorder,detail},
    computed:{
          ...mapState(['userMsg','rendermodule','detailstatus','orderstatus'])
    },
    data(){
      return{
      
      }
    },
    methods: {
        ...mapMutations(['changeLoginState']),
    },
    mounted(){
      console.log(this.orderstatus,this.detailstatus)
    }
}


</script>

<style lang="less">


#app {
  // width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

 .wrapper{
        width: 100%;
        height: 100%;
        // background: red;
        overflow: hidden;

         .content{

         }
 }
.view{
  // position: absolute;
  // top: 0.48rem;
  // bottom: 0.48rem;
}

</style>
