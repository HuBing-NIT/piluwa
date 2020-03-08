<template>
    <div id="my">
        <!-- 登陆成功失败状态 -->
       <div class="LoginState">
           <!-- 登录成功显示 -->
            <div class="login" v-if="LoginState" @click='Tomymsg'>
               登陆成功
            </div>
            <!-- 未登录显示 -->
            <div class="nologin" v-else >
                 <van-icon class="iconfont" class-prefix='icon' name='weidenglutouxiang' size='0.62rem' color='#faefe9' />
                 <span @click="login">立即登录</span>
            </div>
           
          
       </div>
        <!-- 我的订单 -->
        <div class="myorder">
            <div class="title">
                <span>我的订单</span>
                <span>&gt;</span>
            </div>
             <van-grid :column-num="4">
            <van-grid-item
            
                v-for="(value,index) in orderarr"
                class="iconfont"
                icon-prefix='icon'
                :key="index"
                :icon="value.icon"
                :text="value.title"    
            />
            </van-grid>
        </div>

        <!-- 其他选项 -->
         <div class="other">
            <van-grid :column-num="4">
            <van-grid-item  ref="tab"
                @click="loginout(index)"
                v-for="(value,index) in arr"
                class="iconfont"
                icon-prefix='icon'
                :key="index"
                :icon="value.icon"
                :text="value.title"
            />
            </van-grid>
        </div>

        <!--嵌套路由 登陆组件 -->
        <router-view></router-view>
    </div>
    
</template>


<script>
export default {
    data(){
        return {
            LoginState:true,
            orderarr:[{icon: 'daifukuan',title: '待付款'},{icon: 'daifahuo',title: '待发货'},{icon: 'daishouhuo',title: '待收货'},{icon: 'qianshou-',title: '已收货'}],
            arr:[{icon: 'biaodan',title: '我的表单'},{icon: 'huiyuanqia',title: '我的会员卡'},{icon: 'wodejifen',title: '我的积分'},{icon: 'wodeyouhuiquan',title: '我的优惠券'},
            {icon: 'yue',title: '我的余额'},{icon: 'kanjiashangcheng',title: '我的砍价'},{icon: 'icon',title: '推广员中心'},{icon: 'shouhuoren',title: '收货人信息'}]
        }
    },
    methods: {
        login(){
            this.$router.push('/tologin');
            // this.LoginState=true;
        },
        loginout(index){
            // 点击的是最后一个tab才执行退出
            if(index==this.$refs.tab.length-1){
                this.LoginState=false;
            }
        },
        Tomymsg(){ //前往个人信息
            this.$router.push('/my/mymsg')
        }
    },
    watch:{
        // 监听登录状态
        LoginState(newstate,oldstate){
            if(newstate){ //登录状态
                this.arr.push({icon: 'tuichudenglu',title: '退出登录'})
            }else{  //未登录状态
                this.arr.pop()
            }
        }
    }
}
</script>


<style lang="less" scoped>
 #my{
        width: 100%;
        // background: red;
        position: absolute;
        top: 0.48rem;
        bottom: 0.49rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #f4f4f4;
    }

.LoginState{
    width: 100%;
    height: 1.29rem;
    background-image: url('../../../public/imgs/login-bg.jpg') ;
    background-size: auto 100%;
    .nologin{
        margin: 0.3rem 0 0 0.2rem;
       span{    
           display: inline-block;
           margin-left: 0.2rem;
           font-size: 0.12rem;
           color: #ffff;
       }
    }
}
.myorder{
    width: 3.56rem;
    height: 1.08rem;
    margin-top:0.1rem;
    background: #fff;
    border-radius: 0.1rem;
    .title{
        height: 0.36rem;
        padding: 0 0.17rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom:1px solid #f8f8f8;
    }
}
.other{
    width: 3.56rem;
    height: 3rem;
    margin-top:0.2rem;
    border-radius: 0.1rem;
}
</style>