<template>
    <keep-alive>
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
                <li v-for="(item,index) in addressList" :key="index"  @click="seladdress(index)" >
                    <!-- @click="seladdress(index)" -->
                    <p> 
                        <van-tag round type="primary" v-show="item.status==1?true:false">默认</van-tag>
                        <span>{{item.getName}}</span>
                        <span>{{item.getPhone}}</span>
                    </p>
                    <p>
                    <span>{{item.address.replace('-',' ')}}</span>
                    </p>
                    <div class="edit"  >
                         <van-icon class="iconfont" class-prefix='icon' name='shanchu' size="0.16rem" 
                            :addressId='item.addressId' @click.stop="deleteaddress(item.addressId)"
                         />
                         <van-icon class="iconfont" class-prefix='icon' name='bianji' size="0.16rem" 
                            :addressId='item.addressId' @click.stop="editaddress(item.addressId)"
                         />
                        <!-- <van-icon   size="0.15rem" color="#f58232" name="records" /> -->
                    </div>
                </li>
            </nav>
        </div>
        </div>

        <!-- 添加收货地址 -->
        <router-link ref="addaddress" tag="div" id="add" to="addressManage/add">
            <van-icon name="plus"  color="#f38339"/>
            <span>添加收获地址</span>
        </router-link>

        <!-- 路由跳转地址编辑或添加 -->
        <router-view></router-view>


    </div>
    </transition>
    </keep-alive>
</template>


<script>
import BS from 'better-scroll'
import {mapState,mapMutations} from 'vuex'
import {getAddress,deleteAddress} from 'api/api.js'
export default {
    
    data(){
        return{
            addressList:[],
            sourcePath:'',
        }
    },
    beforeRouteLeave: function (to, from, next) {
        let {path} = to 
        if(path  == '/classify'){
            this.$toast.success('修改地址');
            // next('/classify')
        }
        // if(path !== '/classify'){
        //     next();
        // }
        next()
    },
    
    computed:{
        ...mapState(['userMsg']),
    },
    methods: {
        ...mapMutations(['changeAddress']),
       back(){
           this.$router.go(-1);
       },
       editaddress(Id){  //把ID传入地址
            this.$router.push(`addressManage/${Id}`)
            console.log(Id)
       },
       deleteaddress(Id){ //删除地址
        this.$dialog.confirm({
            title: '删除',
            message: '确定删除吗'
            }).then(() => {
                let parms={
                    addressId:Id,
                    token:this.userMsg.token
                }
                deleteAddress(parms).then((res)=>{
                    this.addressRender();
                })
            }).catch(() => {
          
        }); 
            
       },
        initBs(){
            let wrapper = this.$refs.Wrapper
            this.Bs = new BS(wrapper,{probeType:3,click:true})
        },
        addressRender(){
            let obj={token:this.userMsg.token}
            getAddress(obj)
            .then((res)=>{
                console.log(res.result.resArr)
                this.addressList=res.result.resArr;  
                //更新store的userMsg的默认address
                // this.$store.commit('changeAddress',res.result.resArr[0])
                this.$nextTick(()=>{
                    this.initBs()
                })  
            })
        },

        seladdress(index){  //选择地址
            console.log('我被选中了',index)
            console.log(this.addressList[index])
            // 修改全局状态选中的地址
            // 如果是订单进入 点击返回 
            console.log(this.$router)
            this.$store.commit('changeAddress',this.addressList[index])
            this.back();
            //如果不是订单进入 点击没反应
           
 
        },
    },
    mounted(){
        console.log('我被挂载了')
        this.addressRender();
    }
}
</script>


<style lang="less" scoped>
@import '~style/index.less';

    #mymsg{
        .page();
        z-index: 6;
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
                            font-size: 0.12rem;
                            display: inline-block;
                            margin: 0 0.03rem;
                        }
                    }
                    .edit{
                        position: absolute;
                        width: 0.5rem;
                        right: 0.2rem;
                        top: 0.15rem;
                        display: flex;
                        justify-content: space-around;
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