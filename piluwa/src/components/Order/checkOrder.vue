<template>
    <transition
        
        enter-active-class="animated slideInRight"
    >   
    <div id="checkorder">
        <!-- 顶部title -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>确认订单</p>
        </div>
        <div class='wrapper' ref='Wrapper'>
            <!-- 内容区 -->
            <div class="content">

                <!-- 选择地址 -->
                <div id="seladdress" @click="selAddress">
                    <div id="address-l">
                        <p> 
                            <span>{{userMsg.address.getName}}</span>
                            <span>{{userMsg.address.getPhone}}</span>
                        </p>
                        <p>
                            <span>{{userMsg.address.address.replace('-',' ')}}</span>
                        </p>
                    </div>
                    <van-icon size="0.14rem" name="arrow" />
                    
                </div>

                <!-- 订单信息 -->
                <div id="ordermsg">
                    <article id="transport">
                        <p>平台配送</p>
                    </article>
                    <!-- 订单详细内容 -->
                    <article id="orderdetail">
                        <div class="o-list" v-for="(item,index) in orderMsg" :key="index">
                            <section class="d-l">
                                <img :src="item.img">
                            </section>
                              <section class="d-m">
                               <p class="title t-txt">{{item.name}}</p>
                               <p class="standard b-txt">{{item.standardsTitle}}:{{item.selstandardsItem}}</p>
                            </section>
                            <section class="d-r">
                                <p class="o-price t-txt">￥{{item.price}}</p>
                                 <p class="o-count b-txt">X{{item.count}}</p>
                            </section>
                        </div>
                        
                    </article>
                    
                    <!-- 总计 -->
                    <article id="price-cal">
                        <div class="lab">
                            <p>进口税</p>
                            <span class="lab-color-t">￥0.00</span>
                        </div>
                        <div class="lab">
                            <p>小计</p>
                            <span class="lab-color-t">￥{{Scal}}</span>
                        </div>
                        <div class="lab">
                            <p>配送方式</p>
                            <article class="lab-o">
                                <span class="lab-color-t">平台配送</span>
                                <van-icon size="0.14rem" name="arrow" />
                            </article>
                        </div>
                        <div style="height:0.1rem;background:#f8f8f8"></div>
                        <div class="lab">
                            <p>优惠券</p>
                            <article class="lab-o">
                                <span class="lab-color-b">0张可用</span>
                                <van-icon size="0.14rem" name="arrow" />
                            </article>
                            
                        </div>
                        <div class="lab">
                            <p>总计</p>
                            <span class="lab-color-b">￥{{Bcal}}</span>
                        </div>
                    </article>
                </div>


            
            </div>
        </div>
        <!-- 确认-->
        <div id="check" ref="checksubmit">
           <p>合计:<span>￥{{Bcal}}</span></p>
            <van-button color="linear-gradient(to right, #dd6d2d, #ed8440)" @click="sumitorder">提交订单</van-button>
        </div>

        <orderRes v-if='ShowRes' :res='res' :ordermsg='orderDetail' :allcount='Bcal'></orderRes>
    </div>
    </transition>
</template>


<script>
import orderRes from './orderResult.vue';
import BS from 'better-scroll'
import {mapState,mapMutations} from 'vuex'
export default {
   data() {
    return {
       res:'', //支付结果
       ShowRes:false, //显示支付结果
       orderDetail:{
       },  //订单信息
    }
  },
  components:{
      orderRes
  },
   computed:{
       ...mapState(['userMsg','orderMsg']),
       Scal(){
             return this.cal()
       },
       Bcal(){
            // return this.orderMsg.price*this.orderMsg.count-0
            return this.cal()-0
       }
    },
  methods: {
       ...mapMutations(['showOrder']),
        cal(){
            let calprice=0;
            this.orderMsg.map((item,index)=>{
                calprice+=item.price*item.count
            })
            return calprice
        },
        back(){ //返回
             this.$store.commit('showOrder',false)
        },
        checksumbit(){ //提交修改
           
        },
        selAddress(){ //更换收货地址
            this.$router.push('/my/mymsg/myaddress')
        },
        initBs(){
            let wrapper = this.$refs.Wrapper
            this.Bs = new BS(wrapper,{probeType:3,click:true})
        },
        sumitorder(){//确认提交
            this.$dialog.confirm({
            title: '下单中',
            message: '是否提交'
            }).then(() => { //确认付款
                this.$toast.success('下单成功');
                let obj={
                     orderDetail:{
                        'o-user':this.userMsg, //地址中的订单信息
                        'o-shopMsg':this.orderMsg  //订单中的商品信息
                    },  
                }
                this.orderDetail=obj
                // 下单成功把订单的内容通过props传到子组件
                this.res=true;
                this.ShowRes=true;
                console.log('下单成功')
                // 订单中的数据通过父子通信从父组件拿过来
                // 下单成功发起请求写入数据库，订单的状态为未付款状态
            }).catch(() => { //取消付款
                this.$toast.fail('下单失败');
                this.$store.commit('showOrder',false) //返回详情页
                // this.res=false;
                // this.ShowRes=true;
            });
        },

    
    },
    mounted(){
        this.initBs()
        console.log(this.orderMsg)
    },
    watch:{
      
    }
}
</script>


<style lang="less" scoped>
@import '~style/index.less';

    #checkorder{
        
        .page();
        background: #f8f8f8;
        font-size: 0.12rem;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 3;
        #header{
           .head();
        }
        .wrapper{
            width: 100%;
            // background: red;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
        .content{
            width: 100%;
            background: #fff;

            #seladdress{
                width: 100%;
                display: flex;
                align-items: center;
                padding: 0 0.15rem;
                border-bottom: 0.09rem solid #f8f8f8;
                justify-content: space-evenly;
                #address-l{
                    width: 100%;
                    height: 0.96rem;
                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    font-size: 0.14rem;
                    font-weight: 500;
                    position: relative;
                    p{
                        span{
                            font-size: 0.12rem;
                            display: inline-block;
                            margin: 0 0.03rem;
                        }
                    }
                }
            }
            #ordermsg{
                width: 100%;

                #transport>p{
                    width: 100%;
                    height: 0.5rem;
                    padding: 0 0.15rem;
                    line-height: 0.5rem;
                    font-size: 0.14rem;
                    font-weight: 600;   
                    border-bottom: 2px solid #e5e5e5;  
                }
                #orderdetail{
                  
                    width: 100%;
                    // height: 1.12rem;
                    // background: red;
                     border-bottom: 1px solid #f7f7f7;
                     .o-list{
                        height: 1.12rem;
                        width: 100%;
                        padding: 0.16rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        .b-txt{
                            font-size: 0.1rem;
                            color: #9a9a9a;
                        }
                        .t-txt{
                            font-size: 0.12rem;
                            font-weight: 500;
                        }
                        .d-l{
                            width: 30%;
                            img{
                            width: 0.8rem;
                            height: 0.8rem;
                            }
                        }
                        .d-m{
                            height: 100%;
                            width: 50%;
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-start;
                            .standard{
                                margin-top:0.12rem;
                            }
                            
                            
                        }
                        .d-r{
                            height: 100%;
                            width:20%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            align-items: flex-end;
                        }
                     }
                }
                #price-cal{
                    .lab{
                        height: 0.46rem;
                        margin: 0 0.16rem 0 0.16rem;
                        border-bottom: 1px solid #f6f6f6;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        p{
                            font-size: 0.14rem;
                            color: #5b5b5b;
                            font-weight: 600;
                        }
                        .lab-o{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        }
                        .lab-color-b{
                            color: #ed5e68;
                        }
                        .lab-color-t{
                            color: #9a9a9a;
                        }
                    }
                    .lab:nth-child(2){

                    }
                }
            }
    }

        
      
        #check{
            width: 100%;
            height: 0.5rem;
            position: absolute;
            bottom: 0;
            text-align: center;
            // line-height: 0.5rem;
            color: #000;
            background:#fff;
            display: flex;
            padding-left: 0.15rem;
            align-items: center;
            justify-content: space-between;
            p{
                font-size: 0.14rem;
                span{
                    font-size: 0.16rem;
                    color:#cb3135
                }
            }
        }
    }

</style>