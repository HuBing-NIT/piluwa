<template>
    <div id="footer">
        <!-- <router-link to="/home" tag="div" class="menu" @click='changePage()'> -->
        <router-link to="/home" tag="div" class="menu" >
            <van-icon class="iconfont" class-prefix='icon' name='tubiao-1'  @click='changeTitle("首页")' />
            <span class="txt">
                首页
            </span>
        </router-link>
        <router-link to="/classify" tag="div" class="menu" >
             <van-icon class="iconfont" class-prefix='icon' name='tubiao-1' @click='changeTitle("分类")' />
            <span class="txt">
                分类
            </span>
        </router-link>
        <router-link to="/cart" tag="div" class="menu" >
            <van-icon class="iconfont" class-prefix='icon' name='tubiao-1' @click='changeTitle("购物车")' />
            <span class="txt">
                购物车
            </span>
        </router-link>
        <router-link to="/my" tag="div" class="menu"  >
              <!-- <svg class="icon"  aria-hidden="true" @click='changeTitlePage("我的")'>
                <use xlink:href="#icon-tubiao-1"></use>
             </svg> -->
            <van-icon class="iconfont" class-prefix='icon' name='tubiao-1'  @click='changeTitle("我的")' />
            <span class="txt">
                我的
            </span>
        </router-link>
      
    </div>
</template>


<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            icon_active:true,
        }
    },
    methods:{
        ...mapMutations(['changeTitle']),
        change(title){
           
            this.$store.commit('changeTitle',params)
        }
    }
    
}
</script>


<style lang="less" scoped>



#footer{
    width: 100%;
    height: 0.48rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #bebbb6;
    display: flex;
    z-index: 2;
    .menu{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        .icon{
            font-size: 0.2rem;
        }
        .txt{
            font-size: 0.12rem;
        }
    }
}

.active{
    color: blue
}
</style>