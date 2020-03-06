<template>
    <div id="home">
        <!-- 轮播图 -->
        <banner :urllist='urllist'></banner>

        <!-- menu菜单1 -->
        <div id="menu-1">
            <div class="menu-1-btn">
                <span>ico</span><span>每日福利</span>
            </div>
            <div class="menu-1-btn">
                 <span>ico</span><span>每日福利</span>
            </div>
            <div class="menu-1-btn">
                 <span>ico</span><span>每日福利</span>
            </div>
            <div class="menu-1-btn">
                 <span>ico</span><span>每日福利</span>
            </div>
        </div>

        <!-- menu菜单2 -->
        <div id="menu-2">
            <div class="menu-2-btn" style="background:#fff6e5">
                <span class="txt">全球奶粉</span>
                <img src="../../../public/imgs/qqnf.jpg" alt="">
            </div>
             <div class="menu-2-btn" style="background:#fff3f5">
                 <span class="txt">尿不湿</span>
                  <img src="../../../public/imgs/nbs.jpg" alt="">
            </div>
             <div class="menu-2-btn" style="background:#fcfef0">
                 <span class="txt">营养辅食</span>
                  <img src="../../../public/imgs/yyfs.jpg" alt="">
            </div>
             <div class="menu-2-btn" style="background:#f6f7fc">
                 <span class="txt">宝宝洗护</span>
                  <img src="../../../public/imgs/bbxh.jpg" alt="">
            </div>
        </div>

        <!-- 推荐商品 -->
        <div id="recommend">
            <div class="title">
                <span class="bg"></span>
                <span class="txt">推荐商品</span>
            </div>
            <nav class="content-list">
                 <li class="rec-list" v-for="(item,index) in recList" :key="index">
                     <img class="rec-img" :src="item.imgUrl" alt="">
                     <div class="rec-detail">
                         <span class="txt">{{item.productName}}</span>
                         <p>
                             <span class="now-p">￥&ensp;{{item.currentPrice}}</span>
                             <span class="old-p">￥&ensp;{{item.originalPrice}}</span>
                         </p>
                         
                     </div>
                 </li>

            </nav>
        </div>
        


    </div>
</template>


<script>
import {getBannerData,getRecommendData} from 'api/api.js'
import banner from 'components/Banner/banner.vue'
export default {
    components:{banner},
    data(){
        return{
            urllist:[],
            recList:[], //推荐商品列表
        }
    },
    mounted(){
        // 请求banner图片
        getBannerData().then((res)=>{
            // console.log(res)
            this.urllist=res.result.list
            // console.log(this.urllist)
        })
        // 请求推荐商品
        getRecommendData().then((res)=>{
            // console.log(res.result.list)
            this.recList =res.result.list
        })

    }
}
</script>


<style lang="less" scoped>
    #home{
        width: 100%;
        // background: red;
        position: absolute;
        top: 0.48rem;
        bottom: 0.49rem;
        #menu-1{
            width: 100%;
            height: 1.2rem;
            // background:red;
            display: flex;
            padding: 0.35rem 0;
            .menu-1-btn{
                width: 25%;
                height: 100%;
                // background: yellow;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
            }
        }
        #menu-2{
            width: 100%;
            height: 2.18rem;
            // background: blue;
            padding: 0 0.12rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
           
            .menu-2-btn{
                width: 1.7rem;
                height: 1.02rem;
                position: relative;
                .txt{
                    position: absolute;
                    left: 0.13rem;
                    top:0.16rem;
                    display: inline-block;
                    font-size: 0.14rem;
                    font-weight: 700;
                }
                img{
                    position: absolute;
                    top: 0.15rem;
                    right: 0.09rem;
                    width: 0.81rem;
                }
            }
            // 218+12+12 242
        }
        #recommend{
            width: 100%;
            margin-bottom: 0.48rem;
            .title{
                height: 0.36rem;
                padding: 0.14rem 0 0.17rem 0.12rem;
                // padding-left: 0.12rem;
                // padding-bottom: 0.17rem;
                display: flex;
                .bg{
                    display:inline-block;
                    width: 0.05rem;
                    height: 0.19rem;
                    background: #ea6222;   
                }
                .txt{
                    font-size: 0.14rem;
                    color: #2c2c2c;
                    display:inline-block;
                    line-height: 0.22rem;
                    margin-left: 0.07rem;
                    font-weight: 600;
                }
            }
            .content-list{
                display: flex;
                flex-direction: column;
                align-items: center;
                .rec-list{
                    width: 3.56rem;
                    height: 1.28rem;
                    padding: 0.18rem 0;
                    border-bottom: 1px solid #f3f3f3;
                    display: flex;
                    justify-content: space-around;
                    .rec-img{
                        width: 0.92rem;
                        height: 0.92rem;
                    }
                    .rec-detail{
                        width: 2.26rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                      
                        .txt{
                            font-size: 0.12rem;
                            color: #424242;
                        }
                        .now-p{
                            color: #852928;
                             font-size: 0.12rem;
                        }
                        .old-p{
                            text-decoration:line-through;
                             color: #cdcdcd;
                             font-size: 0.1rem;
                             margin-left: 0.06rem;
                        }

                    }
                }
            }
            
        }

    }
</style>