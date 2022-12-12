<template>
    <div class="portal">
      <el-row>
        <el-col class="portal-block" :span="12">
          <div class="name-text">
            {{ portal.name }}
          </div>
          <div class="title1" v-if="portal.field">
            <span class="_info">研究领域:{{ portal.field }}</span>
          </div>
        </el-col>
  <!--      <el-col :span="7" class="logo-div">LOGO</el-col>-->
      </el-row>
  
      <el-row>
        <el-col :span="22">
  
          <div class="article-div">
                <div class="title2">作者文献</div>
                <div class="articles">
                  <div class="articles-block" v-for="(article, index) in articles" :key="index">
                    <div>
                      <el-row>
                        <el-col :span="2" style="text-align: right; font-size: 15px">[{{ index+1 }}]&nbsp;&nbsp;&nbsp;</el-col>
                        <el-col :span="22">
                          <div class="articles-title">
                            <span>{{ article.name }}</span>
                          </div>
                          <div class="articles-author _info">
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
          </div>

          <div class="relation-div">
            <div class="title2">作者导师</div>
            <div v-if="teacher && teacher.length>0">
              <div class="relation-content _content" style="color: #909eb4; font-size: 14px">
                {{ teacher }}
              </div>
            </div>
            <div v-else>
              <div class="relation-content _content" style="color: #909eb4; font-size: 14px">未找到相关数据</div>
            </div>
            
            <div class="title2">合作作者</div>
            <div v-if="partner && partner.length>0">
              <div class="relation-content _content" style="color: #909eb4; font-size: 14px">
                {{ partner }}
              </div>
            </div>
            <div v-else>
              <div class="relation-content _content" style="color: #909eb4; font-size: 14px">未找到相关数据</div>
            </div>

            <div class="title2">获得支持基金</div>
            <div v-if="fund && fund.length>0">
              <div class="relation-content _content" style="color: #909eb4; font-size: 14px">
                {{ fund }}
              </div>
            </div>
            <div v-else>
              <div class="relation-content _content" style="color: #909eb4; font-size: 14px">未找到相关数据</div>
            </div>

            <div class="title2">指导的学生</div>
            <div v-if="student && student.length>0">
              <div class="relation-content _content" style="color: #909eb4; font-size: 14px">
                {{ student }}
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
  
  export default {
    name: "portal",
    data() {
      return {
        portal:{
            name:'张三',
            field:'数学',
        },
        articles:[
            {
                authors:[
                    {
                        author_name:'张三',
                    },
                    {
                        author_name:'AAAA',
                    }
                ],
                name:'math1',
            },
            {
                authors:[
                    {
                        author_name:'张三',
                    },
                    {
                        author_name:'BBBB',
                    }
                ],
                name:'math2',
            },
        ],
        teacher:'CCCC',
        partner:'DDDD',
        fund:'',
        student:'EEEE',
      }
    },
    watch: {
    },
    methods: {
      goLink(url) {
        window.open(url);
      },
      toarticle: function(paper_id) {
        let routeUrl = this.$router.resolve({
          path: '/article',
          query: { v: paper_id }
        });
        window.open(routeUrl .href, "_self");
      },
      toportal: function(id) {
        let routeUrl = this.$router.resolve({
          path: '/portal',
          query: { v: id }
        });
        window.open(routeUrl .href, "_self");
      },
      toComment: function(id) {
        let routeUrl = this.$router.resolve({
          path: '/commentDetail',
          query: { v: id }
        });
        window.open(routeUrl .href, "_blank");
      },
      toField: function(field_name) {
        let routeUrl = this.$router.resolve({
          path: '/searchRes',
          query: { field: field_name }
        });
        window.open(routeUrl .href, "_self");
      },
    },
    created() {
    },
  }
  </script>
  
  <style scoped>
  
  .portal .portal-block {
    margin-left: 180px;
    min-height: 200px;
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