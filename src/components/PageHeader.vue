<template>
  <div class="header">

    <div class="search-box">
      <el-input v-if="showSearch" placeholder="请输入检索词" v-model="input_1" class="input-with-select" @keyup.enter.native="newSearch">
        <el-select v-model="select_1" slot="prepend" placeholder="检索依据" style="width: 120px">
          <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="newSearch"></el-button>
      </el-input >
    </div>

    <!-- <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="font-size: 26px" @click="gotoHome">
        <img v-if="mode==='black'" src="../assets/logo.png" alt="logo" style="height: 40px">
        <img v-else src="../assets/logo.png" alt="logo" style="height: 40px">
      </el-menu-item>
      <el-menu-item index="2" @click="advanceSearch">高级检索</el-menu-item>
      <el-menu-item index="3" @click="gotoScholar">搜索学者</el-menu-item>
      <el-submenu index="5" style="float: right" v-if="isLogin">
        <template slot="title">{{ userName }}</template>
        <el-menu-item index="5-1" class="big-item" @click="gotoLib">个人图书馆</el-menu-item>
        <el-menu-item index="5-2" class="big-item" @click="gotoMySch">我的门户</el-menu-item>
        <el-menu-item index="5-3" class="big-item" @click="settings">账户设置</el-menu-item>
        <el-menu-item index="5-4" class="big-item" @click="logout">退出</el-menu-item>
      </el-submenu>
      <i v-if="isLogin" class="el-icon-user icon"></i>
      <div class="login-button">
        <el-button index="5" style="float: right" v-if="!isLogin" type="primary" @click="login">登 录</el-button>
      </div>
    </el-menu> -->
  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: 'pageHeader',
  props: ['showSearch', 'tag', 'select', 'input', 'mode', 'options'],
  data() {
    return {
      userName: 'shilogic0929',
      activeIndex: '1',
      isLogin: false,
      select_1 : this.select == undefined? "":this.select.search_type,
      input_1: this.input===undefined?"":this.input,
    };
  },
  created() {
    //debugger
    const userInfo = this.$store.state;
    if (userInfo)
    {
      this.isLogin = userInfo.login_state==1?true:false;
      this.userName = userInfo.username;
    }
    console.log("pageheader.vue",this.mode)
    switch (this.mode) {
      case 'white':
        document.documentElement.style.setProperty('--item-font-color', 'black');
        document.documentElement.style.setProperty('--background-color', 'transparent');
        document.documentElement.style.setProperty('--border-bottom', 'none');
        document.documentElement.style.setProperty('--hover-color', '#575757');
        document.documentElement.style.setProperty('--name-color', 'black');
        break;
      case 'black':
        document.documentElement.style.setProperty('--item-font-color', 'white');
        document.documentElement.style.setProperty('--background-color', 'transparent');
        document.documentElement.style.setProperty('--border-bottom', 'none');
        document.documentElement.style.setProperty('--hover-color', '#cbcbcb');
        document.documentElement.style.setProperty('--name-color', 'white');
        break;
      case 'default':
        document.documentElement.style.setProperty('--item-font-color', 'black');
        document.documentElement.style.setProperty('--background-color', 'white');
        document.documentElement.style.setProperty('--border-bottom', '2px solid transparent');
        document.documentElement.style.setProperty('--hover-color', '#575757');
        document.documentElement.style.setProperty('--name-color', 'black');
        break;
    }
  },
  methods: {
    newSearch() {
      //debugger
      if (this.input_1 === '') {
        this.$message.warning("请输入检索词！");
        return;
      }
      let routeUrl = this.$router.resolve({
        path: '/' + this.tag + '?' + this.select_1 + "=" + this.input_1,
      });
      window.open(routeUrl .href, "_self");
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    gotoHome: function () {
      this.$router.push('/');
    },
    advanceSearch: function () {
      // const userInfo = user.getters.getUser(user.state());
      this.$router.push('/advSearch');
    },
    gotoScholar: function () {
      this.$router.push('/searchAut');
    },
    gotoCommunity: function () {
      this.$router.push('/community');
    },
    login() {
      this.$router.push('/login');
    },
    gotoLib() {
      this.$router.push('/schLib');
    },
    gotoMySch() {
      window.open('/schPortal', '_self');
    },
    settings() {
      this.$router.push('/settings');
    },
    logout() {
      this.$store.dispatch('clear');
      this.$message.success("退出成功！");
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }
}
</script>


<style scoped>

:root {
  --item-font-color: white;
  --background-color: transparent;
  --border-bottom: 2px solid transparent;
  --hover-color: black;
  --name-color: black;
}

.header {
  background-color: var(--background-color);
}

.header .icon {
  color: var(--item-font-color);
}

.header .el-menu {
  height: 70px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: var(--background-color);
  color: black;
}

.header .el-menu.el-menu--horizontal {
  border-bottom: var(--border-bottom);
}

.header .el-menu--horizontal >>> .el-menu-item {
  float: left;
  height: 70px;
  line-height: 70px;
  margin: 0;
  border-bottom: var(--border-bottom);
  color: var(--item-font-color);
}

.header >>> .el-submenu__title {
  background: transparent !important;
}

.header >>> .el-submenu__title {
  font-size: 16px;
  color: var(--name-color) !important;
  padding: 0 20px;
  cursor: pointer;
  transition: border-color .3s,background-color .3s,color .3s;
  box-sizing: border-box;
}

.header .el-icon-user {
  padding-top: 22px;
  font-size: 24px;
  float: right;
}

.header .el-menu--horizontal >>>.el-menu-item.is-active {
  border-bottom: 2px solid transparent;
}

.header .el-menu-item {
  font-size: 17px;
}

.header .el-menu--horizontal .el-submenu >>> .el-submenu__title {
  height: 70px;
  line-height: 70px;
  color: black;
}

.header .el-submenu__title {
  font-size: 16px;
  color: black;
}

.el-menu--horizontal >>> .el-submenu.is-active .el-submenu__title {
  border-bottom: none !important;
  color: black;
}

.big-item .el-menu-item li {
  line-height: 50px!important;
}

.login-button {
  padding: 15px;
}

.login-button button {
  width: 100px;
}

.news-link {
  cursor: pointer;
}

.header .search-box {
  position: absolute;
  top: 105px;
  left: 35%;
  z-index: 1;
}
.header .input-with-select {
  width: 500px;
}

.header .el-menu-item:hover {
  background: transparent !important;
  color: var(--hover-color) !important;
}

.header .el-menu--horizontal .el-menu-item.is-active {
  background: transparent !important;
  border-bottom: 2px solid transparent;
}

</style>