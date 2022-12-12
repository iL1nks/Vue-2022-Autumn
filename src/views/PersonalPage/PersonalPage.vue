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
<!--            <top v-on:isMenuShow="isMenuShow=$event"></top>-->
            <div id="page">
<!--              <div id="photo">-->
<!--                <img src="../../assets/banner.png" alt="照片">-->
<!--              </div>-->
              <div>
                <favorite></favorite>
              </div>
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
  // import top from '../../components/top2.vue'
  import favorite from '../../components/favorite.vue'
  // import footerView from "@/components/footerView/index.vue";
  // md文件地址
  // import markdown from "../home.md";
  import "./css/PersonalPage.scss";
  import "highlight.js/styles/github.css";
  export default {
  name:'FirstView',
  components: { bannerView,
    // top,
    favorite},

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

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  #page{
    width: 100%;
    height: 3000px;

    font-family: Microsoft YaHei;

    background: #E5E5E5;
  }
  #photo{
    width: calc(100% - 0px);
    height: 312px;
    overflow: hidden;
  }
  #photo>img{
    width: 100%;
    margin-top: calc((0px - 600px + 352px) / 2 + 40px) ;	/*更换图片需要注意修改*/
  }
  #r-aside{
    display: inline-block;
    vertical-align: top;
    width: 363px;

    margin-left: 57px;
    margin-top: 17px;

  }
  #ask-question{
    width: 100%;
    height: 51px;

    background: #B23535;
    border-radius: 15px;

    font-size: 20px;
    line-height: 51px;
    text-align: center;

    color: #FFFFFF;
  }
  footer{
    left:0px;
    top:1000px;

    padding: 100px 0px;
    font-size: 18px;
    line-height: 25px;
    text-align: center;

    color: #999494;
  }
  #footer{
    position: absolute;
    left:500px;
    top:2531px;

  }
</style>
