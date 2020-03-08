<template>
    <div id="cart">

        <!-- 编辑 -->
        <div id="edit">
            <span v-if="editState" @click='cartEdit'>编辑</span>
            <span v-else @click='editFin'>完成</span>
        </div>
        <!-- 购物车无商品显示 -->
        <div class="cart-no" v-if="Hasshop">
            
        </div>
        <!-- 购物车有商品显示 -->
        <div class="cart-yes" v-else>
            有商品
        </div>

      

        <!-- 底下的结算或删除操作 -->
        
        <div class="operate">
           <van-checkbox icon-size='0.2rem'	v-model="checked" checked-color="#f08839" style="margin-left:0.1rem"><span >全选</span></van-checkbox>
           <!-- 结算 -->
           <div class="cal" v-if="editState">
                <p>合计：<span style="color:#ab2a0a">￥0.00</span></p>
                <van-button color="linear-gradient(to right, #dd6d2d, #ed8440)">结算</van-button>
           </div>
           <!-- 删除 -->
           <div class="cal" v-else>
               <van-button color="linear-gradient(to right, #dd6d2d, #ed8440)">删除</van-button>
           </div>
           
        </div>
        
    </div>
</template>


<script>
export default {
    data(){
        return{
             Hasshop:true, //购物车是否有商品
             checked: false,//复选框是否选中
             editState:true, //编辑和完成状态
        }  
    },
    methods:{
        cartEdit(){//购物车编辑
            this.editState=false; 
        },
        editFin(){//购物车编辑完成
            this.editState=true; 
        }
    }
    
}
</script>


<style lang="less" scoped>
@import '~style/index.less';
 #cart{
        width: 100%;
        position: absolute;
        top: 0.48rem;
        bottom: 0.49rem;
    }
.cart-no{
    width: 100%;
    position: absolute;
    top:0.31rem;
    bottom: 0.44rem;
    background:url('../../../public/imgs/nocart.jpg') no-repeat center center
}
#edit{
    height: 0.34rem;
    line-height: 0.34rem;
    color: @origen;
    padding: 0 0.12rem;
    text-align: right;
}

.operate{
    width: 100%;
    height: 0.44rem;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size:0.14rem;
    .cal{
        display: flex;
        align-items: center;
        height: 100%;
        p{
            font-size: 0.14rem;
            margin-right: 0.1rem;
        }
        .van-button{
            width: 1rem;
            height: 100%;
        }
    }
}
</style>