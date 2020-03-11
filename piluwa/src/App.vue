<template>
  <div id="app">
    <heade></heade>

              <router-view class="view"></router-view>

    <foot></foot>
  </div>
</template>



<script>
import foot from 'components/Footer/footer.vue'
import heade from 'components/Header/header.vue'
import {mapState,mapMutations} from 'vuex';
export default {
  components:{foot,heade},
   computed:{
        ...mapState(['userMsg'])
    },
    methods: {
        ...mapMutations(['changeLoginState']),
    },
    mounted(){
      // localstrong取出loginMsg  保存到store
        // let obj=JSON.parse(localStorage.getItem('loginMsg'))
        // this.changeLoginState(obj)
    }
}


</script>

<style lang="less">


#app {
  // width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

 .wrapper{
        width: 100%;
        height: 100%;
        // background: red;
        overflow: hidden;

         .content{

         }
 }
.view{
  // position: absolute;
  // top: 0.48rem;
  // bottom: 0.48rem;
}

</style>
