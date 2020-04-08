<template>
    <transition
        
        enter-active-class="animated slideInRight"
    >   
    <div id="orderDetail">
        <!-- 顶部title -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>确认订单</p>
        </div>
        
    </div>
    </transition>
</template>


<script>

// import BS from 'better-scroll'

export default {
 
}
</script>


<style lang="less" scoped>
@import '~style/index.less';

    #orderDetail{
        
        .page();
        background: #f8f8f8;
        font-size: 0.12rem;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 5;
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