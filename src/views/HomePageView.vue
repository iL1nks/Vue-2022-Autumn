<template>
  <div class="about">
    
<!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
<!-- <div class="line"></div> -->

<!-- <div id="top_div"> -->
<div>
  <div class="background2">
      <!-- <img src="../assets/LoginBackground1.png" width="40%" height="80%" alt=""> -->
</div>
<!-- <div class="background">
      <img src="../assets/1.jpeg" width="40%" height="80%" alt="">
</div> -->
<div class="front">
  <br>
  <p id="title"><i class="el-icon-s-management"></i> Intelli Sci</p>
  <br>
</div>
</div>
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
    active-color="#dfabab"
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
<el-input v-model="input" placeholder="请输入检索词" size="big">
    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
</el-input>
</div>


<br>
  
<div class="front">
  <div id="divs">
  <div class="div" id="div1">
    <div><p class="title_of_tuijian">热点论文</p></div>
    <!-- <div class="line"></div> -->

    <div class="div_inside" v-for="(article, index) in recommend_articles" :key="index">
                    <div>
                      <el-row>
                        <el-col>
                          <a @click="goto_issues(article.data_id)"   class="title_inside"> {{article.title}} </a>
                          <div>
                            <!-- <div><span class="otherifo_inside">作者：{{article.author_name}} {{author2}} </span> </div> -->
                            <div v-if="article.field !== 'None'"><span class="otherifo_inside">关键词：{{article.field}}</span></div>
                            <div v-else><span class="otherifo_inside">关键词：无</span></div>
                            <div><span class="otherifo_inside">发表时间：{{article.date}} </span></div>
                          </div>
                          </el-col>
                      </el-row>
                    </div>
                  </div>
  <br><br>
  </div>
  <div class="div" id="div2">
    <div><p class="title_of_tuijian">热门领域</p></div>

    <div class="div_inside2" v-for="(field, index) in fields" :key="index">
                    <div>
                      <el-row>
                        
                        <el-col>
                          <div @click="click_field(field.field_id)" v-if="field.name !== 'None'" class="title_inside2">{{field.name}}</div>
                          <div v-else>{{field.name_e}} </div>
                          
                          <div>
                            <div><span class="otherifo_inside2">论文数量：{{field.works_count}} </span></div>
                          </div>
                         

                        </el-col>
                      </el-row>
                    </div>
                  </div>

  </div>
</div>
</div>


<br>
<div id="div_bottom">
    <p id="font_bottom">Intelli Sci</p>
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

        recommend_articles:[
            // {
            //     data_id:'',
            //     title:'基于空气动力学的四旋翼无人机研究',
            //     field:'计算机',
            //     date:'2022-1-1',
                
            // },
            // {
            //     data_id:'',
            //     title:'基于空气动力学的三旋翼有人机研究',
            //     field:'计算机',
            //     date:'1999-1-1',
            // },
            // {
            //     data_id:'',
            //     title:'基于空气动力学的三旋翼有人机研究',
            //     field:'计算机',
            //     date:'1999-1-1',
            // },
            // {
            //     data_id:'',
            //     title:'基于空气动力学的三旋翼有人机研究',
            //     field:'计算机',
            //     date:'1999-1-1',
            // },
            // {
            //     data_id:'',
            //     title:'基于空气动力学的三旋翼有人机研究',
            //     field:'计算机',
            //     date:'1999-1-1',
            // },
            // {
            //     data_id:'',
            //     title:'基于空气动力学的三旋翼有人机研究',
            //     field:'计算机',
            //     date:'1999-1-1',
            // },
        ],

        fields:[
          // {
          //   name:'软件工程',
          //   name_e:'',
          //   works_count:688827,
          // },
          // {
          //   name:'计算机科学',
          //   name_e:'',
          //   works_count:44542,
          // },
          // {
          //   name:'None',
          //   name_e:'computer',
          //   works_count:688827,
          // },
          // {
          //   name:'软件工程',
          //   name_e:'',
          //   works_count:688827,
          // },
          // {
          //   name:'软件工程',
          //   name_e:'',
          //   works_count:688827,
          // },
          // {
          //   name:'软件工程',
          //   name_e:'',
          //   works_count:688827,
          // },
          // {
          //   name:'软件工程',
          //   name_e:'',
          //   works_count:688827,
          // },
          // {
          //   name:'软件工程',
          //   name_e:'',
          //   works_count:688827,
          // },
          
        ],
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      search() {
        let search_items = {
          is_search:1, // 0:从领域跳转 1:从搜索框跳转
          search_mode:'', // 0:模糊搜索 1:高级搜索
          search_type:'', // 1:篇关摘 2:doi 3:作者 4:出版物
          search_input:'', //输入框内容
          id:'' //领域id，若is_search为1则无内容
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
      goto_issues(id) {
        this.$router.push({path:'/article',query: {id:id}})
      },
      init() {
        console.log('id:'+this.$store.state.userid);
        console.log('token:'+this.$store.state.token);
        this.$axios.post('issue/field_rank', qs.stringify({}), {
          headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
          },
        })
        .then((res) => {
        // this.$message.success('...');
        this.fields = res.data.fields;
        console.log('fields:'+res.data.fields);
        })
        .catch((err) => {
        this.$message.error(err);
        });

        this.$axios.post('issue/recommend_data', qs.stringify({}), {
          headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
          },
        })
        .then((res) => {
        // this.$message.success('...');
        this.recommend_articles = res.data.issue_list;
        console.log('issue_list:'+res.data.issue_list);
        })
        .catch((err) => {
        this.$message.error(err);
        });
      },
      click_field(field_id) {
        let search_items = {
          is_search:0, // 0:从领域跳转 1:从搜索框跳转
          search_mode:'', // 0:模糊搜索 1:高级搜索
          search_type:'', // 1:篇关摘 2:doi 3:作者 4:出版物
          search_input:'', //输入框内容
          id:field_id,
        }
        this.$router.push({path:'/searchRes',query: {search_ifo:search_items}})
      }

    },
    created() {
      this.init();
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
    justify-content:flex-start;
    flex-direction: column;
    width: 400px;
    /* height: 600px; */
    background-color: white;
    border: 1px #f0f0f0 solid; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
    margin: 10px;
}

#divs {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
}

#div_bottom {
    background-color: #1f2b3e;
    height: 100px;
    
}

#font_bottom {
    font-size: 20px;
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
  /* background-color: white; */
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
    /* height: 70px; */
    background:white;
  color: black; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 15px;
  margin-right: 15px;
}

.div_inside2 {
    height: 50px;
    background:white;
  color: black; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 15px;
  margin-right: 15px;
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
 font-size: 15px;
 /* font-weight: 500; */
}

.title_inside:hover{
  color: #666666;
}

.otherifo_inside {
  font-size: 12px;
  color: #909eb4;
  /* font-weight: 500; */
}
/* .otherifo_inside:hover {
  color: #666666;
} */

.title_inside2 {
 text-decoration: none;
 color: #333333;
 font-size: 15px;
 /* font-weight: 500; */
}

.title_inside2:hover{
  color: #666666;
}

.otherifo_inside2 {
  font-size: 12px;
  color: #909eb4;
  /* font-weight: 500; */
}
/* .otherifo_inside2:hover {
  color: #666666;
} */
</style>