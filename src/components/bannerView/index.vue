
<template>
  <div>
    <div
      class="bannerBox"
      :style="{ background: 'url(' + imgUrl + ')', backgroundSize: 'cover' }"
    >
      <div class="coverBox">
        <div class="navBox">
          <div class="topTitle">Intelli Sci</div>
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            collapse-transition
            background-color="#0000001D"
            router
            text-color="#fff"
            menu-trigger="click"
          >
          </el-menu>
        </div>
        <div class="centerTile">{{ titleName }}</div>
        <div class="icon">﹀</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'bannerView',
  props: {
    imgUrl: {
      required: true,
    },
    titleName: {
      required: true,
    },
  },
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
.bannerBox {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
}
.coverBox {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);

  .navBox {
    height: 60px;
    display: flex;
    flex-wrap: nowrap;
    line-height: 60px;
    justify-content: space-between;
    padding: 20px 35px 0 35px;

    .topTitle {
      width: 300px;
      text-align: left;
      color: #fff;
      font-size: 38px;
      font-weight: 900;
      text-transform: uppercase;
    }
    .el-menu {
      background-color: rgba(0, 0, 0, 0) !important;
      border: 0px;
    }

    .el-menu-item {
      font-size: 18px;
      font-weight: 600;
      background-color: rgba(0, 0, 0, 0) !important;
    }
    .el-submenu__title {
      font-size: 18px !important;
      font-weight: 600;
      background-color: rgba(0, 0, 0, 0) !important;
    }
  }
  .centerTile {
    width: 100%;
    line-height: 70vh;
    color: #fff;
    font-size: 38px;
    font-weight: 900;
    letter-spacing: 8px;
  }
  .icon {
    margin-top: 30px;
    z-index: 99999;
    font-weight: 900;
    font-size: 35px;
    color: #fff;
  }
}
</style>
<style>
.friendIco {
  display: inline-block;
  width: 25px;
  margin: 0 3px;
  vertical-align: middle;
}
.friendList {
  height: 80px !important;
  line-height: 80px !important;
  margin: 5px auto;
  text-align: center;
}
</style>