<template>
    <transition
        leave-active-class="animated slideOutRight"
        enter-active-class="animated slideInRight"
    >   
    <div id="tDetail">
        <!-- 头部 -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>{{title}}</p>
        </div>
        
        <!-- 列表 -->
        <div class='wrapper' ref='Wrapper'>
            <div class='content'>
            <nav id="s-list">
                <li v-for="(item,index) in sList" :key="index"  @click='todetail(item.productId)'>
                    <img v-lazy="item.imgUrl" alt="">
                    <span class="txt">{{item.title}}</span>
                    <span class="price">￥444.00</span>
                </li>    
            </nav>
            </div>
        </div>
    </div>
    </transition>
</template>


<script>
import BS from 'better-scroll'
import {getClassify} from 'api/api.js'
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            title:'',
            sList:[],
        }
    },
    methods: {
        ...mapMutations(['changeProductId','changeRender']),
       back(){
            this.$router.go(-1);
            // this.$store.commit('changeProductId','')
            // this.$store.commit('changeRender','')
       },
       // 请求类别数据
       getType(index){
             getClassify(index).then((res)=>{
                 console.log(res)
                 this.sList=res.result;
                 this.initBs();
             })
        },
        initBs(){
            let wrapper = this.$refs.Wrapper
            this.Bs = new BS(wrapper,{probeType:3,click:true})
        },
        todetail(productId){
            // 跳转详情页
            // this.$router.push(`/detail/${productId}`)
            this.$store.commit('changeProductId',productId)
            this.$store.commit('changeRender','detail')

        },
    },
    mounted(){
        // 根据动态路由获取标题
        this.title=this.$route.params.name
        // 挂在组件时请求数据
        this.getType(this.title)
    }
}
</script>


<style lang="less" scoped>
@import '~style/mixin.less';

    #tDetail{
        .page();
        #header{
           .head()
        }
    }
    .wrapper{
        width: 100%;
        
        // background: red;
        overflow: hidden;
        background: #f7f7f7;   
         .content{
              #s-list{
                // .content_b();
                padding-top:0.05rem;
                display: flex;
                flex-wrap: wrap;
                align-content: flex-start;
                // justify-content: space-evenly;      
                li{
                    width: 1.7rem;
                    height: 2.3rem;
                    background: #fff;
                    margin: 0.05rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-evenly;
                    img{
                        width: 1.4rem;
                    }
                }
                li:nth-child(2n-1){
                    margin-left: 0.12rem;
                }
              }
      
    }   


    // #s-list{
    //     .content_b();
    //     padding-top:0.05rem;
    //     display: flex;
    //     flex-wrap: wrap;
    //     align-content: flex-start;
    //     justify-content: space-evenly;
    //     background: #f7f7f7;
    //     li{
    //         width: 1.7rem;
    //         height: 2.3rem;
    //         background: #fff;
    //         margin: 0.05rem;
    //         display: flex;
    //         flex-direction: column;
    //         align-items: center;
    //         justify-content: space-evenly;
    //         img{
    //             width: 1.4rem;
    //         }
    //     }
       
    // }
    }
</style>