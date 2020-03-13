<template>
    <transition

        enter-active-class="animated slideInRight"
    >   
    <div id="mymsg">
        <!-- 顶部title -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>我的收货地址</p>
        </div>

        <!-- 收获地址信息 -->
        <div class='wrapper' ref='Wrapper'>
        <div class='content'>
            <nav id="addressList">
                <li v-for="(item,index) in addressList" :key="index">
                    <p>
                        <span>{{item.getName}}</span>
                        <span>{{item.getPhone}}</span>
                    </p>
                    <p>
                    <span>{{item.address.replace('-',' ')}}</span>
                    </p>
                    <div class="edit" :addressId='item.addressId' @click="editaddress(item.addressId)" >
                        <van-icon   size="0.15rem" color="#f58232" name="records" />
                    </div>
                </li>
            </nav>
        </div>
        </div>

        <!-- 添加收货地址 -->
        <router-link ref="addaddress" tag="div" id="add" to="addaddress/add">
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
import {mapState} from 'vuex'
import {getAddress} from 'api/api.js'
export default {
    data(){
        return{
            addressList:[],
        }
    },
    computed:{
        ...mapState(['userMsg']),
    },
    methods: {
       back(){
           this.$router.go(-1);
       },
       editaddress(Id){  //把ID传入地址
        this.$router.push(`addaddress/${Id}`)
            console.log(Id)
       },
        initBs(){
            let wrapper = this.$refs.Wrapper
            this.Bs = new BS(wrapper,{probeType:3,click:true})
        },
    },
    mounted(){
        let obj={token:this.userMsg.token}
        getAddress(obj)
        .then((res)=>{
            console.log(res.result.resArr)
            this.addressList=res.result.resArr;  
            this.$nextTick(()=>{
                this.initBs()
            })  
        })
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

.wrapper{
    width: 100%;
    overflow: hidden;
    background: #f7f7f7;   
         .content{
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
                    border-bottom: 1px solid gray;
                    position: relative;
                    p{
                        span{
                            display: inline-block;
                            margin: 0 0.03rem;
                        }
                    }
                    .edit{
                        position: absolute;
                        right: 0.2rem;
                        top: 0.15rem;
                    }
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