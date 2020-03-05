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
            <div class="menu-2-btn">

            </div>
             <div class="menu-2-btn">

            </div>
             <div class="menu-2-btn">

            </div>
             <div class="menu-2-btn">

            </div>
        </div>


    </div>
</template>


<script>
import {getBannerData} from 'api/api.js'
import banner from 'components/Banner/banner.vue'
export default {
    components:{banner},
    data(){
        return{
            urllist:[],
        }
    },
    mounted(){
        // 请求banner图片
        getBannerData().then((res)=>{
            // console.log(res)
            this.urllist=res.result.list
            // console.log(this.urllist)
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
                float: left;
                background: red;
            }
            // 218+12+12 242
        }

    }
</style>