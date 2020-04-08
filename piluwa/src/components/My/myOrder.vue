<template>
    <transition
        leave-active-class="animated slideOutRight"
        enter-active-class="animated slideInRight"
    >

    <div id="myorder">
        <!-- 顶部title -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>我的订单</p>
        </div>

        <div id="content">
              <!-- 搜索框 -->
            <section class="search">
                <van-search class="search" v-model="value" placeholder="请输入订单号" 
                />
            </section>
            <!-- tab标签 -->

            <section class="tab wrapper" ref='Wrapper'>
                 <div class='content'>   
                <van-tabs v-model="active" swipeable
                title-active-color='#de721f' @change="changeTab"
                >
                <van-tab style="height:100%" v-for="(item,index) in Tabtitle" :title="item" :key="index">
                    <section v-for="(item,index) in orderList" :key="index">
                    <article style="height:0.1rem;background:#f8f8f8"></article> 
                    <div class="order-List"  @click="ToOrderDetail(item.oId)">
                        <section class="order-List-id">
                            <p>订单号：{{item.oId}}</p>
                        </section>
                          <section class="order-List-tran">
                            <p>平台配送</p>
                        </section>
                         <section class="order-List-time">
                            <p>共计：￥<span class="price">{{item.allprice}}</span></p>
                            <p class="time">{{item.createTime}}</p>
                        </section>
                    </div>
                    </section>
                     
                </van-tab>
                </van-tabs>
                 </div>
            </section>
        </div>

        <router-view></router-view>
    </div>

     
    </transition>
</template>


<script>
import BS from 'better-scroll'
import {getMymsg,getOrderList} from 'api/api.js'
import {mapState} from 'vuex'
export default {
    data(){
        return{
            title:'',
            mymsg:{},
            value: '',
            active: 0,
            Tabtitle:[
                '全部',
                '未付款',
                '已付款',
                '已取消',
                '已完成',
                '审核中',
            ],
            orderList:[],
        }
    },
    props:['index'],
    computed:{
       ...mapState(['userMsg']),
    },
    methods: {
        initBs(){
            let wrapper = this.$refs.Wrapper
            this.Bs = new BS(wrapper,{probeType:3,click:true})
        },
        onSearch(val) {
            Toast(val);
        },
        onCancel() {
            Toast('取消');
        },
        changeTab(name, title){ //激活的标签改变时触发 请求数据
            let obj={
                oUser:this.userMsg.phone,
                oStatus:title
            }
            getOrderList(obj).then((res)=>{
                this.orderList=res.result; //拿到list数据
                this.$nextTick(()=>{
                    this.initBs();
                })
            })
        },
        back(){
           this.$router.go(-1);
        },
        ToOrderDetail(Id){
            console.log(Id)
            this.$router.push(`/my/myorder/${Id}`)
           
        }
    },
    mounted(){
        // 页面第一次加载 请求数据
        console.log(this.Tabtitle)
        this.active=this.index||0;
        let obj={
            oUser:this.userMsg.phone,
            oStatus:this.Tabtitle[this.active]
        }
        getOrderList(obj).then((res)=>{
            this.orderList=res.result; //拿到list数据
            console.log(this.orderList)
            this.$nextTick(()=>{
                this.initBs();
            })
        })
       
    }
}
</script>


<style lang="less" scoped>
@import '~style/mixin.less';

    #myorder{
        .page();
        background: #f8f8f8;
        font-size: 0.12rem;
        font-weight: 500;
        z-index: 4;
        height: 100%;
        #header{
            position: absolute;
           .head()
        }
        #content{
            position: absolute;
            top:0.48rem;
            bottom: 0;
            background: #f8f8f8;
            width: 100%;
            // margin-top:0.48rem;
            .search{
                height: 0.54rem;
            }
            .tab{
                background: #fff;
                // padding: 0 0.1rem;
                position: absolute;
                top: 0.48rem;
                left: 0;
                right: 0;
                bottom: 0;
            }
        }
    }

.order-List{
    width: 100%;
    height: 1.4rem;
    padding: 0.2rem 0.15rem;
    // background: red;
    // margin-top: 0.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .order-List-id{
         font-size: 0.16rem;
         font-weight: 500;
    }
    .order-List-tran{
        font-size: 0.14rem;
          font-weight: 500;
    }
    .order-List-time{
        display: flex;
        justify-content: space-between;
        .price{
            font-size: 0.14rem;
        }
        .time{
            color:#a6a6a6;
            font-size: 0.1rem;
        }
    }
}
    .wrapper{
        width: 100%;
        overflow: hidden;
        .content{
            // height: 100%;
        }
 }
   
</style>