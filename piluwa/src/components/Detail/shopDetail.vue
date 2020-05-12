
<template>

    <div id="sDetail">
        <!-- 顶部title -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>商品详情</p>
        </div>


        <!-- 商品详细信息 -->
        <div class='wrapper' ref='Wrapper'>
            <div id="content">
                <!-- 轮播图 -->
                <banner v-model="detailData.imgArr"></banner>
                <!-- 说明信息 -->
                <div class="mess">
                    <p class="dispirce">￥{{detailData.currentPrice}}</p>
                    <p class="price">普通价 ￥{{detailData.originalPrice}}</p>
                    <p class="name">{{detailData.productName}}</p>
                    <p class="des">{{detailData.describe}}</p>
                </div>

                <!-- 选择规格 -->
                <div class="sel">
                    <div class="specification">
                        <span>选择</span>
                        <van-cell is-link @click="showPopup">{{specification}}</van-cell>
                        <van-popup v-model="show"  position="bottom" :style="{ height: '60%' }">
                            <article class="popupMess">
                                <section class="popup-price">
                                    <div class="popup-1">
                                        <img :src="detailData.imgUrl" alt="">
                                        <div class="price">
                                            <p style="color:#d35723">￥<span style="font-size:0.2rem">{{detailData.currentPrice}}</span></p>
                                            <p style="font-size:0.16rem;color:#8b8b8b">普通价 ￥{{detailData.originalPrice}}</p>
                                        </div>
                                    </div>
                                </section>
                                <section class="popup-size">
                                    <div class="popup-1">
                                        <span style="font-size:0.14rem;font-weight:600;margin-left:0.1rem">{{detailData.standards[0].title}}</span>
                                        <nav>
                                            <li @click="selstandards(index,item)" v-for="(item,index) in detailData.standards[0].standards" :key="index" :id="selstandardsIndex==index?'selActive':''" >
                                                {{item}}
                                            </li>
                                        </nav>
                                    </div>
                                </section>
                                <section class="popup-count">
                                    <p style="font-size:0.14rem;font-weight:600">购买数量</p>
                                    <van-stepper v-model="count"  />
                                </section>
                                <section class="popup-check">
                                    <button @click="selspecification" ref="check">确认</button>
                                </section>
                            </article>
                        </van-popup>
                    
                    </div>
                </div>

                <!-- 留言 -->
                <div class="sel">
                    <div>
                        <span>商品评论</span>
                        <span style="margin-left:0.1rem">0</span>
                    </div>
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>

        <!-- 加入购物车 -->
        <div class="addCart">
            <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服"  />
            <van-goods-action-icon icon="cart-o" text="购物车" @click="toCart" :info="Cartcount" />
            <van-goods-action-button type="warning" text="加入购物车" @click='addCart' />
            <van-goods-action-button type="danger" text="立即购买" @click="quickbuy" />
            </van-goods-action>
        </div>

    </div>


</template>


<script>
import BS from 'better-scroll'
import {getshopDetail} from 'api/api.js'

import banner from '../Banner/banner'
import {mapState,mapMutations} from 'vuex'
export default {
    components:{banner},
    data(){
        return{
            specification:'选择规格', //选择的规格
            detailData:{},
            show: false,
            count:1,
            selstandardsIndex:-1,
            selstandardsItem:'',
            state:false,
        }
    },
    computed:{
        ...mapState(['userMsg','Cartcount','DetailProductId'])
    },
    methods:{
        ...mapMutations(['changeCartcount','changeProductId','changeorderMsg','showDetail','showOrder']),
        back(){
            // this.$router.go(-1);
            this.$store.commit('changeProductId','')
            this.$store.commit('showDetail',false)
        },
        toCart(){
            this.$store.commit('showDetail',false)
            this.$router.push('/cart') //前往购物车
        },
         initBs(){
            let wrapper = this.$refs.Wrapper
            this.Bs = new BS(wrapper,{probeType:3,click:true})
        },
        showPopup() {
            this.show = true;
        },
        selstandards(index,item){ //选中规格
            if(index!=this.selstandardsIndex){
                this.selstandardsIndex=index
                this.selstandardsItem=item
            }else{
                this.selstandardsIndex=-1
                this.selstandardsItem=''
            }
        },
        selspecification(){ //选择规格   
             if(this.selstandardsItem){  //选择了规格
                    let str = this.detailData.standards[0].title + ':' +this.selstandardsItem+','+'数量'+':'+this.count
                    this.specification=str
                    console.log(this.detailData)
                    this.cartobj={
                        img:this.detailData.imgUrl,
                        name:this.detailData.productName,
                        price:this.detailData.originalPrice,
                        standardsTitle:this.detailData.standards[0].title,
                        selstandardsItem:this.selstandardsItem,
                        count:this.count,
                        productId:this.detailData.productId
                    }      
                }else{
                    this.specification='选择规格'
                }
            this.show=false;
            if(this.state!=true){  //代表加入购物车
                    this.$toast.loading({
                    message: '加入购物车',
                    forbidClick: true,
                    duration:500
                })
                this.addCart()
            }else{ //直接下单
                this.$toast.loading({
                message: '订单生成中..',
                forbidClick: true,
                duration:500
                })
                //动态渲染确认订单组件
                this.$store.commit('showOrder',true)
                this.$store.commit('changeorderMsg',[this.cartobj])
            }
           
            
        },
        addCart(){ //加入购物车
            // 先取出本地localstrong 
            if(this.specification!='选择规格'){ 
                try {//存在的情况
                let obj =  JSON.parse(localStorage.getItem('userCart'))
                let bool = false;
                if(this.userMsg.token){  //token验证 匹配用户
                        let cart = obj.cart; //取出购物车信息 判断商品是否一致
                        cart.map((item)=>{
                            if(item.productId==this.detailData.productId){ //商品ID匹配 一样表示为同件商品
                                bool=true//为同一件商品            
                                item.count+=this.count
                                obj.cart=cart;
                                localStorage.setItem('userCart', JSON.stringify(obj))     //更新localstrong
                                return
                            }
                        })
                        if(bool==false){
                            obj.cart.push(this.cartobj)
                            localStorage.setItem('userCart', JSON.stringify(obj))  // 更新localstrong
                        }
                    }
                } catch (error) {
                    let newobj = {token:this.userMsg.token,cart:[]}
                    newobj.cart.push(this.cartobj)
                    localStorage.setItem('userCart', JSON.stringify(newobj)) 
                }
                this.$toast.success('成功加入购物车');
                this.changeCartcount(this.count+this.Cartcount)  // 改变  store中 cartcount
            }else{
                this.$toast.fail('请选择规格');
                this.show=true;
            }
        },
        quickbuy(){  //立即购买
            // 弹出选项
            this.show=true
            this.state=true;  
        } 
    },
    watch:{
        selstandardsIndex(news,old){
            if(news!=-1){
                this.$refs.check.style.background='#e77735'
            }else{
                 this.$refs.check.style.background='#f7f7f7'
            }
           
        }
    },
    mounted(){
        //  获取地址栏的ID,请求对应数据
        let productId = this.DetailProductId
        console.log(productId)
        let obj = {productId:productId}
        getshopDetail(obj).then((res)=>{
           if(res.status==0){
            console.log(res.result)
            this.detailData=res.result;// 获取的数据赋值
            console.log(this.detailData)
            this.$nextTick(()=>{
              this.initBs();
            })

           }
        })
    }
}
</script>


<style lang="less" scoped>
@import '~style/mixin.less';

    #sDetail{
        .page();
        background: #f5f5f5;
        font-size: 0.12rem;
        font-weight: 500;
        #header{
           .head()
        }
        .wrapper{
            width: 100%;
            height: 100%;
            // background: red;
            overflow: hidden;
            margin-bottom: 0.5rem;
            #content{
                width: 100%;

                .mess{
                    width: 100%;
                    height: 1.5rem;
                    background: #fff;
                    padding: 0 0.15rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    .dispirce{
                        font-size: 0.2rem;
                        color: #d0682d;
                    }
                    .pirce{
                        font-size: 0.14rem;
                        color: #6a6a6a;
                    }
                    .name{
                        font-size: 0.16rem;
                        font-weight: 500;
                    }
                    .des{
                        font-size: 0.12rem;
                        color: #ababab;
                        
                    }
                }
                .sel{
                    width: 100%;
                    height: 0.45rem;
                    background: #fff;
                    margin: 0.15rem 0;
                    padding:0 0.15rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .specification{
                        display: flex;
                        align-items: center;
                        span{
                            display:inline-block;
                            width: 0.3rem;
                        }
                        .van-cell__value{
                            width: 2.8rem;
                        }
                    }
                }
            }
        }
        
       
    }
   
//   弹出框样式
.popupMess{
    .popup-price{
        width: 3.5rm;
        height: 1.3rem;
        margin: 0 0.12rem;
        display: flex;
        border-bottom: 1px solid  #e0e0e0;
        .popup-1{
            display: flex;
            align-items: center;
            width: 2.5rem;
            justify-content: space-around;
            img{
             width: 0.8rem;
            }
            .price{
                height: 0.6rem;
                display: flex;
                flex-direction: column;
                justify-content:space-around;
            }
        }
    }
     .popup-size{
        width: 3.5rm;
        height: 0.94rem;
        margin: 0 0.12rem;
        border-bottom: 1px solid  #e0e0e0;
         .popup-1{
             height: 90%;
             display: flex;
             flex-direction: column;
             justify-content: space-around;
             nav{
                 display: flex;
                 align-items: center;
                 li{
                     margin: 0 0.1rem;
                     padding:0.05rem;
                     border: 1px solid gray;
                 }
            }
         }
    }
     .popup-count{
        width: 3.5rm;
        height: 0.62rem;
        margin: 0 0.12rem;
        border-bottom: 1px solid  #e0e0e0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
     .popup-check{
        width: 3.5rm;
        height: 0.5rem;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        button{
            width: 100%;
            height: 100%;
            border: 0;
        }
    }
}
#selActive{
    border: 1px solid red;
}
</style>