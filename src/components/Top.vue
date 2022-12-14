<template>
  <div class="header">

    <!-- <div class="search-box">
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
    </div> -->

    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="font-size: 26px" @click="gotoHome">
        <img src="../assets/is.png" alt="logo" style="height: 60px">
      </el-menu-item>
      <el-submenu index="5" style="float: right" v-if="this.$store.state.login_state === 1">
        <template slot="title">{{ this.$store.state.username }}</template>
        <el-menu-item index="5-1" class="big-item" @click="gotoLib">个人中心</el-menu-item>
        <el-menu-item index="5-2" class="big-item" @click="goto_portal()">我的门户</el-menu-item>
        <el-menu-item index="5-3" class="big-item" @click="search_portal()">搜索门户</el-menu-item>
        <!-- <el-menu-item index="5-3" class="big-item" @click="settings">账户设置</el-menu-item> -->
        <el-menu-item index="5-4" class="big-item" @click="logout">退出登录</el-menu-item>
      </el-submenu>
      <!-- <i v-if="this.$store.state.login_state === 1" class="el-icon-user icon"></i> -->
      <div v-if="this.$store.state.login_state === 1" class="div_head"><img :src="'https://intellisci.shlprn.cn/'+this.$store.state.user_photo" class="head"></div>
      <div class="login-button">
        <!-- <div class="denglu">登 录</div> -->
        <el-button index="5" style="float: right" v-if="this.$store.state.login_state === 0" type="info" round plain size="mini" @click="login">登 录</el-button>
      </div>
    </el-menu>
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
      select_1 : this.select == undefined? "":this.select,
      input_1: this.input===undefined?"":this.input,
    };
  },
  created() {
    const userInfo = user.getters.getUser(user.state());
    if (userInfo)
    {
      this.isLogin = true;
      //this.userName = userInfo.user.username;
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
      this.$router.push('/personcenter');
    },
    goto_portal() { // 我的门户入口函数
      this.$axios.post('portal/get_portal', qs.stringify({
      }), {
        headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
        },
      }).then((res) => {
        if(res.data.errno==0){
          this.$router.push({path:'/portal',query:{id:res.data.portalid}});
        }
        else{
          this.$message.warning('该用户无门户，3秒后将跳转到门户搜索页认领门户');
          sleep(3000);
          this.$router.push({path: '/portalsearch'});
        }
      })
    },
    search_portal() { // 搜索门户入口函数
      this.$router.push({path: '/portalsearch'});
    } ,
    settings() {
      this.$router.push('/settings');
    },
    logout() {
      this.$store.dispatch('clear');
      this.$store.commit('set_login',0)
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
  background-color: #f1e0e0;
  /* background-color: #dfabab; */
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

.head {
    height: 45px;
    width: 45px;
    border-radius: 30px;
    float: right;
    /* padding-top: 20px; */
}

.div_head {
    padding-top: 11px;
}
.denglu {
  /* float: right; */
  display: flex;
  background-color: yellow;
  height: 70px;
  width: 70px;
  font-size: 20px;
  font-weight: 300;
}

.denglu :hover {
  background-color: blue;
}

</style>