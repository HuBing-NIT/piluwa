
<template>
    <transition

        leave-active-class="animated slideOutRight"
    >
    <div id="tologin">
        <!-- 头部 -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>登录</p>
        </div>
        <!-- 内容 -->
        <div id="content">
            <img src="../../../public/imgs/loginlogo.jpg" alt="">
            <!-- <van-button   type='primary' color='#6b6b6b'>手机号登录/注册</van-button> -->
            <div style="width:80%">
                 <van-button color="#6b6b6b" round plain size='large' to='/tologin/login'>手机号登录/注册</van-button>
            </div>
           
        </div>
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
    </div>
     </transition>
</template>


<script>
export default {
    methods: {
        back(){
            this.$router.go(-1);
        }
    }
}
</script>


<style lang="less" scoped>
@import '~style/mixin.less';

    #tologin{
        position: fixed;
        top: 0px;
        bottom: 0px;
        left:0px;
        right: 0px;
        background: white;
        z-index: 3;
        #header{
            .head();
        }
        #content{
            .content();
            text-align: center;

            display: flex;
            flex-direction: column;
            align-items: center;
            img{
               margin: 0.2rem 0 0.9rem 0;
            }
        }
    }
  
</style>
