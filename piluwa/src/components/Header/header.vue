<template>
    <div  id='header'>
        <!-- <van-icon name="arrow-left" size='0.2rem' /> -->
        <p>{{Title}}</p>
    </div>
</template>


<script>
import {mapState,mapGetters} from 'vuex'
export default {
    computed:{
        // ...mapState(['Title'])
        ...mapGetters(['Title'])
    },
}
</script>


<style lang="less" scoped>
@import '~style/mixin.less';
    #header{
        .head();
 
        border-bottom: 1px solid #e2e1e6;
        p{
            transform: translateX(0);
        }
    }
</style>