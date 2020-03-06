<template>
    <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
    >   
    <div id="login">
        <!-- 头部 -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>登录</p>
        </div>
         <!-- 内容 -->
        <div id="content">
            <img src="../../../public/imgs/loginlogo.jpg" alt="">
            <input placeholder="请输入手机号码" name="" id="">
            <input placeholder="请输入密码" name="" id="" ref="pass">
            <div style="width:100%">
                 <van-button @click="login" color="linear-gradient(to right, #eb6202, #fe7e25)" round  size='large'>登录</van-button>
            </div>
        </div>
    </div>
     </transition>
</template>


<script>
import {Login} from 'api/api.js'
export default {
    methods: {
        back(){
            this.$router.go(-1);
        },
        login(){
            let obj = {
                phone:'18352936365',
                code:this.$refs.pass.value
            }
            console.log(this.$refs.pass.value)
            Login(obj).then((res)=>{
                console.log(res)
            })
        }
    }
}
</script>


<style lang="less" scoped>
@import '~style/mixin.less';

    #login{
        position: fixed;
        top: 0px;
        bottom: 0px;
        left:0px;
        right: 0px;
        background: white;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;

        #header{
            .head();
        }
        #content{
            .content();
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            width: 3.3rem;
            height: 3.84rem;
            input{
                border: 0;
                width: 100%;
                height: 0.36rem;
                border-bottom: 1px solid #e3e3e3;
            }
        }
    }
</style>