<template>
    <div id="cart">
        <!-- 购物车无商品显示 -->
        <div class="cart-no" v-if="Hasshop">
            无商品
        </div>
        <!-- 购物车有商品显示 -->
        <div class="cart-yes" v-else>
            有商品
        </div>
        <!-- 底下的结算或删除操作 -->
        
        <div class="operate">
            <div>1111</div>
            <van-button style="width:1.1rem" block=true color="linear-gradient(to right, #db6b2b, #ee8541)" >结算</van-button>
            
        </div>
        
    </div>
</template>


<script>
export default {
    data(){
        return{
            Hasshop:true,
        }  
    },
    
}
</script>


<style lang="less" scoped>
 #cart{
        width: 100%;
        position: absolute;
        top: 0.48rem;
        bottom: 0.49rem;
    }
.cart-no{
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0.44rem;
    background:url('../../../public/imgs/nocart.jpg') no-repeat center center
}
.operate{
    width: 100%;
    height: 0.44rem;
    position: absolute;
    bottom: 0;
    background: red;
}
</style>