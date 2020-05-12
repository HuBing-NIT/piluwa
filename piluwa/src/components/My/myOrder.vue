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
                <van-search class="search" v-model="value" placeholder="请输入订单号" @input="Search" />
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
                    <!-- <div class="order-List"  @click="ToOrderDetail(item.oId)"> -->
                         <div class="order-List" >
                        <section class="order-List-id">
                            <p class="orderid">订单号：{{item.oId}}</p>
                            <p class="ordertype"><van-tag size='large' :color='statusobj[item.oStatus].color'>{{statusobj[item.oStatus].txt}}</van-tag></p>                            
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
import {getMymsg,getOrderList,SearchOrder} from 'api/api.js'
import {mapState} from 'vuex'


  function debounce(func, wait=1000){ //可以放入项目中的公共方法中进行调用（鹅只是省事）
            let timeout;
            return function(){
            clearTimeout(timeout)
                timeout = setTimeout(()=>{
                    func.call(this)
                },wait)
            }
        }
export default {
    data(){
        return{
            title:'',
            mymsg:{},
            value: '',
            active: 0,
            titleindex:'',
            Tabtitle:[
                '全部',
                '未付款',
                '发货中',
                '已完成',
                '已取消',
                '审核中',
                '已退款'
            ],
            statusobj:{
                '0':{txt:'未付款',color:'volcano'},
                '1':{txt:'发货中',color:'purple'},
                '2':{txt:'已完成',color:'cyan'},
                '3':{txt:'已取消',color:'red'},
                '4':{txt:'审核中',color:'blue'},
                '5':{txt:'已退款',color:'black'},
            },
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
        SearchOrderById(){ //订单号搜索订单 模糊查询
            // let index = this.Tabtitle.indexOf(this.title)-1;
            console.log(this.titleindex)
            let obj={
                oUser:this.userMsg.phone,
                oStatus:this.titleindex,
                oId:this.value
            }
            SearchOrder(obj).then((res)=>{
                this.orderList=res.result.reverse(); //拿到list数据
                console.log(res.result)
                this.$nextTick(()=>{
                    this.initBs();
                })
            })
        },
        // Search:VueDebounce(this.SearchOrderById, 1000),
        Search:debounce(function(){
            this.SearchOrderById()
        },300),

       
        changeTab(name, title){ //激活的标签改变时触发 请求数据
            console.log(this.active)
            this.title=title
            this.titleindex = this.Tabtitle.indexOf(title)-1;
            let index = this.Tabtitle.indexOf(title)-1;
            let obj={
                oUser:this.userMsg.phone,
                oStatus:index,
            }
            this.getOrderListMsg(obj)
            
        },
        back(){
           this.$router.go(-1);
        },
        ToOrderDetail(Id){
            console.log(Id)
            this.$router.push(`/my/myorder/${Id}`)
           
        },
        getOrderListMsg(obj){
            getOrderList(obj).then((res)=>{
                this.orderList=res.result.reverse(); //拿到list数据
                this.$nextTick(()=>{
                    this.initBs();
                })
            })
        }
    },
    mounted(){
        // 页面第一次加载 请求数据
        // console.log(this.Tabtitle)
    
        console.log(this.titleindex)
        this.active=this.index||0;
        this.titleindex=this.active
        console.log(this.active,'active')
          console.log(this.titleindex,'index')
           console.log(this.Tabtitle[this.titleindex],'Tabtitleindex')
             console.log(this.Tabtitle[this.active],'Tabtitleactive')
        // if(this.active==-1){
        //    this.title=this.Tabtitle[this.active]
        //    console.log(this.title)
        // }else{
        //     this.title=this.Tabtitle[this.active]
        // }
      
        // console.log(this.title,'title')
        // else console.log(this.title)
        
        let obj={
            oUser:this.userMsg.phone,
            oStatus:this.titleindex-1
        }
        //   this.title=this.Tabtitle[this.active-1]
         this.getOrderListMsg(obj);
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
         display: flex;
         .orderid{
             width: 60%;
         }
         .ordertype{
             width: 40%;
             text-align: right;
         }
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