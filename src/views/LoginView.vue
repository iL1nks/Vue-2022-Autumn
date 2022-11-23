<template>
  <div>
    <img src="../assets/LoginBackground1.png" height="693" width="1536" style="position: absolute;left: 0px;top: 60px">
    <div class="block">
      <ul class="tabs" >
        <i class="line" :style="{left: slideLeft}"></i>
        <li v-for="(item, index) in tabList" :key="index" class="tab" :class="{'tab-current':  index == currentIndex}" @click="clickTab(index)">{{item}}</li>
      </ul>
      <div class="login" v-if="currentIndex===0">
        <h1 style="margin-left: 80px;margin-top: 50px;font-family: 'Segoe UI'">欢迎登录学术交流网站</h1>

        <el-input style="margin-top: 50px" v-model="login_email" prefix-icon="el-icon-message" placeholder="请输入账号"></el-input>

        <el-input style="margin-top: 40px" v-model="login_password" show-password prefix-icon="el-icon-key" placeholder="请输入密码"></el-input>

        <el-button style="margin-top: 50px" type="login_button" v-on:click="login_0">登 录</el-button>
      </div>
      <div class="register" v-if="currentIndex===1">

        <el-input  class="register_input" v-model="register_email" prefix-icon="el-icon-message" placeholder="请输入邮箱地址" @blur="email_blur"></el-input>

        <el-input  class="register_input" v-model="register_name" prefix-icon="el-icon-user" placeholder="请输入姓名" @blur="name_blur"></el-input>

        <el-input  class="register_input" v-model="register_password" show-password prefix-icon="el-icon-key" placeholder="请输入密码"  @blur="password_blur"></el-input>

        <el-input  class="code_input" v-model="register_code"  placeholder="请输入验证码"></el-input>
        <el-button type="email_check" v-on:click="send_code">发送验证码</el-button>

        <el-button style="margin-top: 35px" type="login_button" v-on:click="register_0">注 册</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "LoginView",
  mounted() {
    document.body.style.backgroundColor="#FCF7F7";
    this.slideLineLeft();
  },
  data () {
    return {
      tabList: ['登录', '注册'],
      tabLen: '',
      currentIndex: 0,
      slideLeft: '',

      register_email:'',
      register_code:"",
      register_name:'',
      register_password:'',

      login_email:'',
      login_password:'',

    }
  },
  methods: {
    // 点击时的下划线跟随效果
    clickTab (index) {
      this.currentIndex = index
      this.slideLeft = this.currentIndex * 85+55 + 'px'
    },
    // 刚进入页面没有点击时的下划线设置
    slideLineLeft () {
      this.tabLen = this.tabList.length
      this.slideLeft = this.currentIndex * 100+55 + 'px'
    },

    login_0(){
      if(this.login_email==''){
        this.$message.error("未输入邮箱");
      }
      if(this.login_password==''){
        this.$message.error("未输入密码");
      }
    },
    register_0(){

    },
    send_code(){
    },
  },

}
</script>

<style scoped>
.el-input {
  width: 73%;
  margin-top: 13px;
  margin-left: 65px;
}

/deep/ .el-input__inner {
  border-width: 1px 1px 1px 1px;
}
/deep/ .el-input__inner {
  border-width: 1px 1px 1px 1px;
}
/deep/ .el-input__inner:focus {
  border-color: #383838;
}
.register_input{
  margin-top: 30px;
}
.code_input{
  width: 35%;
  margin-left: 65px;
  height: 40px;
}
.block{
  background: transparent;
  width: 500px;
  height: 500px;
  text-align: left;
  position: absolute;
  left: 530px;
  top:150px;
  border-radius: 2%;
  box-shadow: 0px 0px 10px #E9D8D8;
}
.choice{
  height: 50px;
  width: 100%;
  margin-top: 20px;

}
.underline{
  float: left;
  margin-left: 5%;
  width: 90%;
  height: 3px;
  background-color: blanchedalmond;

}
.tabs{
  margin-top: 20px;
  text-align: center;
  position: relative;
  height: 40px;
}
.tab{
  width: 86px;
  float: left;
  margin-top: 10px;
  font-weight: lighter;
  color: #c3c6cd;
  font-size: 16px;
  list-style: none;
  cursor: pointer;
}
.tab-current{
  font-size: 16px;
  margin-top: 10px;
  color: #1c253a;
  font-weight: 500;
  list-style: none;
  cursor: default;
}
.line{
  position: absolute;
  bottom: 0;
  width: 70px;
  margin-left: -.4rem;
  transition: all 0.3s;
  height: .08rem;
  border-radius: .04rem;
  background: #0367a6;
}

.el-button--login_button {
  color: #FFF;
  margin-left: 165px;
  margin-top: 50px;
  width: 170px;
  background-color: #0367a6;
  border-color: #0367a6;
  font-size: 18px;
  letter-spacing: 1px;
}
.el-button--login_button:hover {
  color: #FFF;
  margin-left: 65px;
  margin-top: 50px;
  width: 370px;
  background-color: #008997;
  border-color: #008997;
  font-size: 18px;
  letter-spacing: 1px;
}
.el-button--login_button:focus {
  color: #FFF;
  margin-left: 165px;
  margin-top: 50px;
  width: 170px;
  background-color: #0367a6;
  border-color: #0367a6;
  font-size: 18px;
  letter-spacing: 1px;
}
.el-button--email_check {
  color: #FFF;
  margin-left: 65px;
  margin-top: 30px;
  width: 120px;
  height: 40px;
  background-color: #0367a6;
  border-color: #0367a6;
  font-size: 16px;
}
.el-button--email_check:hover {
  color: #FFF;
  margin-left: 65px;
  margin-top: 30px;
  width: 120px;
  height: 40px;
  background-color: #008997;
  border-color: #008997;
  font-size: 16px;
}
.el-button--email_check:focus {
  color: #FFF;
  margin-left: 65px;
  margin-top: 30px;
  width: 120px;
  height: 40px;
  background-color: #0367a6;
  border-color: #0367a6;
  font-size: 16px;
}

</style>