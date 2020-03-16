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
                <van-checkbox-group v-model="result" ref="checkboxGroup">
               

             
                <li class="s-item" v-for="(item,index) in cartList" :key="index" >
                    <div class="s-content">
                        <!-- 勾选按钮 -->
                        <van-checkbox :name="index"></van-checkbox>
                        <!-- 图片 -->
                        <img :src="item.img" alt="" @click="todetail(item.productId)">
                        <!-- 右侧购物车信息 -->
                        <section class="s-r">
                            <p style="font-size:0.14rem;font-weight:600">{{item.name}}</p>
                            <p style="font-size:0.13rem;color:#9f9f9f">{{item.standardsTitle}}:{{item.selstandardsItem}}</p>
                            <div class="s-price">
                                <p style="color:#b14e44">￥<span style="font-size:0.14rem" ref="prices">{{item.price}}</span></p>
                                <van-stepper @plus='plus(index)' @minus='minus(index)' v-model="valueList[index]" integer />
                            </div>
                        </section>
                    </div>
                </li>

                </van-checkbox-group>
            </nav>
            </div>
        </div>

      

        <!-- 底下的结算或删除操作 -->
        
        <div class="operate">
            <van-button type="primary" @click="changesel" shape='shape'>全选</van-button>
           <!-- <van-checkbox icon-size='0.2rem'	v-model="checked" checked-color="#f08839" style="margin-left:0.1rem"><span >全选</span></van-checkbox> -->
           <!-- 结算 -->
           <div class="cal" v-if="editState">
                <p>合计：<span style="color:#ab2a0a">￥{{allprice}}</span></p>
                <van-button color="linear-gradient(to right, #dd6d2d, #ed8440)" @click="makeorder">结算</van-button>
           </div>
           <!-- 删除 -->
           <div class="cal" v-else>
               <van-button color="linear-gradient(to right, #dd6d2d, #ed8440)" @click="DetailFromCart">删除</van-button>
           </div>
           
        </div>
        
    </div>
</template>


<script>
import {mapMutations,mapState} from 'vuex'
import BS from 'better-scroll'
export default {
    data(){
        return{
             Hasshop:true, //购物车是否有商品
             checked: false,//复选框是否选中
             editState:true, //编辑和完成状态
             cartList:[],//购物车列表
             valueList:[],//商品count值
             result: [], //选中状态
             allprice:0, //总价格
        }  
    },
    computed:{
        ...mapState(['userMsg']),
        allcount(){ //计算总数量
            let all=0;
            this.valueList.map((item)=>{
                all+=item
            })
            return all;
        }
    },
    methods:{
        ...mapMutations(['changeTitle','changeCartcount','changeorderMsg','changeProductId','showDetail','showOrder']),
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
        todetail(productId){
            this.$store.commit('changeProductId',productId)
            this.$store.commit('showDetail',true)
        },
        changesel(){//全选与反选
             this.allprice=0;
            if(this.result.length!=this.cartList.length){ //说明没有全部选择
                 this.$refs.checkboxGroup.toggleAll(true); //全选
            }else{
                 this.$refs.checkboxGroup.toggleAll(); //反选
            }  
        },
        changeCount(){ //改变数量
            // 
        },
        remove(index){ //删除购物车选中的商品
            // 根据选中商品的索引获取productId,进行匹配
            
            let sel_productId = this.cartList[index].productId; 
            for (let index in this.cartList) {
                console.log(this.cartList[index].productId)
                if(sel_productId==this.cartList[index].productId){
                    this.cartList.splice(index,1) //从购物车尽心删除
                    break; //结束循环
                }
            }
            // console.log(sel_productId)
        },
        DetailFromCart(){
            this.$dialog.confirm({
            title: '移出购物车',
            message: '确认从购物车移出吗'
            }).then(() => {
                 this.result.map((item)=>{
                    this.remove(item)   //执行 从购物车移出
                 })
                 this.result=[];
                 this.updataLocal() //更新本地local
                 this.editState=true;
            }).catch(() => {

            });
        },
        updataLocal(){ //更新localstrong
            let objcart =  JSON.parse(localStorage.getItem('userCart'));//取出本地
            objcart.cart=this.cartList
            localStorage.setItem('userCart',JSON.stringify(objcart))
        },
        makeorder(){ //确认提交订单
            // 判断商品的选中状态，选中的加入到订单
            if(this.result.length){  //有勾中的商品
                 let remArr=[];  //定义一个移出数组,存放要移出的下标
                this.result.map((item)=>{
                    remArr.push(item);
                });
                remArr.sort().reverse(); //将移出的下标大->小排序
                let orderMsg=[];
                // 加入订单的商品信息
                remArr.map((item)=>{ //需要的索引下标 
                    orderMsg.push(this.cartList[item])  //生成订单信息
                    this.cartList.splice(item,1) //移出购物车
                })
                // 将加入订单的商品信息保存到store.orderMsg
                this.$store.commit('changeorderMsg',orderMsg)
                // 更新本地local
                this.updataLocal();
                // 跳转确认订单页面
                this.$toast.loading({
                    message: '订单生成中..',
                    forbidClick: true,
                    duration:500
                })
                this.$store.commit('changeorderMsg',orderMsg)
                this.$store.commit('showOrder',true)
            }else{
                this.$toast.fail('未选择购物车商品');
            }
           
        },
        cal(index){ //计算总结和总个数
            let selprice= this.cartList[index].price
            let selcount=this.valueList[index]
            let calprice = selprice*selcount;
            // return  { s_price:calprice,s_count:selcount }
            return  { s_price:calprice }
        },
        minus(index){ //计数器减少触发
            if(this.result.indexOf(index)!=-1){
                  this.valueList[index]--;
                this.cartList[index].count = this.valueList[index]; //更新数量
                this.updataLocal();//更新本地
                this.$store.commit('changeCartcount',this.allcount)
                this.allprice -= this.cartList[index].price
            }
        },
        plus(index){//计数器增加触发
            if(this.result.indexOf(index)!=-1){
                this.valueList[index]++;
                this.cartList[index].count = this.valueList[index]; //更新数量
                this.updataLocal();//更新本地
                this.$store.commit('changeCartcount',this.allcount) //更新store总count
                this.allprice += this.cartList[index].price //更新价格
            }
        }
    },
    watch:{
        // valueList(news,olds){  //监听数量的变化
            
        //     news.map((item,index)=>{ //index索引
        //         //判断是否选中
        //         if(this.result.indexOf(index)!=-1){   
        //                 this.cartList[index].count = item;    //更新数量
        //                 this.updataLocal();//更新本地
        //                 this.$store.commit('changeCartcount',this.allcount)      // 更新store全局的allcount
        //                 this.allprice -= this.cartList[index].price
        //         }

        //     })
        // },
        result(news,olds){  //监听勾选的商品
            // console.log(news) //获得选中商品的价格和数量
            // let allcount=0;
            this.allprice=0;
            news.map((item)=>{
                let {s_price} = this.cal(item)
                this.allprice += s_price;
            })
        } 
    },
    mounted(){
        if(this.userMsg.phone){  //如果是登录状态 
            // 判断本地localstrong是否有商品  
            try { 
                let objcart =  JSON.parse(localStorage.getItem('userCart'));
                if(objcart.cart){
                    this.Hasshop=false
                    this.cartList=objcart.cart  //购物车列表赋值
                    
                    for(let index=0;index<this.cartList.length;index++){
                        this.valueList.push(this.cartList[index].count)
                    }
                    this.$store.commit('changeCartcount',this.allcount) 
                    this.$nextTick(()=>{
                        this.initBs();
                    })
                }
                console.log(this.cartList)
            } catch (error) { //无商品
            console.log(error)
                this.Hasshop=true
                console.log('购物车无商品')
            }     
        }else{ //不是登录状态
            this.Hasshop=true
            this.$store.commit('changeCartcount',0) 
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
        // z-index: 5;
        background: #fff;
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
        height: 4.92rem;
        overflow: hidden;
        position: absolute;

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
    background: #fff;
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