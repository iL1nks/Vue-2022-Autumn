<template>
  <div>
    <img src="../assets/LoginBackground1.png" height="693" width="1536" style="position: absolute;left: 0px;top: 60px">
    <div class="block">
      <ul class="tabs" >
        <i class="line" :style="{left: slideLeft}"></i>
        <li v-for="(item, index) in tabList" :key="index" class="tab" :class="{'tab-current':  index == currentIndex}" @click="clickTab(index)">{{item}}</li>
      </ul>
      <div class="login" v-if="currentIndex===0&&forget===0">
        <h2 style="margin-left: 130px;margin-top: 40px;font-family: 'Segoe UI';">欢迎登录学术交流网站</h2>

        <el-input style="margin-top: 40px" v-model="login_email" prefix-icon="el-icon-message" placeholder="请输入账号"></el-input>

        <el-input style="margin-top: 50px" v-model="login_password" show-password prefix-icon="el-icon-key" placeholder="请输入密码"></el-input>

        <el-button style="position: absolute;top: 340px" type="text" @click="clickforget()">忘记密码</el-button>
        <el-button style="margin-top: 60px" type="login_button" v-on:click="login">登 录</el-button>
      </div>
      <div class="login" v-if="currentIndex===0&&forget===1">
        <h2 style="margin-left: 200px;margin-top: 0px;font-family: 'Segoe UI';">修改密码</h2>

        <el-input  style="margin-top: 10px" v-model="forget_email" prefix-icon="el-icon-message" placeholder="请输入账号"></el-input>
        <el-input  style="margin-top: 30px" v-model="forget_password_0" show-password prefix-icon="el-icon-key" placeholder="请输入密码"></el-input>
        <el-input  style="margin-top: 30px" v-model="forget_password_1" show-password prefix-icon="el-icon-key" placeholder="请再次输入密码"></el-input>
        <el-input  class="code_input" v-model="forget_code"  placeholder="请输入验证码"></el-input>
        <el-button type="email_check" v-on:click="send_passwordcode">发送验证码</el-button>

        <el-button style="margin-top: 30px" type="login_button" @click="clicklogin()">确 认</el-button>
      </div>

      <div class="register" v-if="currentIndex===1">
        <h3 style="margin-left: 150px;margin-top: 0px;font-family: 'Segoe UI';">欢迎注册学术交流网站</h3>
        <el-input  class="register_input" style="margin-top: 0px" v-model="register_email" prefix-icon="el-icon-message" placeholder="请输入邮箱地址" ></el-input>

        <el-input  class="register_input" v-model="register_name" prefix-icon="el-icon-user" placeholder="请输入昵称" ></el-input>
        <el-input  class="register_input" v-model="register_realname" prefix-icon="el-icon-user" placeholder="请输入真实姓名" ></el-input>
        <el-input  class="register_input" v-model="register_password" show-password prefix-icon="el-icon-key" placeholder="请输入密码"  ></el-input>

        <el-input  class="code_input" v-model="register_code"  placeholder="请输入验证码"></el-input>
        <el-button style="margin-top: 35px" type="email_check" v-on:click="send_code">发送验证码</el-button>

        <el-button style="margin-top: 15px" type="login_button" v-on:click="register">注 册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import user from "@/store/user";
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
      forget: 0,
      register_email: '',
      register_name: '',
      register_realname: '',
      register_password: '',
      register_code: '',
      register_getcode: '',

      login_email: '',
      login_password: '',

      forget_email: '',
      forget_password_0: '',
      forget_password_1: '',
      forget_code: '',
      forget_flag: 0,
      forget_getcode: '',

      user_id:0,
    }
  },
  methods: {
    // 点击时的下划线跟随效果
    clickTab (index) {
      this.currentIndex = index
      this.slideLeft = this.currentIndex * 85+55 + 'px'
      this.forget = 0
    },
    // 刚进入页面没有点击时的下划线设置
    slideLineLeft () {
      this.tabLen = this.tabList.length
      this.slideLeft = this.currentIndex * 100+55 + 'px'
    },
    clickforget(){
      this.forget = 1
    },
    clicklogin(){
      this.forget_flag=0;
      if(this.forget_email==''){
        this.$message.error("未输入邮箱");
        this.forget_flag=1;
      }
      else if(this.forget_password_0==''){
        this.$message.error("未输入密码");
        this.forget_flag=1;
      }
      else if(this.forget_password_1==''){
        this.$message.error("未输入确认密码");
        this.forget_flag=1;
      }
      else if(this.forget_code==''){
        this.$message.error("未输入验证码");
        this.forget_flag=1;
      }
      else if(this.forget_code!==this.forget_getcode){
        this.$message.error("验证码错误");
        this.forget_flag=1;
      }
      else{
        this.$axios
            .post('user/modify_password', qs.stringify({
              mode:1,
              user_id:this.user_id,
              password_1:this.forget_password_0,
              password_2:this.forget_password_1,
            }) )
            .then((res) => {
              if (res.data.errno === 0) {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
      }
      if(this.forget_flag===0) this.forget = 0
    },
    login(){
      if(this.login_email==''){
        this.$message.error("未输入邮箱");
      }
      else if(this.login_password==''){
        this.$message.error("未输入密码");
      }
      else{
        this.$axios
            .post('user/user_login', qs.stringify({
              user_id:this.login_email,
              password:this.login_password,
            }) )
            .then((res) => {
              if (res.data.errno === 0) {
                this.$message.success(res.data.msg);
                this.$store.commit('set_login',1)
                this.$store.commit('set_username',res.data.data.username)
                this.$store.commit('set_token',res.data.data.authorization)
                this.$store.commit('set_userid',res.data.data.user_id)
                this.$store.commit('set_user_photo',res.data.data.photo)
                this.$store.commit('set_user_email',res.data.data.email)
                this.$store.commit('set_user_truename',res.data.data.truename)
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
      }
    },
    register(){
      if(this.register_email==''){
        this.$message.error("未输入邮箱");
      }
      else if(this.register_name==''){
        this.$message.error("未输入昵称");
      }
      else if(this.register_password==''){
        this.$message.error("未输入密码");
      }
      else if(this.register_code==''){
        this.$message.error("未输入验证码");
      }
      else if(this.register_code!==this.register_getcode){
        this.$message.error("验证码错误");
      }
      else{
        this.$axios
            .post('user/user_register', qs.stringify({
              email:this.register_email,
              username:this.register_name,
              realname:this.register_password,
              password_1:this.register_password,
              password_2:this.register_password,
            }) )
            .then((res) => {
              if (res.data.errno === 0) {
                this.$message.success(res.data.msg);
                this.user_id=res.data.user_id;
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
      }
    },
    send_code(){
      this.$axios
          .post('user/send_verify_code', qs.stringify({
            email:this.register_email,
            mode:1,
          }) )
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success(res.data.msg);
              this.register_getcode=res.data.code;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
    },
    send_passwordcode(){
      this.$axios
          .post('user/modify_password_verify', qs.stringify({
            mode:1,
            user_id:this.forget_email,
          }) )
          .then((res) => {
            if (res.data.errno === 0) {
              this.$message.success(res.data.msg);
              this.forget_getcode=res.data.code;
              this.user_id=res.data.user_id;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
    },
  },

}
</script>

<style scoped>
.el-input {
  width: 73%;
  margin-top: 13px;
  margin-left: 65px;
  height: 60%;
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
  margin-top: 40px;
  height: 10px;
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
  transition: all .3s;
}

.block::before {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid #0367a6;
  border-radius: 10px;
  animation: div5Ani 3s infinite linear;
}

.block::after {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid #0367a6;
  border-radius: 10px;
  animation: div5Ani 3s infinite linear;
}

@keyframes div5Ani {
  0%,
  100% {
    clip-path: inset(0 0 98% 0);
  }

  25% {
    clip-path: inset(0 98% 0 0);
  }
  50% {
    clip-path: inset(98% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 98%);
  }
}

.block::after {
  animation: div5Ani 3s infinite -1.5s linear;
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
  font-weight: bold;
  color: black;
  font-size: 16px;
  list-style: none;
  cursor: pointer;
}
.tab-current{
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  color: black;

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