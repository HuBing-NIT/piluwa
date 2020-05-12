<template>
    <transition
        
        enter-active-class="animated slideInRight"
    >   
    <div id="passManage">
        <!-- 顶部title -->
        <div id='header'>
            <van-icon name="arrow-left" size='0.2rem' @click="back" />
            <p>修改密码</p>
        </div>

        <!-- 内容区 -->
        <div id="content">
            <div class="inp-div">
                <input type="text" name="" id="" placeholder="请输入手机号" v-model="phone">
                <label>{{messerr.phone}}</label>
            </div>
            <div class="inp-div">
                <input type="password" name="" id="" placeholder="请输入原密码" v-model="oldpass">
                <label>{{messerr.oldpass}}</label>
            </div>
            <div class="inp-div">
                <input type="password" name="" id="" placeholder="请输入要设置的新密码" v-model="newpass">
                <label>{{messerr.newpass}}</label>
            </div>
            <div class="inp-div">
                 <input type="password" name="" id="" placeholder="请确认新的密码" v-model="checkpass">
                 <label>{{messerr.checkpass}}</label>
            </div>
            
            
           
        </div>
       
        <!-- 确认-->
        <div id="check" ref="checksubmit" @click="checksumbit">
           提交
        </div>
    </div>
    </transition>
</template>


<script>
import {editpass} from '../../api/api'
import {mapMutations} from 'vuex'
export default {
   data() {
    return {
        phone:'',
        oldpass:'',
        newpass:'',
        checkpass:'',
        messerr:{
            phone:'',
            oldpass:'',
            newpass:'',
            checkpass:''
        }
    }
  },
   computed:{
      
    },
  methods: {
        ...mapMutations(['changeLoginState']),
        back(){ //返回
            this.$router.go(-1);
        },
        judgefill(){ //是否填写
            if(this.phone&&this.oldpass&&this.newpass&&this.checkpass){
                 this.$refs.checksubmit.style.background='red'
                 return true
            }else{
                this.$refs.checksubmit.style.background='#dddddd';
                return false
            }
        },
        judgepass(){ //填写内容是否通过
            let flag=true;
            for(let key in this.messerr){  //遍历 如何有错误
                if(this.messerr[key]!=''){
                    flag=false;
                    this.$toast.fail('输入信息有误');
                    return flag
                }
            }
            return flag
        },
        ExitLoginStatus(){ //退出登录状态
            // local 清除
           
            localStorage.setItem('loginMsg',null)
             // vuex 清除
            this.changeLoginState({})
        },
        checksumbit(){ //提交修改
                if(this.judgefill()&&this.judgepass()){ //判断通过 ajax请求进行密码修改
                     this.$dialog.confirm({
                        title: '确认修改密码',
                    })
                    .then(() => {
                        let passEditobj = {
                            phone:this.phone,
                            password:this.oldpass,
                            newpass:this.newpass
                        }
                        editpass(passEditobj).then((res)=>{
                            if(res.status==0){ //密码修改成功
                                 // 3s后前往login进行重新登录
                                const toast = this.$toast.loading({
                                    duration: 0, // 持续展示 toast
                                    forbidClick: true,
                                    message: '3 秒后前往登录',
                                });

                                let second = 3;
                                const timer = setInterval(() => {
                                    second--;
                                    if (second) {
                                        toast.message = `${second} 秒后前往登录`;
                                    } else {
                                        clearInterval(timer);
                                        // 手动清除 Toast
                                        this.$toast.clear();
                                        // 清除登录状态
                                        this.ExitLoginStatus();
                                        this.$router.push('/tologin/login')//跳转
                                    }
                                }, 1000);

                            }else{//密码修改失败
                                this.$toast.fail('修改失败,请检查输入是否正确');
                            }
                        }).catch((err)=>{
                            console.log(err)
                        })
                    })
                    .catch(() => {
                        // on cancel
                    });
                    
                   
                }else{ //有错误或者信息
                    this.$notify({ type: 'warning', message: '请检查输入是否正确' });
                    // Notify({ type: 'warning', message: '通知内容' });
                }
           

        }
    },
    mounted(){
    },
    watch:{
        phone(){
            this.judgefill()
         },
        oldpass(){
            this.judgefill()
         },
        newpass(){
            this.judgefill()   
        },
        checkpass(news){
            this.judgefill()
            if(news!=this.newpass){
                this.messerr.checkpass='密码输入不一致'
            }else{
                 this.messerr.checkpass=''
            }
        }
    }
}
</script>


<style lang="less" scoped>
@import '~style/index.less';

    #passManage{
        .page();
        background: #fff;
        font-size: 0.12rem;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        align-items: center;
        #header{
           .head()
        }

        #content{
            width: 3.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            .inp-div{
                width: 100%;
                height: 0.5rem;
                display: flex;
                align-items: center;
                 border-bottom: 1px solid #e5e5e5;
                input{
                    border: 0;
                    width: 70%;
                    height: 0.49rem;
                   
                }
                lable{
                    width: 30%;
                    text-align: right;
                }
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