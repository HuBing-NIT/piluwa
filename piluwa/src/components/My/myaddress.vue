<template>
    <transition
        leave-active-class="animated slideOutRight"
        enter-active-class="animated slideInRight"
    >   
    <div id="mymsg">
        <!-- 顶部title -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>我的收货地址</p>
        </div>

        <!-- 收获地址信息 -->
        <nav id="addressList">
            <li>
                <p>
                    <span>胡冰</span>
                    <span>18352936365</span>
                </p>
                <p>
                    <span>上海</span>
                    <span>Xx区</span>
                    <span>XXXxxx</span>
                </p>
            </li>

        </nav>

        <!-- 添加收货地址 -->
        <router-link tag="div" id="add" to="myaddress/xxx">
            <van-icon name="plus"  color="#f38339"/>
            <span>添加收获地址</span>
        </router-link>

        <!-- 路由跳转地址编辑或添加 -->
        <router-view></router-view>


    </div>
    </transition>
</template>


<script>
import BS from 'better-scroll'
import {getClassify} from 'api/api.js'
export default {
    data(){
        return{

        }
    },
    methods: {
       back(){
           this.$router.go(-1);
       },
    },
    mounted(){
    
    }
}
</script>


<style lang="less" scoped>
@import '~style/index.less';

    #mymsg{
        .page();
        background: #f5f5f5;
        font-size: 0.12rem;
        font-weight: 500;
        #header{
           .head()
        }
    }
    #addressList{
        width: 100%;
        li{
            width: 100%;
            height: 0.96rem;
            background: #fff;
            padding: 0 0.15rem;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: 0.14rem;
            font-weight: 500;
            p{
                span{
                    display: inline-block;
                    margin: 0 0.03rem;
                }
            }
        }
    }
    #add{

        width: 100%;
        height: 0.5rem;
        background: #ffffff;
        margin-top:0.15rem;
        color: @origen;
        display: flex;
        align-items: center;
        justify-content: center;
    }
   
</style>