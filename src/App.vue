<template>
  <div id="app">
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive" :key="key"/>
    </keep-alive>
    <router-view  v-if="!$route.meta.keepAlive" :key="key"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  mounted:function(){

  },
  computed:{
    key(){
      return this.$route.name !== undefined ? this.$route.query + new Date() : this.$route + new Date();
    }
  }
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  /*background: #222933;*/
}
body{
  margin: 0;
  padding: 0;
}
</style>
