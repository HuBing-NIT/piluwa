<template>
    <div id="classify">

    <div class='wrapper' ref='Wrapper'>
        <div class='content'>      
        <!-- 顶部搜索框 -->
        <div class="search">
            <van-search
                v-model="value"
                shape="round"
                input-align="center"
                placeholder="请输入搜索关键词"
                @input='search'
            />
        </div>
        <!-- 分类-列表   -->
        <div class="c-list" >
            <!-- 左侧类别 -->
            <nav class="list-l">
               
                <li v-for="(item,index) in classifyList" :key="index"
                    :class="index==classifySelIndex?'list-l-sel':''"
                    @click="changesel(index)"
                >
                     {{item}}   
                     <span :class="index==classifySelIndex?'list-l-sel':''"></span>

                </li>
            </nav>
            <!-- 右侧类别对应商品 -->
            <nav class="list-r">
                <li v-for="(item,index) in TypeList" :key="index" @click='todetail(item.productId)'>
                    <img :src="item.imgUrl" alt="">
                    <span>{{item.title}}</span>
                </li>   
               
            </nav>
        </div>
        </div>
    </div>
    </div>
</template>


<script>
import BS from 'better-scroll'
import {getClassify} from 'api/api.js'
export default {
    data(){
        return{
            // classifyDetailList:[],
            classifyList:['推荐分类','全球奶粉','皮噜娃尿包','尿不湿','营养辅食','喂养用品','宝宝洗护','清洁用品','孕产母乳','婴幼儿服饰','宝宝出行'], //左侧类别
            classifySelIndex:0,//当前选中的类别的索引
            TypeList:[],
            value:'',
        }
    },
    methods: {
        // 点击切换类别
        changesel(index){ 
            //点击切换类别和商品
            this.classifySelIndex=index;
            this.getType(index+1); 
        },
        // 请求类别数据
        getType(index){
             getClassify(index).then((res)=>{
                console.log(res)
                this.TypeList=res.result;
                this.$nextTick(()=>{
                    this.initBs();
                })
             })
        },
        todetail(productId){
            // 跳转详情页
            this.$router.push(`/detail/${productId}`)
        },
        search(value){
            console.log(value)
            // 值改变 触发ajax请求 模糊查询 跳转对应商品的详情页面
        },
        initBs(){
            let wrapper = this.$refs.Wrapper
            this.Bs = new BS(wrapper,{probeType:3,click:true})
        },
    },
    mounted(){
        // 挂在组件时请求数据
        this.getType(1)
        
    }
}

</script>


<style lang="less" scoped>
.wrapper{
        width: 100%;
        height: 100%;
        // background: red;
        overflow: hidden;
         .content{

         }
 }
     #classify{
        width: 100%;
        // background: red;
        position: absolute;
        top: 0.48rem;
        bottom: 0.49rem;
        .search{
            height: 0.48rem;
            background: green;
        }
        .c-list{
            display: flex;
            .list-l{
                width: 1rem;
                background: #f7f7f7;
                li{
                    height: 0.56rem;
                    text-align: center;
                    line-height: 0.56rem;
                    position: relative;
                    span{
                        position: absolute;
                        display:inline-block;
                        width: 0.05rem;
                        height: 0.23rem;
                        left: 0;
                        top: 0.16rem;
                    }
                }
               
            }
            .list-r{
                width: 2.75rem;
                // background: blue;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-content: flex-start;

                // flex-direction: column;
                li{
                    width: 33.3%;
                    height: 1.15rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    img{
                        width: 0.6rem
                    }
                    span{
                        display: inline-block;
                        text-align: center;
                        width: 80%;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
            }

        }
    }

    .list-l-sel{
        background: #ffffff;
        span{
            background: #f08647;
        }
        
    }
  
</style>