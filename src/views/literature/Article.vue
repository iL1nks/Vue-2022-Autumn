<template>
  <div class="article">
    <el-row>
      <el-col class="title-block" :span="12">
        <div class="title-text">
          {{ articleDetails.title }}
        </div>
        <div class="sub-title">
          <span v-for="(portal, index) in articleDetails.portals" :key="index">
            <span class="_link" @click="toAuthor(portal.portal_id)">
              {{ portal.portal_name }}
              <!-- <sup v-if="articleDetails.author_affiliation && portal.affiliation_order !== 0">{{ portal.affiliation_order }}</sup> -->
            </span>
            <!-- <span v-if="articleDetails.authors.length > index + 1">,&nbsp;</span> -->
          </span>
        </div>
        <div class="sub-title" v-if="articleDetails.author_affiliation">
          <span v-for="(ins, index) in articleDetails.author_affiliation" :key="index">
            <span>
              <sup>{{ index+1 }}</sup>
              {{ ins }}
            </span>
            <span v-if="articleDetails.author_affiliation.length > index + 1">,&nbsp;</span>
          </span>
        </div>
        <div class="sub-title">
          <span class="date" v-if="articleDetails.date">{{ articleDetails.date }}</span>
          <span class="journal" v-if="articleDetails.venue_id!==''">
            &nbsp;{{ articleDetails.venue_name }}
            <!-- <span v-if="articleDetails.volume"> | Volume: {{ articleDetails.volume }}</span>
            <span v-if="articleDetails.first_page">, pp {{ articleDetails.first_page }}</span>
            <span v-if="articleDetails.last_page">-{{ articleDetails.last_page }}</span> -->
          </span>
        </div>
        <div class="sub-title" v-if="articleDetails.doi">
          <span class="_info">DOI: <span class="_link" @click="toDOI(articleDetails.doi)">{{ articleDetails.doi }}</span></span>
        </div>
        <div class="title-button">
          <!-- <el-tooltip class="item" effect="light" content="下载" placement="bottom">
            <el-button type="primary" icon="el-icon-download" circle @click="download"></el-button>
          </el-tooltip> -->
          <el-dropdown style="margin-left: 10px; margin-right: 10px" trigger="click" @command="goLink">
            <el-tooltip class="item" effect="light" content="查看全文" placement="bottom">
              <el-button type="success" icon="el-icon-paperclip" circle></el-button>
            </el-tooltip>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item v-for="(ins, index) in articleDetails.urls" v-bind:key="index" :command="ins">{{ ins }}</el-dropdown-item> -->
              <el-dropdown-item v-bind:key="0" :command="articleDetails.view_url">{{ articleDetails.view_url }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-tooltip class="item" effect="light" content="收藏" placement="bottom">
            <el-button type="warning" icon="el-icon-star-off" circle @click="openCollect"></el-button>
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="light" content="分享" placement="bottom">
            <el-button type="danger" icon="el-icon-share" circle @click="share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="引用" placement="bottom">
            <el-button type="info" icon="el-icon-s-promotion" circle @click="quote"></el-button>
          </el-tooltip> -->
        </div>
      </el-col>
<!--      <el-col :span="7" class="logo-div">LOGO</el-col>-->
    </el-row>

    <el-row>
      <el-col :span="15">
        <div class="abstract-div">
          <div class="abstract-title">摘要</div>
          <div v-if="articleDetails.abstract && articleDetails.abstract.length>0">
            <div class="abstract-content _content" v-if="articleDetails.abstract.length<spanLength || isSpan">
              {{ articleDetails.abstract }}
              <span v-if="isSpan && articleDetails.abstract.length>=spanLength" class="_link" @click="isSpan=!isSpan"> 折叠</span>
            </div>
            <div class="abstract-content _content" v-else>
              {{ articleDetails.abstract.substring(0, 570) }}...
              <span v-if="!isSpan" class="_link" @click="isSpan=!isSpan"> 展开</span>
            </div>
          </div>
          <div v-else>
            <div class="abstract-content _content" style="color: #909eb4; font-size: 14px">暂无摘要信息</div>
          </div>
        </div>

        <div class="detail-div">
          <el-tabs v-model="activeDetail" type="card">
            <el-tab-pane label="参考文献" name="first">
              <div class="reference-info">
                <span>共 {{ articleDetails.reference.length }} 条</span>
              </div>
              <div class="reference-info" v-if="articleDetails.reference.length > 0">
                <span>由于版权限制，此处可能仅展示部分相关论文</span>
              </div>
              <div class="reference-article">
                <div class="reference-article-block" v-for="(article, index) in articleDetails.reference" :key="index">
                  <div @click="toArticle(article.reference_id)">
                    <el-row>
                      <el-col :span="2" style="text-align: right; font-size: 15px">[{{ index+1 }}]&nbsp;&nbsp;&nbsp;</el-col>
                      <el-col :span="22">
                        <div class="reference-title">
                          <span>{{ article.reference_name }}</span>
                        </div>
                        <!-- <div class="reference-author _info">
                          <span v-for="(author, index2) in article.authors" :key="index2">
                            <span v-if="index2<5">{{ author.author_name }}</span>
                            <span v-if="index2<5 && article.authors.length > index2 + 1">,&nbsp;</span>
                          </span>
                          <span v-if="article.authors.length>5">.etc</span>
                        </div> -->
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="引证文献" name="second">
              <div class="reference-info">
                <span>共 {{ articleDetails.citation_count }} 条</span>
              </div>
              <div class="reference-info" v-if="articleDetails.citation_count>0">
                <span>由于版权限制，此处可能仅展示部分相关论文</span>
              </div>
              <div class="reference-article">
                <div class="reference-article-block" v-for="(article, index) in citation_msg" :key="index">
                  <div @click="toArticle(article.paper_id)">
                    <el-row>
                      <el-col :span="2" style="text-align: right; font-size: 15px">[{{ index+1 }}]&nbsp;&nbsp;&nbsp;</el-col>
                      <el-col :span="22">
                        <div class="reference-title">
                          <span>{{ article.paper_title }}</span>
                        </div>
                        <div class="reference-author _info">
                          <span v-for="(author, index2) in article.authors" :key="index2">
                            <span v-if="index2<5">{{ author.author_name }}</span>
                            <span v-if="index2<5 && article.authors.length > index2 + 1">,&nbsp;</span>
                          </span>
                          <span v-if="article.authors.length>5">.etc</span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <scroll-loader :loader-method="getCitationMsg" :loader-disable="loadMoreDisable"></scroll-loader>
            </el-tab-pane> -->
            <el-tab-pane label="文章评论" name="third">
              <div class="reference-info" v-if="comments===null||comments==undefined||comments.length===0">
                <span>暂无评论</span>
              </div>
              <div class="comment-card" v-else>
                <el-card shadow="hover" class="comment-card-body"
                         v-for="(comment, index) in comments" v-bind:key="index">
                  <el-row class="comment-info">
                    <el-col :span="18" class="comment-author">
                      <span class="_link" @click="toAuthor(-1)">{{ comment.username }}</span>
                      <span class="comment-date _info">
                        &nbsp;&nbsp;&nbsp;&nbsp;{{ comment.like }} 点赞&nbsp;&nbsp;·&nbsp;&nbsp;{{ comment.comment2_list.length }} 回复&nbsp;&nbsp;·&nbsp;&nbsp;{{ $dateFormat(comment.time, "yyyy/MM/dd") }}
                      </span>
                    </el-col>
                    <el-col :span="5">
                      <span style="font-size: 14px; float: right" class="_info">&ensp;&ensp;赞&ensp;</span>
                      <span style="font-size: 14px; float: right" class="_link _bd_right" @click="toComment(comment.id)">查看详情&ensp;&ensp;</span>
                    </el-col>
                    <el-col :span="1">
                      <!-- <div v-bind:class="{'dislike' : !comment.is_like, 'like' : comment.is_like, 'is_animating' : isAnimating}" @click="likeClick(comment)"></div> -->
                    </el-col>
                  </el-row>
                  <el-row class="comment-content _content">
                    {{ comment.content }}
                  </el-row>
                </el-card>
              </div>

              <div class="AnswerIt">
                <el-input
                  type="textarea"
                  maxlength="500"
                  show-word-limit
                  :autosize="{ minRows: 3, maxRows: 6}"
                  placeholder="请输入你的回答"
                  v-model="myAnswer"
                >
                </el-input>
                <div style="width: 100%; text-align: right">
                  <el-button type="primary" style="margin-top: 10px;" @click="createComment(articleDetails.data_id,myAnswer)">发布</el-button>
                </div>
              </div>

            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>

      <el-col :span="9">
        <div class="info-div">
          <el-row class="digit _bd_bottom">
            <el-col :span="7" class="digit-num _primary">
              {{ articleDetails.reference.length }}
              <div class="digit-text">引用次数</div>
            </el-col>
            <el-col :span="7" class="digit-num _primary">
              {{ articleDetails.cited_by_count == undefined ? 0 : articleDetails.cited_by_count}}
              <div class="digit-text" >被引次数</div>
            </el-col>
            <!-- <el-col :span="6" class="digit-num _primary">
              {{ toBigNum(articleDetails.collect_count) }}
              <div class="digit-text">收藏数</div>
            </el-col> -->
            <el-col :span="7" class="digit-num _primary">
              {{ toBigNum(this.comments.length) }}
              <div class="digit-text">评论数</div>
            </el-col>
          </el-row>
          <el-row class="field _bd_bottom" v-if="articleDetails.fields">
            <div class="field-title">领域</div>
            <div class="field-content" v-for="(field, index) in articleDetails.fields" :key="index">
              -&ensp;<span class="_link" @click="toField(field.field_id)">{{ field.field_name }}</span>
            </div>
          </el-row>
          <el-row class="relation" v-if="articleDetails.related.length > 0"> 
            <div class="field-title">相关文献</div>
            <div class="relation-article" v-for="(article, index) in articleDetails.related" :key="index">
              <div class="relation-title">
                <span class="_link" @click="toArticle(article.related_id)">{{ article.related_name }}</span>
              </div>
              <!-- <div class="relation-author _info">
                <span v-for="(author, index2) in article.authors" :key="index2">
                  <span v-if="index2<2">{{ author.author_name }}</span>
                  <span v-if="index2<2 && article.authors.length > index2 + 1">,&nbsp;</span>
                </span>
                <span v-if="article.authors.length > 2">etc.</span>
              </div> -->
              <br />
            </div>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <CollectDialog
        :curPaper="articleDetails"
        :showCollect="showCollect"
        @collectSuccess="collectSuccess"
        @closeChildDialog="closeChildDialog"></CollectDialog>

    <CiteDialog
        :paper_id="articleDetails.paper_id"
        :showQuote="showQuote"
        @closeChildDialog="closeChildDialog"></CiteDialog>
  </div>
</template>

<script>
import user from "../../store/user";
import qs from "qs";
import CiteDialog from "../../components/CiteDialog";
import CollectDialog from "../../components/CollectDialog";
import { fakeArticleDetail,fakeComments, fetchFakeArticleDetail,fetchFakeComments } from "./fakeData";
import checkStatus from '../../utils/commonApi'

export default {
  name: "Article",
  components: {CiteDialog, CollectDialog},
  data() {
    return {
      // 引用
      showQuote: false,

      // 收藏
      showCollect: false,

      // 点赞动画
      like: false,
      isAnimating: false,

      // 摘要展开
      isSpan: false,
      spanLength: 600,

      // 标签页
      activeDetail: "first",

      myAnswer: '',

      comments: [],

      articleDetails: {},
      related_papers: [],

      citation_msg: [],
      cita_page_idx: 1,
      loadMoreDisable: true,
    }
  },
  watch: {
    citation_msg(val) {
      this.loadMoreDisable = val.length >= this.articleDetails.citation_count;
    },
  },
  methods: {
    goLink(url) {
      window.open(url);
    },
    collectSuccess() {
      this.articleDetails.collect_count += 1;
    },
    closeChildDialog() {
      this.showQuote = false;
      this.showCollect = false;
    },
    createComment(paper_id, content) {
      const userInfo = this.$store.state.userid;
      //debugger
      if (!userInfo) {
        this.$message.warning("请先登录！");
        setTimeout(() => {
          this.$router.push('/login');
        }, 500);
        return;
      }
      if (content === '') {
        this.$message.warning('无法发布空白评论！');
        return;
      }
      let time = Date();
      time = this.$dateFormat(time,"yyyy-MM-dd HH:mm:ss")
      this.$axios.post('portal/make_comment1', qs.stringify({
          user_id: this.$store.state.userid,
          content: content,
          time: time,
          data_id: paper_id,
        }), 
        {
          headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
          },
        }
      ).then(res => {
        // switch (res.data.status) {
        //   case 200:
        //     this.$message.success("回复成功！");
        //     this.myAnswer = '';
        //     this.comments = res.data.data.comments;
        //     break;
        //   case 400:
        //     this.$message.error("用户登录信息已失效，请重新登录！");
        //     this.$store.dispatch('clear');
        //     setTimeout(() => {
        //       this.$router.push('/login');
        //     }, 1000);
        //     break;
        //   case 403:
        //     this.$message.error("评论创建失败，请稍后重试！");
        //     break;
        //   case 404:
        //     this.$message.error("系统未获取到您的用户信息，请联系管理员！");
        //     break;
        // }
        if (res.data.errno === 0) {
          this.$message.success('回复成功');
          this.myAnswer = '';
          this.comments.push({
            comment_id: 3,
            user_id: this.$store.state.userid,
            username: this.$store.state.username,
            content: content,
            time: time,
            data_id:"9782951d43920382d2f1229601d018ca87df4dcb",
            comment2_list:[]
          });
        } else {
          this.$message.error(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    toArticle: function(paper_id) {
      let routeUrl = this.$router.resolve({
        path: '/article',
        query: { id: paper_id }
      });
      window.open(routeUrl .href, "_self");
    },
    toAuthor: function(id) {
      let routeUrl = this.$router.resolve({
        path: '/portal',
        query: {id: id }
      });
      window.open(routeUrl .href, "_self");
    },
    toDOI: function(doi) {
      window.open("https://doi.org/" + doi);
    },
    toComment: function(id) {
      let routeUrl = this.$router.resolve({
        path: '/commentDetail',
        query: { v: id }
      });
      window.open(routeUrl .href, "_blank");
    },
    toField: function(field_id) {
      let search_items = {
          is_search:0, // 0:从领域跳转 1:从搜索框跳转
          search_mode:1, // 0:模糊搜索 1:高级搜索
          search_type:'', // 1:篇关摘 2:doi 3:作者 4:出版物
          search_input:'', //输入框内容
          id: field_id //领域id，若is_search为1则无内容
      }
      let routeUrl = this.$router.resolve({
        name: 'searchRes',
        query: { search_ifo: search_items }
      });
      sessionStorage.setItem("search_ifo", JSON.stringify(search_items));
      window.open(routeUrl.href, "_self");
    },
    toBigNum: function(num) {
      if (num>=10000) {
        let ten_thousand = Math.floor(num/10000)
        let thousand = Math.floor(num%10000/1000)
        num = ten_thousand + "." + thousand + "w"
      }
      else if (num>=1000) {
        let thousand = Math.floor(num/1000)
        let hundred = Math.floor(num%1000/100)
        num = thousand + "." + hundred + "k"
      }
      return num
    },
    likeClick: function(commentIns) {
      const userInfo = user.getters.getUser(user.state());
      if (!userInfo) {
        this.$message.warning("请先登录！");
        setTimeout(() => {
          this.$router.push('/login');
        }, 500);
        return;
      }

      if (!commentIns.is_like)
        this.likeHandler(commentIns, 'comment');
      else
        this.likeHandler(commentIns, 'cancel');
    },
    likeHandler: function(commentIns, tag) {
      const userInfo = user.getters.getUser(user.state());
      this.$axios({
        url: '/social/like/' + tag,
        method: 'post',
        data: qs.stringify({
          user_id: userInfo.user.userId,
          comment_id: commentIns.id,
        })
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            commentIns.is_animating = tag === 'comment';
            setTimeout(() => {
              commentIns.is_like = !commentIns.is_like;
            }, 800);
            break;
          case 403:
            this.$message.error("评论不存在，请刷新重试！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    share(message) {
      let aux = document.createElement("input");
      aux.setAttribute("value", window.location.href);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      if (message !== null) {
        this.$message.success("链接已复制至剪贴板");
      } else {
        this.$message.error("链接复制失败");
      }
    },
    quote() {
      this.showQuote = true;
    },
    openCollect() {
      this.showCollect = true;
    },
    download() {
      if (this.articleDetails.pdfs.length === 0) {
        this.$message.error("未找到该文献原文PDF！");
        return;
      }
      this.$message.success("正在下载原文PDF，请耐心等待！");
      console.log(this.articleDetails.pdfs[0]);
      // TIP: 下载跨域文件出问题，让后端下载到服务器再同域下载
      this.$axios({
        method: 'post',
        url: '/upload/get/pdf',
        data: qs.stringify({
          pdf_url: this.articleDetails.pdfs[0]
        })
      })
      .then(res => {
        if (res.data.success) {
          console.log(this.GLOBAL.backUrl + res.data.data);
          this.$downloadSameArea(this.GLOBAL.backUrl + res.data.data, this.articleDetails.paper_title + ".pdf");
          this.$message.success("下载成功！");
        }
      })
      .catch(err => {
        this.$message.error("下载失败！");
        console.log(err);
      })
    },

    getRelatedPapers() {
      this.$axios({
        method: 'post',
        url: '/es/get/related/paper',
        data: qs.stringify({
          id: this.$route.query.v
        })
      })
      .then(res => {
        if (res.data.success) {
          this.related_papers = res.data.related;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    getArticleDetail() {
      console.log(this.$route.query.id)
      // return this.$axios({
      //   method: 'post',
      //   url: 'issue/issue_info',
      //   data: _formData
      // })
      //debugger
      this.$axios.post('issue/issue_info', qs.stringify({
        issue_id:this.$route.query.id
      }), {
        headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
        },
      }).then((res) => {
        if (res.data.errno === 0) {
          this.articleDetails = res.data
        }
        else {
          console.log(res.data.msg)
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getCitationMsg() {
      if (this.citation_msg.length >= this.articleDetails.citation_count) {
        this.loadMoreDisable = true;
        return;
      }
      this.$axios({
        method: 'post',
        url: '/es/get/citation/paper',
        data: qs.stringify({
          id: this.$route.query.v,
          page: this.cita_page_idx,
          size: 20
        })
      })
      .then(res => {
        if (res.data.success) {
          this.citation_msg = this.citation_msg.concat(res.data.citations);
          this.cita_page_idx += 1;
          if (this.citation_msg.length >= this.articleDetails.citation_count)
            this.loadMoreDisable = true;
        } else {
          //this.$message.error("获取引证文献失败！");
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    getComments() {
      //debugger
      console.log(this.$route.query.id)
      this.$axios.post('portal/get_issue_comment', qs.stringify({
        issue_id:this.$route.query.id
      }), {
      headers: {
        userid: this.$store.state.userid,
        token: this.$store.state.token,
      },}).then((res) => {
        if (res.data.errno === 0) {
          this.comments = res.data.comments_content;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    getArticle() {
      let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
      // this.$axios.all([this.getArticleDetail(), this.getComments()])
      // .then(this.$axios.spread(function (articleDetail, allComments) {
      //   _loadingIns.close();
      //   switch (articleDetail.data.errno) {
      //     case 0:
      //       self.articleDetails = articleDetail.data;
      //       break;
      //     default:
      //       this.$message.error("系统发生错误，请联系管理员！");
      //       setTimeout(() => {
      //         this.$router.push("/");
      //       }, 1000);
      //       break;
      //   }
      //   switch (allComments.data.errno) {
      //     case 0:
      //       self.comments = allComments.data.comments;
      //       break;
      //     default:
      //       self.$message.error("评论获取失败！");
      //       break;
      //   }
      // }))
      // .catch(err => {
      //   _loadingIns.close();
      //   console.log(err);
      // })
      this.getArticleDetail();
      this.getComments();
      _loadingIns.close();
    },
  },
  created() {
    this.getArticle();
    this.getCitationMsg();
    this.getRelatedPapers();
  },
}
</script>

<style scoped>

.article .title-block {
  margin-left: 180px;
  min-height: 200px;
}
.article .abstract-div {
  background-color: white;
  margin-left: 180px;
  min-height: 200px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
}
.article .detail-div {
  background-color: white;
  margin-top: 26px;
  margin-left: 180px;
  margin-bottom: 30px;
  padding: 30px;
  min-height: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
}
.article .info-div {
  background-color: white;
  margin:0 180px 30px 36px;
  padding: 30px;
  min-height: 666px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
}

.article .title-text {
  font-family: Tahoma,fantasy;
  text-align: left;
  padding-top: 50px;
  padding-left: 20px;
  font-weight: bold;
  font-size: 28px;
  line-height: 40px;
  color: #353535;
}
.article .sub-title {
  text-align: left;
  padding-left: 20px;
  margin-top: 10px;
  font-size: 15px;
  color: #909eb4;
}
.article .title-button {
  text-align: left;
  padding-left: 20px;
  margin-top: 15px;
  margin-bottom: 20px;
}

.article .abstract-title {
  text-align: left;
  font-weight: bold;
  margin-top: 5px;
  padding: 0 16px;
  font-size: 16px;
  color: #353535;
}
.article .abstract-content {
  text-align: justify;
  padding: 16px 16px 6px 16px;
  font-size: 15px;
  line-height: 24px;
  font-family: Georgia, fantasy;
}

.article .digit {
  margin-top: 14px;
  padding-bottom: 30px;
}
.article .digit-num {
  font-size: 26px;
}
.article .digit-text {
  margin-top: 10px;
  font-size: 14px;
  color: #909eb4;
}

.article .field {
  padding: 36px 10px;
}
.article .field-title {
  text-align: left;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 16px;
  color: #353535;
}
.article .field-content {
  text-align: left;
  font-size: 16px;
  line-height: 30px;
}

.article .relation {
  padding: 36px 10px;
  text-align: left;
  font-size: 15px;
}
.article .relation-author {
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 12px;
}

.article .reference-info {
  margin-bottom: 12px;
  color: #909eb4;
  font-size: 13px;
}
.article .reference-article-block {
  padding-top: 10px;
}
.article .reference-article-block:hover {
  background: #f4f9ff;
  cursor: pointer;
}
.article .reference-title {
  font-size: 15px;
}
.article .reference-author {
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 14px;
}
.article .reference-article-block:hover .reference-title {
  color: #1f71df;
}

.article .comment-card {
  padding: 5px;
}
.article .comment-card-body {
  margin-bottom: 20px;
}
.article .comment-info {
  padding-bottom: 15px;
}
.article .comment-date {
  font-size: 14px;
}
.article .comment-content {
  font-size: 14px;
  line-height: 24px;
}
.article .dislike {
  margin: -20px;
  cursor: pointer;
  height: 60px;
  width: 60px;
  background-image:url( 'https://img-1304418829.cos.ap-beijing.myqcloud.com/heart.png');
  background-position: left;
  background-repeat:no-repeat;
  background-size:2900%;
}
.article .like {
  margin: -20px;
  cursor: pointer;
  height: 60px;
  width: 60px;
  background-image:url( 'https://img-1304418829.cos.ap-beijing.myqcloud.com/heart.png');
  background-position: right;
  background-repeat:no-repeat;
  background-size:2900%;
}
.article .dislike:hover {
  background-position:right;
}
.article .is_animating {
  animation: heart-burst .8s steps(28) 1;
}
@keyframes heart-burst {
  from {background-position:left;}
  to { background-position:right;}
}

.article ._bd_bottom {
  border-bottom: solid 1px lightgray;
}
.article ._bd_right {
  border-right: solid 1px lightgray;
}
.article ._bd_left {
  border-left: solid 1px lightgray;
}
.article ._bd_top {
  border-top: solid 1px lightgray;
}
.article ._primary {
  color: #409EFF;
}
.article ._danger {
  color: #F56C6C;
}
.article ._warning {
  color: #E6A23C;
}
.article ._success {
  color: #67C23A;
}
.article ._info {
  color: #909eb4;
}
.article ._content {
  color: #565656;
}
.article ._link {
  color: #00b1fd;
}
.article ._link:hover {
  color: #38c5ff;
  cursor: pointer;
}

.article .detail-div .el-tab-pane {
  text-align: left;
}
.article .detail-div .el-tabs__item.is-active {
  color: #353535;
  font-weight: bold;
}
.article .detail-div .el-tabs__item {
  font-size: 15px;
}
.article .detail-div .el-tabs__item:hover {
  color: #353535;
}

</style>