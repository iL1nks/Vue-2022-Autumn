<template>
  <!-- <ForumBorder> -->
      <div>
    <div>

<!--      <div v-if="this.$store.state.login_state == 0" class="login">-->
<!--        <h1>请登录</h1>-->

<!--      </div>-->
      <div>

        <div v-if="this.modify_state === 0">
          <div style="display: flex; justify-items: center; align-items: center; flex-direction: column;">
              <br>
            <!-- <div v-if="this.is_visit_self === 0" style="margin-left: auto;"> -->
                <div style="margin-left: auto;">
              <el-button style="position:relative;left:-10px;" @click="                
                modify_state = 1;
                input_username = username;
                input_email = email;
                input_password = '';
                input_password2 = '';
                ">
                修改信息
              </el-button>
            </div>

            <br>    
            <!-- <img :src="'http://43.138.55.69'+url_now" class="avatar"> -->
            <img src="../assets/default_head.jpeg" class="avatar">

            <div style="font-size: 25px; margin: 5px;">{{username}}</div>

            <el-descriptions border style="margin: 15px;">
              <el-descriptions-item label="姓名">{{this.truename}}</el-descriptions-item>
              <el-descriptions-item label="邮箱">{{this.email}}</el-descriptions-item>
            </el-descriptions>

          </div>
        </div>

        <div v-else>
          <div style="display: flex; justify-items: center; align-items: center; flex-direction: column;">

            <!-- <div v-if="is_visit_self === 0" style="margin-left: auto;"> -->
                <br>
                <div style="margin-left: auto;">
              <el-button style="position:relative;left:-10px;" @click="                
                modify_state = 0;
                input_username = username;
                input_email = email;
                input_password = '';
                input_password2 = '';
                ">
                返回
              </el-button>
            </div>

            <el-upload class="avatar-uploader" action="" :http-request="upload_file" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload" :limit="1" :auto-upload="true">
              <img v-if="url_upload" :src="'http://43.138.55.69'+url_upload" class="avatar">
              <img v_else :src="'http://43.138.55.69'+url_now" class="avatar">
            </el-upload>
            <div>点击上方修改头像</div>

            <el-divider></el-divider>

            <div style="margin: 10px;">
              <div>修改用户名</div>
              <el-input placeholder="输入新用户名" v-model="input_username" style="margin: 5px;" clearable></el-input>
              <br />
              <el-button size="small" @click="modify_username()">提交</el-button>
            </div>

            <div style="margin: 10px;">
              <div>修改邮箱</div>
              <el-input placeholder="输入新邮箱" v-model="input_email" style="margin: 5px;" clearable></el-input>
              <br />
              <el-button size="small" @click="modify_email()">修改</el-button>
            </div>

            <div style="margin: 10px;">
              <div>修改密码</div>
              <el-input placeholder="输入新密码" v-model="input_password" style="margin: 5px;" clearable show-password>
              </el-input>
              <br />
              <el-input placeholder="确认密码" v-model="input_password2" style="margin: 5px;" clearable show-password>
              </el-input>
              <br />
              <el-button size="small" @click="modify_pwd">修改密码</el-button>
            </div>
          </div>
        </div>

        <!-- <el-menu-item index="/PersonCenter" style="position: relative;left:950px;"><el-link><router-link to="/modifyifo">修改个人资料</router-link></el-link></el-menu-item> -->
        <!-- <el-link :underline="false" style="position: relative;right:2px;bottom:-19px" @click="goto_login">编辑资料</el-link> -->


        <div v-if="this.modify_state === 0" style="display: flex; align-items: center; flex-direction: column;">
          <el-menu mode="horizontal" style="width: 95%;">

            <el-collapse>
              <el-collapse-item title="我的收藏夹" name="1">

                <el-table :data="favorites_data" stripe align="left">
                  <el-table-column label="名字" min-width="70%">
                    <template slot-scope="scope">
                        <div class="art-title">
                          <el-link @click="to_open(scope.row.favorites_id)">{{scope.row.name}}
                              
                          </el-link>
                          <!-- <el-button @click="this.open_favorite = true">{{scope.row.name}}</el-button> -->
                            <el-dialog
                            title="收藏夹内容"
                            :visible.sync="open_favorite"
                            width="50%">
                            <span>名字：{{favorites_content_now.name}}</span><br>
                            <span>创建日期：{{favorites_content_now.create_time}}</span><br>
                            <span>内容：</span>
                            <div class="issue_div" v-for="(article, index) in favorites_content_now.issue_list" :key="index">
                                <div>
                                <el-row>
                                    <el-col>
                                    <a @click="goto_issues(article.data_id)"   class="name_inside"> {{article.title}} </a>
                                    <a @click="delete_issues(article.data_id)"   class="name_inside"><i class="el-icon-delete" style="float:right"></i></a>
                                    </el-col>
                                </el-row>
                                </div>
                            </div>
                            <!-- <span>id:{{id_now}}</span> -->
                            <span slot="footer" class="dialog-footer">
                                <!-- <el-button @click="open_favorite = false">取 消</el-button> -->
                                <el-button type="primary" @click="open_favorite = false">关 闭</el-button>
                            </span>
                            </el-dialog>
                        </div>
                    </template>
                  </el-table-column>

                  <!-- <el-button>123</el-button> -->

                    <el-table-column min-width="10%">
                    <template slot-scope="scope">
                      <el-button round type="text" @click="DelPost(scope.row.posting_id)">
                      <!-- <div style="width: 15px; height: 15px">删除</div> -->
                      </el-button>
                    </template>
                  </el-table-column>

                  <!-- <el-table-column label="操作" min-width="20%">
                    <template slot-scope="scope">
                      <div class="art-date">{{scope.row.recent_comment_time}}</div>
                      
                    </template>
                  </el-table-column> -->

                  <!-- <el-table-column label="发表日期" min-width="20%">
                    <template slot-scope="scope">
                      <div class="art-date">{{scope.row.time}}</div>
                    </template>
                  </el-table-column> -->
                </el-table>
                <!-- <el-button>a</el-button> -->
              </el-collapse-item>

            </el-collapse>

          </el-menu>
        </div>
        <!-- <el-button @click="test1()" round>测试</el-button> -->

      </div>

    </div>
      </div>

  <!-- </ForumBorder> -->
</template>

<script>
//   import ForumBorder from "@/components/ForumBorder";
  import qs from "qs";
  export default {
    // components: { ForumBorder },
    name: 'PersonCenter',
    data() {
      return {
        modify_state: 0,
        username: this.$store.state.username,
        exp_now: undefined, //当前经验值
        exp_next_lv: undefined, //下一等级经验值
        level: undefined,
        truename: this.$store.state.user_truename,
        email: this.$store.state.user_email,
        input_username: undefined,
        input_password: undefined,
        input_password2: undefined,
        input_email: undefined,
        is_visit_self: 0, //0：访问自己主页
        url_upload: undefined,
        url_now: undefined,
        posting_data: [],
        reply_data: [],
        open_favorite: false,
        id_now:'',
        favorites_content_now:{},
        favorites_data: [
            {
                favorites_id:1,
                name:'收藏夹1',
            },
            {
                favorites_id:2,
                name:'收藏夹2',
            },
            {
                favorites_id:3,
                name:'收藏夹3',
            },
        ],
        favorites_content1: 
            {
                name:'收藏夹1',
                create_time:'2022-1-1',
                issue_list:[
                    {
                        data_id:11,
                        title:'收藏夹1里的论文1',
                    },
                    {
                        data_id:12,
                        title:'收藏夹1里的论文2',
                    },
            ]
            }
        ,
        favorites_content2: 
            {
                name:'收藏夹2',
                create_time:'2022-2-2',
                issue_list:[
                    {
                        data_id:21,
                        title:'收藏夹2里的论文1',
                    },
                    {
                        data_id:22,
                        title:'收藏夹2里的论文2',
                    },
            ]
            }
      }
    },
    methods:
    {
      go_back() {
        this.modify_state = 0;
      },
      getSimpleText(html) {
        var re1 = new RegExp("<.+?>", "g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
        var msg = html.replace(re1, '');//执行替换成空字符
        return msg;
      },
      modify_username() {
        let user_ifo = {
          username: this.input_username,
            truename:this.$store.state.user_truename,
            birth:'',
            age:'',
            gender:'',
            config:'',
            photo: '',
        };
        this.$axios.post('user/modify_profile', qs.stringify(user_ifo), {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
          }
        })
          .then(res => {
            if (res.data.errno === 0) {
              // this.username = this.input_username; //更新页面变量
              this.$store.commit('set_username',this.input_username) //更新全局变量
              // this.$store.state.token = res.data.authorization; //更新token
            //   this.$store.commit('set_userstate_to_unlogged');
              this.$message.success('用户名修改成功');
              this.modify_state = 0;
              this.$router.go(0);
            //   setTimeout(() => {
            //     this.$router.push({ path: '/login' });
            //   }, 1000);
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      },
      modify_email() {
        let email_ifo = {
          email: this.input_email,
          truename:this.$store.state.user_truename,
          birth:'',
          age:'',
          gender:'',
          mailbox:'',
          config:'',
          photo: '',
        };
        this.$axios.post('user/modify_mailbox', qs.stringify(email_ifo), {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
          }
        })
                .then(res => {
                  if (res.data.errno === 0) {
                    // this.username = this.input_username; //更新页面变量
                    this.$store.commit('set_user_email',this.input_email) //更新全局变量
                    // this.$store.state.token = res.data.authorization; //更新token
                    //   this.$store.commit('set_userstate_to_unlogged');
                    this.$message.success('邮箱修改成功');
                    this.modify_state = 0;
                    this.$router.go(0);
                    //   setTimeout(() => {
                    //     this.$router.push({ path: '/login' });
                    //   }, 1000);
                  }
                  else {
                    this.$message.error(res.data.msg);
                  }
                })
                .catch(err => {
                  this.$message.error(err);
                });
      },
      init_view() {
        this.url_now = this.$store.state.user_photo;
      },
      modify_pwd() {
        let password_ifo = {
            mode:1,
          password_1: this.input_password,
          password_2: this.input_password2,
          user_id:this.$store.state.userid,
        }
        if (this.input_password === '') {
          this.$message.error('密码不能为空！');
        }
        else if (this.input_password2 === '') {
          this.$message.error('请再次输入密码！');
        }
        // else if (this.input_password !== this.input_password2) {
        //   this.$message.error('两次输入的密码不一致！');
        // }
        else {
          // alert('success');
          this.$axios.post('/user/modify_password', qs.stringify(password_ifo))
            .then(res => {
              if (res.data.errno === 0) {
                this.$message.success(res.data.msg);
                this.modify_state = 0;
              }
              else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      },
      upload_file(e) { //上传头像相关的函数，不要动
        let formData = new FormData();
        formData.append('in_file', e.file);
        let my_axios = this.$axios.create({
          withCredentials: true,
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('e.file:'+e.file);
        my_axios.post('/user/modify_profile', { 
            username:this.$store.state.username,
            truename:this.$store.state.user_truename,
            birth:'',
            age:'',
            gender:'',
            config:'',
            photo: e.file 
            })
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.success('头像修改成功！');
              this.url_now = res.data.photo;
              this.url_upload = res.data.photo;
              this.$store.state.user_photo = res.data.photo;
              // this.file_id = res.data.file_id;
              // this.url_upload = res.data.url;
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      },
      handleAvatarSuccess(res, file) { //上传头像相关的函数，不要动
        console.log('success');
        console.log('imageurl:' + this.imageUrl);
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) { //上传头像相关的函数，不要动
        console.log('before');
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleClose(done) { //上传头像相关的函数，不要动
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      to_open (id) {
          this.open_favorite = true;
        this.id_now = id;
        // this.$axios
        // .post('user/show_favorites_content', qs.stringify({favorites_id:id}), {
        //     headers: {
        //     userid: this.$store.state.userid,
        //     token: this.$store.state.token,
        //     },
        // })
        // .then((res) => {
        //     // this.$message.success('...');
        //     this.favorites_content_now = res.data;
        //     console.log(res.data.data);
        // })
        // .catch((err) => {
        //     this.$message.error(err);
        // });
        this.favorites_content_now = this.favorites_content1;
        },
        goto_issues(id) {
        this.$router.push({path:'/article',query: {id:id}})
      },
      delete_issues(id) {
        //   this.$axios
        //     .post('user/show_favorites_content', qs.stringify({favorites_id:id}), {
        //         headers: {
        //         userid: this.$store.state.userid,
        //         token: this.$store.state.token,
        //         },
        //     })
        //     .then((res) => {
        //         // this.$message.success('...');
        //         this.favorites_content_now = res.data;
        //         console.log(res.data.data);
        //     })
        //     .catch((err) => {
        //         this.$message.error(err);
        //     });
      }
    },
    mounted: function () {
    //   alert('页面一加载，就会弹出此窗口')
      this.init_view();
    },
    watch: {//监听路由变量
      $route(to, from) {
        if (to.query.user !== from.query.user) {
          this.init_view();
        }
      },
    },
  };
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
  .alert-box-item {
    overflow: hidden;
  }
  .bigImg-div {
    width: 180px;
    height: 180px;
    border-radius: 20%;
    overflow: hidden;
    border: 1px solid #ddd;
  }
  .bigImg {
    display: block;
    width: 180px;
    height: 180px;
    border-radius: 15px;
  }
  .avatar-uploader .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 15px;
    cursor: pointer;
    width: 180px;
    height: 180px;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 180px;
    border-radius: 15px;
    margin: 20px;
    line-height: 190px;
    text-align: center;
  }
  .avatar {
    width: 180px;
    height: 180px;
    border-radius: 15px;
  }
  #art-title1 {
    font-size: 18px;
  }
  #art-author {
    font-size: 15px;
    margin-left: 20px;
    color: gray;
  }
  .issue_div {
    /* height: 70px; */
    background:white;
  color: black; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 15px;
  margin-right: 15px;
  padding: 5px;
}
.name_inside {
 text-decoration: none;
 color: #333333;
 font-size: 15px;
 /* font-weight: 500; */
}

.name_inside:hover{
  color: #666666;
}
</style>