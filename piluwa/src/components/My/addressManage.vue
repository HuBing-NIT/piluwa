<template>
    <transition
        
        enter-active-class="animated slideInRight"
    >   
    <div id="addressManage">
        <!-- 顶部title -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>{{title}}</p>
        </div>

        <!-- 地址信息内容 -->
        <nav id="content">
            <li>
                <input placeholder="请输入收货人姓名" type="text" v-model="getName">
            </li>
            <li>
                <input placeholder="请输入收货人手机号码" type="text" v-model="getphone">
            </li>
            <li class="zoon"> 
                <van-cell is-link @click="showPopup" style="padding:10px 30px 10px 0">{{seladdress}}</van-cell>
                <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
                    <van-area :area-list="areaList" @cancel='cancel'  @confirm='checkmsg'/>
                </van-popup>
            </li>
            <li >
                <input placeholder="请输入详细地址：如小区、楼栋、单元室" type="text" v-model="Detail">
            </li>
            <li style="height:0.1rem;background:#f7f7f7;margin:0"></li>
            <!--默认地址 -->
            <li class="default">
                <span>设为默认地址</span>
                <van-switch style="margin-right:0.3rem" active-color="#f08839" size="0.2rem" v-model="checked" />
            </li>
        </nav>
        <!-- 确认-->
        <div id="check" @click="submit" ref="checksubmit">
            {{bottomTxt}}
        </div>
    </div>
    </transition>
</template>


<script>
import {mapState} from 'vuex'
import address from '../../untils/address.js'
import {addAddress,getDetailAddress,editAddress} from 'api/api.js'
export default {
   data() {
    return {
      title:'', //标题
      checked: false,
      show: false,
      areaList:address,
      seladdress:'请选择所在区域',
      getName:'',  //姓名
      getphone:'',  //电话
      Detail:'',   //详细地址
      bottomTxt:'确定',

    }
  },
   computed:{
        ...mapState(['userMsg']),
        getaddress(){
            return this.seladdress+'-'+this.Detail
        }
    },
  methods: {
     
        back(){
            this.$router.go(-1);
        },
        showPopup() {
            this.show = true;
        },
        checkmsg(arr){
            // 选择地址
            let str = ''
            for(let i =0;i<arr.length;i++){
                str=str+arr[i].name+' '
            }
            this.seladdress=str;
            this.show=false;
        },
        cancel(){
            this.show=false;
            this.seladdress='请选择所在区域'
        },
        watchchange(){
            if(this.seladdress&&this.getName&&this.getphone&&this.Detail){
                this.$refs.checksubmit.style.background='red'
            }else{
                this.$refs.checksubmit.style.background='#dddddd'
            }

        },
        submit(){
            if(this.seladdress!='请选择所在区域'&&this.getName&&this.getphone&&this.Detail){
                 let obj = {
                    token:this.userMsg.token,
                    getName:this.getName,
                    getPhone:this.getphone,
                    address:this.getaddress,
                    addressId:this.addressId,
                    status:this.checked?1:0
                }
                    if(this.addressId!='add'){ //表示编辑
                        console.log('编辑')
                        console.log(obj)
                        editAddress(obj).then((res)=>{
                            console.log(res)
                            this.$router.go(-1);
                        })
                    }else{ //表示添加
                        addAddress(obj).then((res)=>{
                        console.log(res)
                        this.$router.go(-1);
                    })}
                     
            } else{
               this.$toast.fail('请补全地址信息');
            }
        }
    },
    mounted(){
        // 获取地址栏的值,判断是edit还是add
        this.addressId = this.$route.params.addressId;
        if(this.addressId!='add'){ //表示是edit 进行渲染
            this.title='修改收货地址'
            this.bottomTxt='编辑'
            let obj={addressId:this.addressId,token:this.userMsg.token}
            getDetailAddress(obj).then((res)=>{
                // console.log(res.result)
                this.seladdress=res.result.address.split('-')[0];
                this.getName=res.result.getName;
                this.getphone=res.result.getPhone; 
                this.Detail=res.result.address.split('-')[1];
                this.checked=(res.result.status==1?true:false) //判断地址的默认状态 1表示为默认地址
            })
        }else{ //表示是添加 不做处理
            this.title='新增收货地址'
        }
    },
    watch:{
         seladdress(){
            this.watchchange()
         },
         getName(){
            this.watchchange()
         },
         getphone(){
            this.watchchange()   
         },
         Detail(){
            this.watchchange()
         }
    }
}
</script>


<style lang="less" scoped>
@import '~style/index.less';

    #addressManage{
        .page();
        background: #f5f5f5;
        font-size: 0.12rem;
        font-weight: 500;
        #header{
           .head()
        }
        #content{
            width: 100%;
            background: #fff;
            li{
                width: 100%;
                height: 0.54rem;
                margin-left: 0.16rem;
                border-bottom: 1px solid #eeeeee;
                input{         
                    width: 100%;
                    height: 100%;
                    border: 0;
                }
            }
            .zoon{
               display: flex;
               align-items: center;
            }
            .default{
               display: flex;
               align-items: center;
               justify-content: space-between;
            }
           
        }
        #check{
            width: 100%;
            height: 0.5rem;
            position: absolute;
            bottom: 0;
            text-align: center;
            line-height: 0.5rem;
            color: #fff;
            background:#dddddd;
        }
    }

</style>