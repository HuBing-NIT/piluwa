<template>
    <div id="classify">
        <!-- 顶部搜索框 -->
        <div class="search">
            这里是搜索框
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
                <li>内容后续补充</li>   
                <li>内容后续补充</li>   
                <li>内容后续补充</li>   
                <li>内容后续补充</li>   
                <li>内容后续补充</li>   
                <li>内容后续补充</li>   
            </nav>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            // classifyDetailList:[],
            classifyList:['推荐分类','皮噜娃尿包','全球奶粉','尿不湿','营养辅食','喂养用品','宝宝洗护','清洁用品','孕产母乳','婴幼儿服饰','宝宝出行'], //左侧类别
            classifySelIndex:0,//当前选中的类别的索引
        }
    },
    methods: {
        // 点击切换类别
        changesel(index){ 
            this.classifySelIndex=index;
        }
    }
}

</script>


<style lang="less" scoped>
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
                    background: gray;
                    // background: black;
                    // color: white
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