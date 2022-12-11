<template>
  <div class="about">
    
<!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
<!-- <div class="line"></div> -->

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





<br>

<div v-if="this.$store.state.login_state === 1">
<!-- <el-tooltip :content="'Switch value: ' + value1" placement="top"> -->



<div v-if="this.value1 == 1">
<el-input v-model="input" placeholder="请输入检索词" size="big"> 
  <el-select v-model="select" slot="prepend" placeholder="检索依据">
      <el-option label="篇关摘" value="1"></el-option>
      <el-option label="doi" value="2"></el-option>
      <el-option label="作者" value="3"></el-option>
      <el-option label="出版物" value="4"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
</el-input>
</div>

<div v-else>
<el-input v-model="input" placeholder="请输入检索词" size="big">
    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
</el-input>
</div>

<br>
  <el-switch
    v-model="value1"
    active-color="#13ce66"
    inactive-color="gray"
    active-value="1"
    inactive-value="0">
  </el-switch>
<div v-if="this.value1 == 1" style="color:green">
  高级检索
</div>
<div v-else>
  高级检索
</div>

</div>

<div v-else>
<el-input v-model="input" placeholder="中文文献、外文文献" size="big">
    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
</el-input>
</div>


<br>


  <!-- <el-container>
  <el-header>Header</el-header>
  <el-main>Main</el-main>
</el-container> -->

<!-- <img src="../assets/LoginBackground1.png" height="693" width="1536" style="position: absolute;left: 0px;top: 60px "> -->


  
<div class="front">
  <div id="divs">
  <div class="div" id="div1">
    <div><p class="title_of_tuijian">热点论文</p></div>
    <!-- <div class="line"></div> -->

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
    <!-- <div class="line"></div> -->

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
        title1: '基于空气动力学的四旋翼无人机研究',
        author1: '王大雷',
        author2: '王小磊',
        author3: '',
        field1: '农林',

        value1:'0',

        field:[],
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      search() {
        let search_items = {
          search_mode:'', // 0:模糊搜索 1:高级搜索
          search_type:'', // 1:篇关摘 2:doi 3:作者 4:出版物
          search_input:'', //输入框内容
        }
          if (this.$store.state.login_state === 0) //游客状态
          {
            search_items.search_mode = 0;
          }
          else
          {
            search_items.search_mode = this.value1;
            if (this.value1 === '1')
            {
              search_items.search_type = this.select;
            }
          }
          search_items.search_input = this.input;
          // console.log(this.input);
          // console.log('mod:'+this.select);
          console.log(search_items);
          this.$router.push({path:'/searchRes',query: {search_ifo:search_items}})
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
.line {
      /* width: 50%; */
      height: 1px;
      /* border-top: solid #ACC0D8 1px; */
      border-top: solid gray 1px;
}

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
    width: 115px;
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
    /* background:#dde9f8; */
    background:white;
  /* width: 100%;  */
  /* font-size: 18px;  */
  color: black; 
  /* border: 1px #d7edff solid;  */
  border: 1px #f0f0f0 solid; 
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
    /* color: #B3C0D1; */
    /* color: white; */
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
  /* background-color: #dddddd;  */
  background-color: white;
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
    /* background:#f0f5fc; */
    background:white;
  /* width: 100%;  */
  /* font-size: 18px;  */
  color: black; 
  /* border: 1px #d7edff solid;  */
  border: 1px #f1f1f1 solid; 
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