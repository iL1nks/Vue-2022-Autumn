<template>
  <div id="app">
    <nav>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | -->
      <router-link to="/homepage">主页</router-link> |
      <router-link to="/">个人主页</router-link> |
      <router-link to="/">论文界面</router-link> |
      <router-link to="/">检索结果界面</router-link> |
      <router-link to="/">门户界面</router-link> |
      <router-link to="/login">登录注册</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
