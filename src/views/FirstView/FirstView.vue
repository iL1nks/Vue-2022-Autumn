<template>
  <div class="aboutBox">
    <bannerView
      :imgUrl="this.img"
      :titleName="this.title"
      ref="banner"
    ></bannerView>
    <div class="mainBox">

      <div class="contentBox">

        <div class="contentTitle">
          <div class="markdown-body">
            <div id="app">
              <v-app id="inspire">
                <v-parallax src="../../assets/banner.jpg" height="100vh">
                  <v-layout row wrap align-center justify-center>
                    <v-flex xs6 offset xs-1 sm6 offset-sm1 md6 offset-md1>
                      <v-card  class="mx-auto"
                               max-width="344">
                        <v-card-title primary-title class="layout justify-center">
                          <h1>评论</h1>
                        </v-card-title>
                        <h2>
                          Supporting discussion give more plot summary than is necessary, crowding out the substance of the argument
                        </h2>
                        <h2>
                          Supporting discussion is almost completely plot summary
                        </h2>
                        <h2>
                          The essay quotes extensively but needs more supporting commentary. Try to quote more selectively and discuss specifically what you want your reader to see in a quotation
                        </h2>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-parallax>
              </v-app>
            </div>
            <div id="app">
              <v-app id="inspire">
                <v-parallax src="../../assets/banner.jpg" height="100vh">
                  <v-layout row wrap align-center justify-center>
                    <v-flex xs6 offset xs-1 sm6 offset-sm1 md6 offset-md1>
                      <v-card  class="mx-auto"
                               max-width="344">
                        <v-card-title primary-title class="layout justify-center">
                          <h1>评论</h1>
                        </v-card-title>
                        <h2>
                          Supporting discussion give more plot summary than is necessary, crowding out the substance of the argument
                        </h2>
                        <h2>
                          Supporting discussion is almost completely plot summary
                        </h2>
                        <h2>
                          The essay quotes extensively but needs more supporting commentary. Try to quote more selectively and discuss specifically what you want your reader to see in a quotation
                        </h2>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-parallax>
              </v-app>
            </div>
            <div id="app">
              <v-app id="inspire">
                <v-parallax src="../../assets/banner.jpg" height="100vh">
                  <v-layout row wrap align-center justify-center>
                    <v-flex xs6 offset xs-1 sm6 offset-sm1 md6 offset-md1>
                      <v-card  class="mx-auto"
                               max-width="344">
                        <v-card-title primary-title class="layout justify-center">
                          <h1>评论</h1>
                        </v-card-title>
                        <h2>
                          Supporting discussion give more plot summary than is necessary, crowding out the substance of the argument
                        </h2>
                        <h2>
                          Supporting discussion is almost completely plot summary
                        </h2>
                        <h2>
                          The essay quotes extensively but needs more supporting commentary. Try to quote more selectively and discuss specifically what you want your reader to see in a quotation
                        </h2>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-parallax>
              </v-app>
            </div>
            <div id="app">
              <v-app id="inspire">
                <v-parallax src="../../assets/banner.jpg" height="100vh">
                  <v-layout row wrap align-center justify-center>
                    <v-flex xs6 offset xs-1 sm6 offset-sm1 md6 offset-md1>
                      <v-card  class="mx-auto"
                               max-width="344">
                        <v-card-title primary-title class="layout justify-center">
                          <h1>评论</h1>
                        </v-card-title>
                        <h2>
                          Supporting discussion give more plot summary than is necessary, crowding out the substance of the argument
                        </h2>
                        <h2>
                          Supporting discussion is almost completely plot summary
                        </h2>
                        <h2>
                          The essay quotes extensively but needs more supporting commentary. Try to quote more selectively and discuss specifically what you want your reader to see in a quotation
                        </h2>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-parallax>
              </v-app>
            </div>
            <markdown />
          </div>
        </div>
      </div>
      <div :class="locked ? 'asideBoxFix' : 'asideBox'">
        <div class="asideImg">
          <!-- 头像 -->
          <el-avatar
            :src="require('../../assets/avatar.jpg')"
            :size="size"
            class="asidePic"
          ></el-avatar>
        </div>
        <div class="asideTile">用户</div>
        <div class="asideTile1">----------</div>
        <el-divider>🌴</el-divider>
        <!-- 侧边栏底部图片 -->
        <img src="../../assets/beer.gif" alt="" class="bottomImg" />
      </div>
      <div v-if="btnFlag" class="go-top" @click="backTop">
        <!-- 返回顶部图标 -->
        <img src="../../assets/backTop.png" alt="" class="backTopbtn" />
      </div>
    </div>
<!--    <footerView></footerView>-->
  </div>
</template>

<script>
  import bannerView from "@/components/bannerView/index";
  // import footerView from "@/components/footerView/index.vue";
  // md文件地址
  // import markdown from "../home.md";
  import "./css/FirstView.scss";
  import "highlight.js/styles/github.css";
  export default {
  name:'FirstView',
  components: { bannerView},

  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
    this.$nextTick(() => {
      let $ele = this.$refs.banner;
      this.bannerH = $ele.$el.offsetHeight;
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  data() {
    return {
      //侧边栏头像大小
      size: 90,
      bannerH: 0,
      locked: false,
      btnFlag: false,
      //导航背景图片
      img : require('../../assets/banner.jpg'),
      // img: "http://chaichaiimage.oss-cn-hangzhou.aliyuncs.com/blog3.0/bg16.jpg",
      // 导航文字说明
      title: "个人主页",
    };
  },
  methods: {
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    scrollToTop() {
      const that = this;
      that.scrollTop = window.pageYOffset ||
              document.documentElement.scrollTop ||
              document.body.scrollTop;
      that.locked = that.btnFlag = that.scrollTop > that.bannerH
      if (that.scrollTop > that.bannerH) {
        that.locked = true;
        that.btnFlag = true;
      } else {
        that.locked = false;
        that.btnFlag = false;
      }
    },
  },
};
</script>