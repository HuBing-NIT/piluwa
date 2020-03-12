<template>
    <transition
        leave-active-class="animated slideOutRight"
    >   
    <div id="login">
        <!-- 头部 -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>登录</p>
        </div>
         <!-- 登录表单  -->
        <div id="content">
            <img src="../../../public/imgs/loginlogo.jpg" alt="">
            <input placeholder="请输入手机号码" name="" id="" v-model="logPhone">
            <input placeholder="请输入密码" name="" id="" type="password" v-model="logPass">
            <div style="width:100%">
                 <van-button @click="login" color="linear-gradient(to right, #eb6202, #fe7e25)" round  size='large'>登录</van-button>
            </div>

             <!-- 注册 密码找回 -->
            <div id="operate">
                <span>忘记密码</span>
                <!-- <router-link to="/tologin/login/register">新用户注册</router-link> -->
                <span @click="register">新用户注册</span>
            </div>
        </div>      

        <!-- <router-view></router-view>  -->
    </div>
     </transition>
</template>


<script>
import {Login} from 'api/api.js'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
            logPhone:'',
            logPass:''
        }
    },
    computed:{
        ...mapState(['userMsg'])
    },
    methods: {
        ...mapMutations(['changeLoginState']),
        register(){
            this.$router.push('/tologin/register')
        },
        back(){
            this.$router.go(-1);
        },
        login(){
            let obj = {
                phone:this.logPhone,
                password:this.logPass
            }
            Login(obj).then((res)=>{
               if(res.status==0){
                    this.$toast.success('登录成功');
                    console.log('登录成功')
                    let data = res.data[0];
                    console.log(data)
                    let obj = {
                        phone:data.phone,
                        sex:data.sex,
                        avatarImg:data.avatarImg,
                        token:data.token,
                    }
                    // 写入localStorage
                    localStorage.setItem('loginMsg',JSON.stringify(obj))
                    console.log(obj)
                    // 存入vuex 更改登录状态
                    this.changeLoginState(obj)
                    // 跳转我的页面
                    this.$router.push('/my')
               }else{
                    this.$toast.fail('用户名或密码错误');
               }
            })
        },
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
            #operate{
                display: flex;
                width: 100%;
                justify-content: space-between;
                
            }
        }
        
    }
</style>