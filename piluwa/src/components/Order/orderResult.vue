<template>
    <transition
        
        enter-active-class="animated slideInRight"
    >   
    <div id="orderRes">
        <!-- 顶部title -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>{{res?'下单成功':'未付款'}}</p>
        </div>
        <section id="content">
            <div class="warn">
                <span>请于2小时内完成付款,超时订单将被取消</span>
            </div>
                   <!-- 订单信息 -->
            <div id="order-msg">  
                    <van-panel  title="订单号"  :status="orderId">
                    </van-panel>

                    <van-panel title="发送方式" status="平台配送">
                        <div></div>
                    </van-panel>
            </div>
        </section>

        <!-- 操作 -->
         <div class="operate">
           <!-- 结算 -->
           <div class="cal">
                <p>合计：<span style="color:#ab2a0a">￥{{allcount}}</span></p>
                <van-button color="linear-gradient(to right, #dd6d2d, #ed8440)" @click="quickpay">立即支付</van-button>
           </div>           
        </div>
    </div>
    </transition>
</template>


<script>
import {sumbitOrder,updateOrder} from 'api/api.js'
import {mapState,mapMutations} from 'vuex'
export default {
   data() {
    return {
        orderId:'',
        createT:''
    }
  },
  props:['res','ordermsg','allcount'],
  computed:{
      
    },
  methods: {
        ...mapMutations(['showOrder']),
        back(){ //返回
             this.$store.commit('showOrder',false)
        },
        quickpay(){ //立即支付

            this.$dialog.confirm({
            title: '前往支付',
            message: '立即支付'
            }).then(() => { //确认付款
                this.$toast.success('支付成功');
                // 修改名单状态为已付款状态
                 updateOrder({
                     oId:this.orderId,
                     oStatus:'已付款'
                 }).then((res)=>{
                     console.log(res)
                    //  跳转回详情页
                     this.$store.commit('showOrder',false)
                 })

            }).catch(() => { //取消付款
                this.$toast.fail('取消支付');
                // 为未付款状态
                console.log('请在10分钟内完成订单')
            });
        },
        processdata(){ //数据处理
            // let user = 
            let oUser=this.ordermsg.orderDetail['o-user'].phone;
            let oAddress=this.ordermsg.orderDetail['o-user'].address;
            let oShopMsg=this.ordermsg.orderDetail['o-shopMsg'];
            let oId = this.orderId;
            let oStatus = '未付款';
            let createTime =  this.createT;  //创建时间
            let updataTime = '';  //更新时间
            let allprice = this.allcount;
            return {
                oUser,oId,oShopMsg,oAddress,oStatus,createTime,updataTime,allprice
            }
        },
        timePD(m){return m<10?'0'+m:m }, //时间判断

        makderOrderId(){ //随机生成订单号
            let time = new Date()
            // let y = time.getFullYear();
            // let m = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) ;
            // let d = (time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate());
           console.log(time)
            let y = time.getFullYear();
            let m = time.getMonth()+1;
            let d = time.getDate();
            let h = time.getHours();
            let mm = time.getMinutes();
            let s = time.getSeconds();
            let nowDate =''+ y + m +d ; //获取当前的年月日
            let rannum = parseInt(Math.random()*9999)
  
            this.orderId = nowDate+''+rannum

            this.createT= y+'-'+this.timePD(m)+'-'+this.timePD(d)+' '+this.timePD(h)+':'+this.timePD(mm)+':'+this.timePD(s);
            // return nowDate
        }   
    },
    mounted(){
        this.makderOrderId() //生成订单号
        // 调用接口 状态为未付款状态
        sumbitOrder(this.processdata()).then((res)=>{//添加订单到数据库
            console.log
        })    
    },
    watch:{
        
    }
}
</script>


<style lang="less" scoped>
@import '~style/index.less';

    #orderRes{
        
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
        #content{
            width: 100%;
            background: #f8f8f8;
            .warn{
                width: 100%;
                height: 0.37rem;
                text-align: center;
                span{
                    line-height: 0.37rem;
                }
            }
             #order-msg{
                 width: 100%;
                 .van-panel__header-value{
                     color: #424242;
                 }
            }
        }
        .operate{
            width: 100%;
            height: 0.44rem;
            position: absolute;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size:0.14rem;
            border-top:1px solid #e2e2e2;
            background: #fff;
            .cal{
                width: 100%;
                display: flex;
                align-items: center;
                height: 100%;
                display: flex;
                justify-content: space-between;
                p{
                    font-size: 0.14rem;
                    margin-left: 0.2rem;
                }
                .van-button{
                    width: 1rem;
                    height: 100%;
                }
            }
}
       
      
    }

</style>