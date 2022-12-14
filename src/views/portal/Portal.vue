<template>
    <div class="portal">
      <el-row>
        <el-col class="portal-block" :span="12">
          <div class="name-text">
            {{ portal.name }}
          </div>
          <div class="title1" v-if="interests.length>0">
            <span class="_info">研究领域:</span>
            <span class="_info" v-for="(item, index) in interests" :key="index">{{ item }}<span v-if="index!=interests.length-1">, </span></span>
          </div>
          <div class="title1">
            <span class="_info">成果数量:{{portal.works_count}}, 被引次数：{{portal.cited_by_count}}</span>
          </div>
        </el-col>
      
        <el-col :span="9" class="button-block">
          <el-button type="primary" v-if="det1==false&&det2==false&&det3==false" @click="dialog = true">认领门户</el-button>

          <el-dialog title="认领验证" :visible.sync="dialog" width="400px">
            <el-form :model="form">
              <div style="padding-bottom:20px">
                <el-input v-model="form.email1" autocomplete="off" style="width:150px" placeholder="请输入邮箱名"></el-input>
                @
                <el-select v-model="form.email2" filterable placeholder="请选择邮箱后缀" style="width:150px">
                  <el-option
                    v-for="item in emails"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
            </el-form>
            <div>
              <el-input v-model="form.checkcode" autocomplete="off" style="width:185px" placeholder="请输入验证码"></el-input>
              <el-button type="primary" @click="sendEmail" style="margin-left: 20px;">发送验证码</el-button>
              
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialog = false">取 消</el-button>
              <el-button type="primary" @click="check">确 定</el-button>
            </div>
          </el-dialog>

          <el-button type="primary" v-if="det3==true">我的门户</el-button>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="22">
  
          <div class="article-div">
                <div class="title2">作者文献</div>
                <div class="articles">
                  <div class="articles-block" v-for="(article, index1) in articles" :key="index1" @click="toArticle(index1)">
                    <div v-if="index1<5">
                      <el-row>
                        <el-col :span="2" style="text-align: right; font-size: 15px">[{{ index1+1 }}]&nbsp;&nbsp;&nbsp;</el-col>
                        <el-col :span="22">
                          <div class="articles-title">
                            <span>{{ article.issuename }}</span>
                          </div>
                          <div class="articles-author _info">
                            <span v-for="(author, index2) in au[index1].aus" :key="index2">
                              <span v-if="index2<4">{{ author }}</span>
                              <span v-if="index2<3 && article.issueauthor.length > index2 + 1">,&nbsp;</span>
                            </span>
                            <span v-if="article.issueauthor.length>5">.etc</span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
          </div>

          <div class="relation-div">
            <div class="title2">合作作者</div>
            <div v-if="partners.length>0">
              <div class="relation-content _content" style="color: #909eb4; font-size: 14px" v-for="(item, index) in partners" :key="index">
                {{ item.name }}
              </div>
            </div>
            <div v-else>
              <div class="relation-content _content" style="color: #909eb4; font-size: 14px">未找到相关数据</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
import qs from "qs";
  export default {
    name: "portal",
    data() {
      return {
        portal_id:'',
        portal:{},
        interests:[],
        articles:[],
        au:[],
        det1:false,
        det2:false,
        det3:false,
        dialog:false,
        emails:[],
        form:{
          email1:'',
          email2:'',
          checkcode:'',
        },
        code:'',
        teacher:'CCCC',
        partners:[],
        fund:'',
        student:'EEEE',
        formLabelWidth: '120px',
      }
    },
    watch: {
    },
    methods: {
      init(){
        this.portal_id=this.$route.query.id;

        this.$axios.post('portal/get_portal', qs.stringify({}), {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token
          },
        }).then((res) => {
          if(res.data.errno==0){
            this.det2=true;
            if(res.data.portalid==this.portal_id) this.det3=true;
          }
        })

        this.$axios.post('portal/get_portal_info', qs.stringify({
          portal_id:this.portal_id
        }), {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token
          },
        }).then((res) => {
          this.portal=res.data.portal;
          var mid = this.portal.research_interests.split('|');
          for(let i=0;i<mid.length-1;i++){
            this.interests.push(mid[i].split(':')[1]);
          }
          if(this.portal.claimed==1) this.det1=true;
        }).catch((err) => {
          this.$message.error(err);
        });

        this.$axios.post('portal/get_data', qs.stringify({
          portalid:this.portal_id
        }), {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token
          },
        }).then((res) => {
          this.articles=res.data.data;
          console.log(this.articles);
          for(let i=0;i<this.articles.length;i++){
            var det={
              aus:[],
            };
            this.au.push(det);
            for(let j=0;j<this.articles[i].issueauthor.length;j++){
              this.$axios.post('portal/get_portal_info', qs.stringify({
                portal_id:this.articles[i].issueauthor[j],
              }), {
                headers: {
                  userid: this.$store.state.userid,
                  token: this.$store.state.token,
                },
              }).then((res) => {
                this.au[i].aus.push(res.data.portal.name);
              }).catch((err) => {
                this.$message.error(err);
              });
            }
          }
        }).catch((err) => {
          this.$message.error(err);
        });

        this.$axios.post('portal/institution_mailbox_list', qs.stringify({
        }), {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token
          },
        }).then((res) => {
          for(let i=0;i<res.data.institution_list.length;i++){
            this.emails.push(res.data.institution_list[i].mailbox);
          }
        })

        this.$axios.post('portal/get_relationships', qs.stringify({
          portalid:this.portal_id,
        }), {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token
          },
        }).then((res) => {
          for(let i=0;i<res.data.data.length&&i<5;i++){
            var mid={
              name:res.data.data[i].portalname,
              id:res.data.data[i].portalid,
            }
            this.partners.push(mid);
          }
        })
      },
      sendEmail(){
        this.$axios.post('user/send_verify_code', qs.stringify({
            email:this.form.email1+'@'+this.form.email2,
            mode:3,
          }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token
            },
          }).then((res) => {
            if(res.data.errno==0){
              this.$message.success(res.data.msg);
              this.code=res.data.code;
            }
          })
      },
      check(){
        if(this.form.checkcode==this.code&&this.code!=''){
          this.$axios.post('user/claim_portal', qs.stringify({
            portal_id:this.portal_id,
          }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token
            },
          }).then((res) => {
            if(res.data.errno==0){
              this.$message.success(res.data.msg);
              this.dialog = false;
              this.det3=true;
            }
          })
        }
        else{
          this.$message.error('验证码错误，请重新输入');
        }
      },
      toArticle(i){
          this.$router.push({path: '/article', query:{id:this.articles[i].issueid}})
      }
    },
    created() {
      this.init();
    },
  }
  </script>
  
  <style scoped>
  .portal .portal-block {
    margin-left: 180px;
    min-height: 200px;
  }
  .portal .button-block {
    padding-top:70px
  }
  .portal .relation-div {
    background-color: white;
    margin-left: 180px;
    min-height: 200px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
  }
  .portal .article-div {
    background-color: white;
    text-align: left;
    margin-top: 26px;
    margin-left: 180px;
    margin-bottom: 30px;
    padding: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
  }

  
  .portal .name-text {
    font-family: Tahoma,fantasy;
    text-align: left;
    padding-top: 50px;
    padding-left: 20px;
    font-weight: bold;
    font-size: 28px;
    line-height: 40px;
    color: #353535;
  }
  .portal .title1 {
    text-align: left;
    padding-left: 20px;
    margin-top: 10px;
    font-size: 15px;
    color: #909eb4;
  }

  
  .portal .title2 {
    text-align: left;
    font-weight: bold;
    margin-top: 5px;
    padding: 0 16px;
    font-size: 16px;
    color: #353535;
  }
  .portal .relation-content {
    text-align: justify;
    padding: 16px 16px 6px 16px;
    font-size: 15px;
    line-height: 24px;
    font-family: Georgia, fantasy;
  }
  
  .portal .articles-block {
    padding-top: 10px;
  }
  .portal .articles-block:hover {
    background: #f4f9ff;
    cursor: pointer;
  }
  .portal .articles-title {
    font-size: 15px;
  }
  .portal .articles-author {
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 14px;
  }
  .portal ._info {
    color: #909eb4;
  }

  
  </style>