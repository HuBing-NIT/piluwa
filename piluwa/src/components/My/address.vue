<template>
    <transition
        leave-active-class="animated slideOutRight"
        enter-active-class="animated slideInRight"
    >   
    <div id="addressManage">
        <!-- 顶部title -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>地址管理</p>
        </div>

        <!-- 地址信息内容 -->
        <nav id="content">
            <li>
                <input placeholder="请输入收货人姓名" type="text" name="" id="">
            </li>
            <li>
                <input placeholder="请输入收货人手机号码" type="text" name="" id="">
            </li>
            <li class="zoon"> 
                <van-cell is-link @click="showPopup" style="padding:10px 30px 10px 0">{{seladdress}}</van-cell>
                <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
                    <van-area :area-list="areaList"  @confirm='checkmsg'/>
                </van-popup>
                <!-- <input placeholder="请选择所在区域" type="text" name="" id=""> -->
                <!-- <van-icon size="0.14rem" name="arrow" /> -->
            </li>
            <li >
                <input placeholder="请输入详细地址：如小区、楼栋、单元室" type="text" name="" id="">
            </li>
            <li style="height:0.1rem;background:#f7f7f7;margin:0"></li>
            <!--默认地址 -->
            <li class="default">
                <span>设为默认地址</span>
                <van-switch style="margin-right:0.3rem" active-color="#f08839" size="0.2rem" v-model="checked" />
            </li>
        </nav>

        <!-- 确认-->
        <div id="check">
            确认
        </div>

       

        

    </div>
    </transition>
</template>


<script>
import address from '../../untils/address.js'
export default {
   data() {
    return {
      checked: true,
      show: false,
      areaList:address,
      seladdress:'请选择所在区域'
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
            let str = ''
            for(let i =0;i<arr.length;i++){
                str=str+arr[i].name+' '
            }
            this.seladdress=str;
            this.show=false;
        }
         
    },
 
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