<template>
    <div class="about">
        <br>
        <div>
            <el-input v-model="input" placeholder="请输入姓名检索" size="big">
                <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
            </el-input>
        </div>
        <br>
        <div class="front">
            <div id="divs">
                <div class="div">
                    <div><p class="title_of_tuijian">检索结果</p></div>
                    <el-card v-for="item in portals" :key="item.data" class="portal-item">
                        <span class="name-text">{{item.name}}</span><span class="title1" v-if="item.institution_name!='None'&&item.institution_name!='无机构'">{{item.institution_name}}</span>
                        <span class="but"><el-button type="primary">进入</el-button>
                        </span>
                    </el-card>
                    <br>
                    <div v-if="portals.length==15" class="tips">没找到想找的人？试试更完整的名字</div>
                    <div v-if="portals.length==0&&det==1" class="tips ">没有找到相关专家</div>
                </div>
            </div>
        </div>
    </div>
</template>

  
  
  
  <script>
  import qs from "qs";
    export default {
      data() {
        return {
          input: '',
          portals:[],
          det:0,
        };
      },
      methods: {
        search(){
          console.log(this.input);
          this.$axios.post('portal/search_portal', qs.stringify({
            name:this.input,
            page:1
          }), {
            headers: {
              userid: this.$store.state.userid,
              token: this.$store.state.token
            },
          }).then((res) => {
            this.det=1;
            console.log(res);
            this.portals=res.data.portal_list;
            console.log(this.portals)
          }).catch((err) => {
            this.$message.error(err);
          });
        }
      }
    }
  </script>
  
  <style scoped>
  .name-text {
    font-family: Tahoma,fantasy;
    text-align: left;
    padding-top: 50px;
    padding-left: 20px;
    font-weight: bold;
    font-size: 30px;
    line-height: 40px;
    color: #353535;
  }

  .title1 {
    text-align: left;
    padding-left: 20px;
    margin-top: 10px;
    font-size: 17px;
    color: #656d7a;
  }
  .title_of_tuijian {
  font-size: 26px;
  font-weight: 900;
  font-family:SimHei;
  /* color: #3f65d6; */
  color: #26386d;
  }
  .tips {
  font-size: 22px;
  font-weight: 900;
  font-family:SimHei;
  /* color: #3f65d6; */
  color: #3f4249;
  }
  .but {
    float: right;
  }

  .el-input {
      width:600px;
    }
  
  .portal-item {
    background-color: white;
    width: 800px;
    margin:5px;
    text-align: left;
  }
  
  .div {
      display: flex;
      /* background-color: white; */
      justify-content:flex-start;
      /* justify-content: center; */
      flex-direction: column;
      width: 800px;
      /* color: black;  */
      /* border-radius: 5px;  */
      margin: 10px;
  }
  
  #divs {
      display: flex;
      /* flex-direction: column; */
      justify-content: center;
  }
  </style>