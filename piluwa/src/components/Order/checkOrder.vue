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
                <div id="seladdress">
                    <div id="address-l">
                        <p> 
                            <!-- <span>{{item.getName}}</span>
                            <span>{{item.getPhone}}</span> -->
                            <span>xxx</span>
                            <span>XXXXXXX</span>
                        </p>
                        <p>
                        <!-- <span>{{item.address.replace('-',' ')}}</span> -->
                            <span>XXX</span>
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
                        <div></div>
                        <div></div>
                        <div></div>
                    </article>
                    
                    <!-- 总计 -->
                    <article id="price-cal">
                        <div class="lab">
                            <p>进口税</p>
                            <span class="lab-color-t">￥0.00</span>
                        </div>
                        <div class="lab">
                            <p>小计</p>
                            <span class="lab-color-t">￥59.00</span>
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
                            <span class="lab-color-b">￥59.00</span>
                        </div>
                    </article>
                </div>


            
            </div>
        </div>
        <!-- 确认-->
        <div id="check" ref="checksubmit">
           <p>合计:<span>￥59.00</span></p>
            <van-button color="linear-gradient(to right, #dd6d2d, #ed8440)" @click="sumitorder">提交订单</van-button>
        </div>
    </div>
    </transition>
</template>


<script>
import BS from 'better-scroll'
import {mapState,mapMutations} from 'vuex'
export default {
   data() {
    return {
       
    }
  },
   computed:{
      
    },
  methods: {
       ...mapMutations(['changeRender']),
        back(){ //返回
             this.$store.commit('changeRender','')
        },
       

        checksumbit(){ //提交修改
           
        },
        initBs(){
            let wrapper = this.$refs.Wrapper
            this.Bs = new BS(wrapper,{probeType:3,click:true})
        },
    },
    mounted(){
        this.initBs()
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
                     div{
                          height: 1.12rem;
                          width: 100%;
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