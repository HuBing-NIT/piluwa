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

         <div class='wrapper' ref='Wrapper' v-else>
            <div class='content'>
            <nav id='shop-list'>
                <li class="s-item" v-for="(item,index) in cartList" :key="index" >
                    <div class="s-content">
                        <img :src="item.img" alt="" @click="jumpdetail(item.productId)">
                        <section class="s-r">
                            <p style="font-size:0.14rem;font-weight:600">{{item.name}}</p>
                            <p style="font-size:0.13rem;color:#9f9f9f">{{item.standardsTitle}}:{{item.selstandardsItem}}</p>
                            <div class="s-price">
                                <p style="color:#b14e44">￥<span style="font-size:0.14rem">{{item.price}}</span></p>
                                <van-stepper v-model="value" integer />
                            </div>
                        </section>
                    </div>
                </li>
            </nav>
            </div>
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
import BS from 'better-scroll'
export default {
    data(){
        return{
             Hasshop:true, //购物车是否有商品
             checked: false,//复选框是否选中
             editState:true, //编辑和完成状态
             cartList:[],//购物车列表
        }  
    },
    methods:{
        cartEdit(){//购物车编辑
            this.editState=false; 
        },
        editFin(){//购物车编辑完成
            this.editState=true; 
        },
         initBs(){
            let wrapper = this.$refs.Wrapper
            this.Bs = new BS(wrapper,{probeType:3,click:true})
        },
        jumpdetail(productId){
             this.$router.push(`/detail/${productId}`)
        }
    },
    mounted(){
        // 判断本地localstrong是否有商品  
        try { 
            let objcart =  JSON.parse(localStorage.getItem('userCart'));
            if(objcart.cart){
                this.Hasshop=false
                this.cartList=objcart.cart 
                console.log(this.cartList)
                this.$nextTick(()=>{
                     this.initBs();
                })
            }
        } catch (error) { //无商品
            this.Hasshop=true
        }
       
    },
    
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
 .wrapper{
        width: 100%;
        // background: red;
        // height: 100%;
        overflow: hidden;
        position: absolute;
        top:0.34rem;
        bottom: 0.44rem;
        // background: #f7f7f7;
        // margin-bottom: 1.26rem;   
        .content{
            width: 100%;
              #shop-list{ 
                width: 100%;
                .s-item{
                    border-top: 1px solid #e3e3e3;
                    padding: 0 0.1rem;
                    width: 100%;
                    height: 1.2rem;

                    display: flex;
                    align-items: center;
                    .s-content{
                        width: 3.56rem;
                        height: 0.9rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        img{
                            width: 0.7rem;
                        }
                        .s-r{
                            width: 2.3rem;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            p{
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            }
                            .s-price{
                                display: flex;
                                justify-content: space-between
                            }
                        }
                    }
                }
              }
      
        }
    }  
#edit{
    height: 0.34rem;
    line-height: 0.34rem;
    color: @origen;
    padding: 0 0.12rem;
    text-align: right;
    background: #f7f7f7;
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
    border-top:1px solid #e2e2e2;
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