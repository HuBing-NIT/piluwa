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
export default {
  components:{foot,heade}
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
.view{
  // position: absolute;
  // top: 0.48rem;
  // bottom: 0.48rem;
}

</style>
