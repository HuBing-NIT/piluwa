<template>
    <transition
        
        enter-active-class="animated slideInRight"
    >   
    <div id="orderRes">
        <!-- 顶部title -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>{{res?'下单成功':'未付款'}}</p>
        </div>
       <!-- 订单信息 -->
       <div id="order-msg">  
           <van-panel title="标题" desc="描述信息" status="状态">
                <div></div>
            </van-panel>

             <van-panel title="标题" desc="描述信息" status="状态">
                <div></div>
            </van-panel>

             <van-panel title="标题" desc="描述信息" status="状态">
                <div></div>
            </van-panel>

             <van-panel title="标题" desc="描述信息" status="状态">
                <div></div>
            </van-panel>

       </div>
     
    </div>
    </transition>
</template>


<script>

import {mapState,mapMutations} from 'vuex'
export default {
   data() {
    return {
       
    }
  },
  props:['res'],
  computed:{
      
    },
  methods: {
        ...mapMutations(['showOrder']),
        back(){ //返回
             this.$store.commit('showOrder',false)
        },   
    },
    mounted(){
        console.log(this.res)
    },
    watch:{
        
    }
}
</script>


<style lang="less" scoped>
@import '~style/index.less';

    #orderRes{
        
        .page();
        background: #f8f8f8;
        font-size: 0.12rem;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 3;
        #header{
           .head();
        }
        #order-msg{
            width: 100%;
        }
      
    }

</style>