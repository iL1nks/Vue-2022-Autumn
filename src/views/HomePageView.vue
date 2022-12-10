<template>
  <div class="about">
    
<!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
<div class="line"></div>

<!-- <div id="top_div"> -->
<div>
  <div class="background2">
      <!-- <img src="../assets/LoginBackground1.png" width="40%" height="80%" alt=""> -->
</div>
<div class="background">
      <img src="../assets/1.jpeg" width="40%" height="80%" alt="">
</div>
<div class="front">
  <br>
  <p id="title"><i class="el-icon-s-management"></i> Intelli Sci</p>
  <br>
</div>
</div>

<br>

<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#abadad"
  text-color="#333333"
  active-text-color="#ffd04b">



<el-menu-item index="5">主页</el-menu-item>
  <el-menu-item index="3" @click="goto_login()">登录/注册</el-menu-item>
  <el-menu-item index="4">个人中心</el-menu-item>
    <!-- <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu> -->
</el-menu>




<br>
<el-input v-model="input" placeholder="中文文献、外文文献" size="big"> 
  <el-select v-model="select" slot="prepend" placeholder="篇名">
      <el-option label="篇名" value="1"></el-option>
      <el-option label="主题" value="2"></el-option>
      <el-option label="作者" value="3"></el-option>
      <el-option label="全文" value="4"></el-option>
      <el-option label="关键词" value="5"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="show_input()"></el-button>
</el-input>

<br>

<br><br>

  <!-- <el-container>
  <el-header>Header</el-header>
  <el-main>Main</el-main>
</el-container> -->

<!-- <img src="../assets/LoginBackground1.png" height="693" width="1536" style="position: absolute;left: 0px;top: 60px "> -->


  
<div class="front">
  <div id="divs">
  <div class="div" id="div1">
    <div><p class="title_of_tuijian">热点论文</p></div>

    <div class="div_inside">
      <div>
      <a href="#" class="title_inside"> {{title1}} 
        <p class="otherifo_inside">作者：{{author1}} {{author2}} {{author3}}等<br>领域：{{field1}}</p>
      </a>
      </div>
    </div>

    <div class="div_inside">
      <div>
      <a href="#" class="title_inside"> {{title1}} 
        <p class="otherifo_inside">作者：{{author1}} {{author2}} {{author3}}等<br>领域：{{field1}}</p>
      </a>
      </div>
    </div>

    <div class="div_inside">
      <div>
      <a href="#" class="title_inside"> {{title1}} 
        <p class="otherifo_inside">作者：{{author1}} {{author2}} {{author3}}等<br>领域：{{field1}}</p>
      </a>
      </div>
    </div>

  </div>
  <div class="div" id="div2">
    <div><p class="title_of_tuijian">热门领域</p></div>

    <div class="div_inside">
      <div>
      <a href="#" class="title_inside"> {{title1}} 
        <p class="otherifo_inside">作者：{{author1}} {{author2}} {{author3}}等<br>领域：{{field1}}</p>
      </a>
      </div>
    </div>

    <div class="div_inside">
      <div>
      <a href="#" class="title_inside"> {{title1}} 
        <p class="otherifo_inside">作者：{{author1}} {{author2}} {{author3}}等<br>领域：{{field1}}</p>
      </a>
      </div>
    </div>

    <div class="div_inside">
      <div>
      <a href="#" class="title_inside"> {{title1}} 
        <p class="otherifo_inside">作者：{{author1}} {{author2}} {{author3}}等<br>领域：{{field1}}</p>
      </a>
      </div>
    </div>

  </div>

  <!-- <div class="div" id="div3">
    <div><p class="title_of_tuijian">推荐页3</p></div>

    <div class="div_inside">
      <div>
      <a href="#" class="title_inside"> {{title1}} 
        <p class="otherifo_inside">作者：{{author1}} {{author2}} {{author3}}等<br>领域：{{field1}}</p>
      </a>
      </div>
    </div>

    <div class="div_inside">
      <div>
      <a href="#" class="title_inside"> {{title1}} 
        <p class="otherifo_inside">作者：{{author1}} {{author2}} {{author3}}等<br>领域：{{field1}}</p>
      </a>
      </div>
    </div>

    <div class="div_inside">
      <div>
      <a href="#" class="title_inside"> {{title1}} 
        <p class="otherifo_inside">作者：{{author1}} {{author2}} {{author3}}等<br>领域：{{field1}}</p>
      </a>
      </div>
    </div>

  </div> -->
  <!-- <div class="div" id="div2">
推荐页2
<br><br>
标题2<br>
内容内容内容内容<br>
内容内容内容内容<br>
  </div>
  <div class="div" id="div3">
推荐页3
<br><br>
标题3<br>
内容内容内容内容<br>
内容内容内容内容<br>
  </div> -->
</div>
</div>


<br>
<div id="div_bottom">
    <p id="font_bottom">软工第13组</p>
</div>

  </div>
</template>




<script>
import qs from "qs";
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        input: '',
        select: '',
        // title1: 'Knowledge-rich, computer-assisted composition of Chinese couplets',
        title1: '基于空气动力学的四旋翼无人机研究',
        author1: '王大雷',
        author2: '王小磊',
        author3: '',
        field1: '农林',

        field:[],
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      show_input() {
          console.log(this.input);
      },
      goto_login() {
        this.$router.push({ path: '/login' });
      },
      get_fileds() {
        this.$axios.post('issue/field_rank', qs.stringify({}), {
          headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
          },
        })
        .then((res) => {
        // this.$message.success('...');
        this.field = res.data.fields;
        console.log(res.data.fields);
        })
        .catch((err) => {
        this.$message.error(err);
        });
      }

    },
    created() {
      this.get_fileds();
      // alert(123);
    }
  }
</script>

<style scoped>
.el-menu-demo {
  /* height: 80px; */
}

.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

.el-input {
    width: 800px;
  }
  .el-select{
    width: 100px;
  }

/* #div1 {
    
} */

.div {
    display: flex;
    /* background-color: white; */
    justify-content: flex-start;
    flex-direction: column;
    width: 400px;
    height: 600px;
    /* background: #86c7ff;  */
    background:#dde9f8;
  /* width: 100%;  */
  /* font-size: 18px;  */
  color: black; 
  border: 1px #d7edff solid; 
  border-radius: 5px; 
  margin: 0px 0px 7px 0px;
  box-shadow:5px 5px 10px rgb(221, 224, 230);
  /* background: linear-gradient(to right,#f1e6e9, #e3e9f0); */
  margin: 10px;
}

#divs {
    display: flex;
    justify-content: center;
}

#div_bottom {
    background-color: #1f2b3e;
    height: 100px;
    
}

#font_bottom {
    font-size: 15px;
    color: #B3C0D1;
}

#title {
  font-size: 50px;
  font-weight: 900;
  color: #3365de;
}

.background {
  /* background-color: yellow; */
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 35%;
  opacity: 30%;
}

.background2 {
  background-color: #dddddd; 
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  /* z-index: -1; */
  position: absolute;
  /* height:693px;
  width:1536px; */

  width: 100%;
  height: 985px;
  opacity: 80%;
}

.front {
  z-index: 1;
  position: relative; /*调成absolute时没有居中而是靠左，所以我试了试改成relative了*/
}

.div_inside {
  display: flex;
    /* background-color: white; */
    flex-direction: column;
    justify-content: center;
    width: 380px;
    height: 150px;
    background:#f0f5fc;
  /* width: 100%;  */
  /* font-size: 18px;  */
  color: black; 
  border: 1px #d7edff solid; 
  border-radius: 10px; 
  margin: 0px 0px 7px 0px;
  box-shadow:2px 5px 10px rgb(221, 224, 230);
  /* background: linear-gradient(to right,#f1e6e9, #e3e9f0); */
  margin: 10px;
}

.title_of_tuijian {
  font-size: 20px;
  font-weight: 900;
  font-family:SimHei;
  /* color: #3f65d6; */
  color: #26386d;
}

.title_inside {
 text-decoration: none;
 color: #333333;
 font-size: 25px;
 font-weight: 500;
}

.title_inside:hover{
  color: #666666;
}

.otherifo_inside {
  font-size: 14px;
  color: #333333;
  font-weight: 500;
}
.otherifo_inside:hover {
  color: #666666;
}

/* .title_tuijianye {
  font-size: 20px;
} */

</style>