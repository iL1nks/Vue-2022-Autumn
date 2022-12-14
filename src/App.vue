<template>
  <div id="app">
    <nav>
      <router-link to="/homepage">主页</router-link> |
      <router-link to="/personalPage">个人主页</router-link> |
      <router-link to="/article">论文界面</router-link> |
      <router-link to="/searchRes/">检索结果界面</router-link> |
      <router-link to="/portal">门户界面</router-link> |
      <router-link to="/portalsearch">门户检索</router-link> |
      <router-link to="/login">登录注册</router-link>
    </nav>
    <MenuTop>
      <router-view />
    </MenuTop>
    <router-view/>
  </div>
</template>

<script>
  import MenuTop from '@/components/Top.vue';
  // import DocCenter from '@/components/DocCenter.vue';
  export default {
    components: { MenuTop},
  };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:rgb(252, 247, 247);
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
