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
        <!-- 模糊查询的结果  有-->
        <nav class='search-res' ref="search-res" v-if="SearchRes">
            <li v-for="(item,index) in SearchResList" :key="index" @click='todetail(item.productId)'>
                <span class="title">{{item.title}}</span>
                 <span class="type">{{item.type}}</span>
            </li>
        </nav>
        <!-- 模糊查询的结果  无-->
        <div class='search-res' ref="search-res" v-else>
            无结果
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
                    <li  v-for="(item,index) in TypeList" :key="index" @click='todetail(item.productId)'>
                        <img :src="item.imgUrl" alt="">
                        <span>{{item.title}}</span>
                    </li>   
                    <!-- <span v-show='TypeList'>无数据</span> -->
            </nav>
        </div>
        </div>
    </div>
    </div>
</template>


<script>
import BS from 'better-scroll'
import {getClassify,FuzzySearch,getType} from 'api/api.js'
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            // classifyDetailList:[],
            classifyList:[],
            // ['推荐分类','全球奶粉','皮噜娃尿包','尿不湿','营养辅食','喂养用品','宝宝洗护','清洁用品','孕产母乳','婴幼儿服饰','宝宝出行'], //左侧类别
            classifySelIndex:0,//当前选中的类别的索引
            TypeList:[],
            value:'',
            show: false,
            SearchResList:[],//搜索结果列表
            SearchRes:'',

        }
    },
    computed:{
       
    },
    methods: {
        ...mapMutations(['changeProductId','showDetail']),
        getContainer() {
             return document.querySelector('#search-res');
        },
        // 点击切换类别
        changesel(index){ 
            //点击切换类别和商品
            this.classifySelIndex=index; //点击的索引
            this.getTypeData(index);   //请求数据
        },
        async getTypeList(){ //获取类别列表
                let res = await getType();
            // getType().then((res)=>{ 
                let classifyList = res.result.map((item)=>{
                    return item.Type
                })
                this.classifyList=classifyList
            // })
        },
        // 请求类别数据
        async getTypeData(index){
            let res = await getClassify(this.classifyList[index]);
                this.TypeList=res.result;
            this.$nextTick(()=>{
                this.initBs();
            })
        },
        todetail(productId){
            console.log(productId)
            // 跳转详情页
            this.$store.commit('changeProductId',productId)
            this.$store.commit('showDetail',true)
        },

        // f(fn,delay){
        //     let timer = null;
        //     return function(){
        //         console.log(this)
        //         if(timer){ clearTimeout(timer) }
        //         timer=setTimeout(fn,delay)
        //     }
        // },
        
        search(value){     
            
            // 值改变 触发ajax请求 模糊查询 跳转对应商品的详情页面
            if(value!=''){
                FuzzySearch({kw:value}).then((res)=>{
                    this.SearchResList=res.result
                    this.$refs['search-res'].style.display='block';
                    this.haveResult()
                })
                this.show=true
            }else{
                 this.$refs['search-res'].style.display='none';
                 this.show=false
            }
        },

        

        haveResult(){ //判断有无搜索结果
            if(this.SearchResList.length>0){ //有
                this.SearchRes=true;
            }else{ //无
                 this.SearchRes=false;
            }
        },
        initBs(){
            let wrapper = this.$refs.Wrapper
            // this.Bs = new BS(wrapper,{probeType:3,click:true})
        },
    },
    beforeMount(){
        
    },
    async mounted(){

        // 挂在组件时请求数据
        await this.getTypeList();
        await this.getTypeData(0)
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
        .search-res{
            display: none;
            position: absolute;
            height: 4rem;
            // position: absolute;
            z-index: 5;
            width: 100%;
            background: #fff;
            padding: 0.1rem 0.3rem;
            li{
                border-bottom: 1px solid #e2e1e6;
                padding: 0.1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .title{
                    font-size: 0.14rem;
                }.type{
                    font-size: 0.12rem;
                }
            }
        }
        .c-list{
            display: flex;
            .list-l{
                width: 1rem;
                height: 100vh;
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