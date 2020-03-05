<template>
    <div id="footer">
        <div class="menu">
            <svg :class="icon_active?'icon active':'icon'" @click="changes" aria-hidden="true">
                <use xlink:href="#icon-shouyexuanzhong"></use>
            </svg>
            <span class="txt">
                首页
            </span>
        </div>
        <div class="menu">
            <svg :class="icon_active?'icon active':'icon'" @click="changes" aria-hidden="true">
                <use xlink:href="#icon-shouyexuanzhong"></use>
            </svg>
            <span class="txt">
                分类
            </span>
        </div>
        <div class="menu">
            <svg :class="icon_active?'icon active':'icon'" @click="changes" aria-hidden="true">
                <use xlink:href="#icon-shouyexuanzhong"></use>
            </svg>
            <span class="txt">
                购物车
            </span>
        </div>
        <div class="menu">
            <svg :class="icon_active?'icon active':'icon'" @click="changes" aria-hidden="true">
                <use xlink:href="#icon-shouyexuanzhong"></use>
            </svg>
            <span class="txt">
                我的
            </span>
        </div>
        
    </div>
</template>


<script>
export default {
    data(){
        return{
            icon_active:true,
        }
    },
    methods:{
        changes(){
            this.icon_active=!this.icon_active
        }
    }
}
</script>


<style lang="less" scoped>



#footer{
    width: 100%;
    height: 0.48rem;
    // background: red;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #bebbb6;
    display: flex;
    .menu{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon{
            font-size: 0.3rem;
        }
        .txt{
            font-size: 0.12rem;
        }
    }
}

.active{
    color: blue
}
</style>