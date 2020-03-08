<template>
    <transition
        leave-active-class="animated slideOutRight"
        enter-active-class="animated slideInRight"
    >   
    <div id="mymsg">
        <!-- 顶部title -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>会员资料</p>
        </div>

        <!-- 会员信息列表 -->
        <div class="msgList">
            <!-- 基本信息 -->
            <div class="msg base" v-for="(item,index) in 4" :key="index">
                <!-- 左侧字段 -->
                <span class="msg-l">头像</span>
                <!-- 右侧数据 -->
                <div class="msg-r">
                    <span>无</span>
                    <van-icon name="arrow" />
                </div>
            </div>

            <!-- 地址 -->
            <router-link tag="div" to="mymsg/myaddress" class="msg address" >
                <!-- 左侧字段 -->
                <span class="msg-l">地址管理</span>
                <!-- 右侧数据 -->
                <div class="msg-r">
                    <van-icon name="arrow" />
                </div>
            </router-link>
            <!-- 修改密码 -->
            <div class="msg pass">
                <!-- 左侧字段 -->
                <span class="msg-l">修改密码</span>
                <!-- 右侧数据 -->
                <div class="msg-r">
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>

        <!-- 退出账号 -->
        <div class="loginout">
            退出当前账号
        </div>
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
            title:'',
            sList:[],
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
@import '~style/mixin.less';

    #mymsg{
        .page();
        background: #f5f5f5;
        font-size: 0.12rem;
        font-weight: 500;
        #header{
           .head()
        }
        .msgList{
            width: 100%;
            .msg{
            background: #fff;
            width: 100%;
            padding: 0 0.13rem;
            height: 0.61rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #f6f6f6;
            }
            .address{
                margin: 0.1rem 0;
            }
            .pass{
                margin: 0 0 0.1rem 0;
            }
         
        }
        .loginout{
            height: 0.6rem;
            width: 100%;
            text-align: center;
            line-height: 0.6rem;
            background: #fff;
        }
       
    }
   
</style>