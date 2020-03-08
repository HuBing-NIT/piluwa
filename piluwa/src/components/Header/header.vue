<template>
    <div  id='header'>
        <!-- <van-icon name="arrow-left" size='0.2rem' /> -->
        <p>首页</p>
    </div>
</template>


<script>
import {mapState,mapMutations} from 'vuex'
export default {
    computed:{
        ...mapState(['nowPage'])
    },
}
</script>


<style lang="less" scoped>
@import '~style/mixin.less';
    #header{
        .head();
        border-bottom: 1px solid #e2e1e6;
        // p{
        //     margin-left: 0.1rem;
        // }
    }
</style>