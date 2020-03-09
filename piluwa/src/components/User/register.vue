<template>   
    <div id="register">
        <!-- 头部 -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>注册</p>
        </div>
         <!-- 注册表单  -->
        <div id="content">
            <!-- 手机号码 -->
            <input class="input" placeholder="请输入手机号码" type="text" name="" id="" v-model="resPhone">
            <!-- 手机验证码 -->
            <div class="verity">
                 <input class="input" placeholder="请输入短信验证码" type="text" name="" id="" v-model="phoneYzm">
                 <span style="color:#f88635" @click='getyzm' v-if="sendYxm">获取验证码</span>
                 <span v-else>{{time}}S后重试</span>
            </div>
            <!-- 登录密码 -->
            <input class="input" placeholder="请设置登录密码" type="text" name="" id="" v-model="resPass">

            <!-- 用户协议勾选 -->

            <div class="protocol">
                <van-checkbox v-model="checked" checked-color="#fe7e25"></van-checkbox>
                <p>已同意并阅读<span style="color:#cc3735">《用户服务协议》</span></p>
            </div>

            <!-- 确认 -->
            <div>  
                <van-button   round  size='large' ref="sure" @click='resg'>确认</van-button>
            </div>
        </div>       
    </div>
</template>


<script>
import {getCode,register} from 'api/api.js'
export default {
    data() {
        return {
            checked: true,
            resPhone:'',  //表单填写的手机号
            phoneYzm:'',    //表单填写的手机号验证码
            resPass:'',      //表单填写的密码
            sendYxm:true, //是否可以请求验证码
            time:60,  //60s请求一次验证码
        }
    },
    methods: {
        back(){
            this.$router.go(-1);
        },
        resg(){
            // 如果注册成功 写入本地localstrong
            if(this.resPhone&&this.resPass&&this.phoneYzm&&this.checked){ //信息填写完毕进行提交注册
                let obj = {
                    phone:this.resPhone,
                    code:this.phoneYzm,
                    password:this.resPass
                }
                register(obj).then((res)=>{
                    console.log(res)
                })
            }else if(!this.checked){
                this.$toast('请勾选用户协议')
            }else{
                 this.$toast('清补全注册信息')
            }
        
        },
        // 获取手机验证码
        getyzm(){
            if(this.resPhone){ //手机号输入不为空      
                let obj = {
                    phone:this.resPhone,
                    templateId:"537707"
                }
                getCode(obj).then((res)=>{  //请求手机验证码
                     this.sendYxm=!this.sendYxm;
                     this.timer = setInterval(() => { //设置定时器 60s后清空
                         this.time--;
                         if(this.time==0){
                             this.time=60;
                             this.sendYxm=true;
                             clearInterval(this.timer)
                         }
                     }, 1000);
                     this.$toast('验证码已发送');
                })
            }else{//手机号为空
                this.$toast('请输入手机号')
            }
          
        },

        // 判断注册内容是否完成填写
        resComplete(){
            let sure = this.$refs.sure;
            if(this.resPhone&&this.resPass&&this.phoneYzm&&this.checked){//都已填写且勾选
               //按钮变色 
               sure.style.background='linear-gradient(to right, #eb6202, #fe7e25)';
                sure.style.color='#fff'
            }else{
               sure.style.background='#dfdfdf';
               sure.style.color='#fff' 
            }
        }

    },
    watch:{
       checked(news,old){
           this.resComplete();
       },
       resPhone(){
           this.resComplete();
       },
       phoneYzm(){
           this.resComplete();
       },
       resPass(){
           this.resComplete();
       },
    }
}
</script>


<style lang="less" scoped>
@import '~style/mixin.less';

    #register{
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
            border-bottom: 1px solid #e1e1e1;
        }
        #content{
            .content();
            width: 3.3rem;
            height: 3.54rem;
            // background: red;
            margin-top:0.45rem ;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            
            .input{
                border:0;
                width: 100%;
                height: 0.46rem;
                border-bottom: 1px solid #e3e3e3;
            }
           .verity{
                width: 100%;
                border-bottom: 1px solid #e3e3e3;
                input{
                    width: 80%;
                    border:0;
                }
           }
           .protocol{
               margin: 0 0 0.3rem;
               display: flex;
               align-items: center;
           }
        }
        
    }
</style>