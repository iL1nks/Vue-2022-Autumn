<template>
    <div class="search-res">
      <PageHeader :showSearch="showSearch"
                  :tag="tag"
                  :options="articleOptions"
                  :select="header_select"
                  :input="input"
                  mode="default"></PageHeader>
      <ArticleRes :header_select="header_select"
                  :input="input"
                  :aggregation="aggregation"
                  :articles="articles"
                  :total_hits_str="total_hits_str"
                  :total_hits="total_hits"
                  @changeCollect="changeCollect"
                  @high="highlight"
                  mode="normal"></ArticleRes>
    </div>
  </template>
  
  <script>
  
  import PageHeader from "../../components/PageHeader";
  import ArticleRes from "../../components/ArticleRes";
  import qs from "qs";
  import user from "../../store/user";
  import highlightApi from "../../utils/highlightApi";
import { fake_aggregation, fake_articles, fake_fetch } from "./FakeData";
  
    export default {
      components: {ArticleRes, PageHeader},
      mixins: [highlightApi],
      data() {
        return {
          showSearch: true,
          tag: 'searchRes',
          header_select: 'main',
          input: "",
          isShowTip: false,
          resultList:[],
          articleOptions: [{
              value: 'main',
              label: '篇关摘'
            }, {
              value: 'title',
              label: '篇名'
            }, {
              value: 'abstract',
              label: '摘要'
            }, {
              value: 'field',
              label: '领域'
            }, {
              value: 'author_name',
              label: '作者'
            }, {
              value: 'affiliation_name',
              label: '作者单位'
            }, {
              value: 'publisher',
              label: '文献来源'
            }, {
              value: 'doi',
              label: 'DOI'
            },
          ],
  
          total_hits:0,
          total_hits_str: '',
          aggregation: fake_aggregation,
          //articles表示当前页面显示的文章块数组
          articles:fake_articles,
          mode:'default',
        }
      },
      created() {
        let _query = this.$route.query;
        let _search_key = Object.keys(_query)[0];
        let _search_value = _query[_search_key];
  
        this.header_select = _search_key;
        this.input = _search_value;
        this.getSearchRes(1);
      },
      methods:{
        getSearchRes(pageIdx) {
          //let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
          // this.$axios({
          //   method: 'post',
          //   url: '/es/query/paper/' + this.header_select,
          //   data: qs.stringify({
          //     [this.header_select]: this.input,
          //     page: pageIdx,
          //     is_precise: (this.header_select!=='title'),
          //     size: 10,
          //   })
          // })
          fake_fetch
          .then(res => {
            //_loadingIns.close();
            switch (res.data.status) {
              case 200:
                this.articles = res.data.details;
                this.resultList = res.data.details;
                this.aggregation = res.data.aggregation;
                this.total_hits = res.data.total_hits;
                
                this.total_hits_str = res.data.total_hits.toLocaleString();
                if (res.data.total_hits === 10000)
                  this.total_hits_str = "10000+";
                // 获取 paper 是否收藏
                //this.getCollectStatus();
                console.log(this.total_hits,this.articles)
                this.$forceUpdate();
                this.highlight(this);
                break;
              case 404:
                this.total_hits = 0;
                this.total_hits_str = '0';
                break;
              case 500:
                this.$message.error("系统发生错误，请联系管理员！");
                setTimeout(() => {
                  this.$router.push("/");
                }, 1500);
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
        },
        changeCollect(data) {
          let paper = data.paper;
          let status = data.newStatus;
          for (var i = 0; i < this.articles.length; i++)
            if (this.articles[i].paper_id === paper.paper_id)
              this.articles[i].is_collect = status;
        },
        getCollectStatus() {
          const userInfo = user.getters.getUser(user.state());
          if (!userInfo) return;
          // 处理 paper_ids
          let paper_ids = [];
          let paper_collects = [];
          for (let i = 0; i < this.articles.length; i++)
            paper_ids.push(this.articles[i].paper_id);
  
          this.$axios({
            method: 'post',
            url: '/social/get/paper',
            data: qs.stringify({
              user_id: userInfo.user.userId,
              paper_ids: JSON.stringify(paper_ids),
            })
          })
          .then(res => {
            switch (res.data.status) {
              case 200:
                paper_collects = res.data.papers_attribute;
                for (let i = 0; i < this.articles.length; i++)
                  for (let j = 0; j < paper_collects.length; j++)
                    if (this.articles[i].paper_id === paper_collects[j].paper_id)
                      // TIP: 数组层次多，直接改变其值子组件不重新渲染
                      this.$set(this.articles[i], 'is_collect', paper_collects[j].is_collected);
                      // this.articles[i].is_collect = paper_collects[j].is_collected;
                break;
              case 401:
                console.log("传参错误！");
                break;
              case 402:
                this.$userInvalid();
                break;
              case 404:
                this.$userNotFound();
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
        },
      },
    };
  </script>
  
  <style scoped>
  
  /* .search-res >>> .el-input-number.is-controls-right .el-input-number__decrease{
    width:15px !important;
    height: 14px;
  
  }
  
  .search-res >>> .el-input-number.is-controls-right .el-input-number__increase{
    width:15px !important;
    height: 14px;
    margin-top: 3px;
  }
  
  .search-res >>> .el-input-number.is-controls-right .el-input__inner {
      padding-left: 10px;
      padding-right: 20px;
      height: 30px;
  } */
  
  .search-res >>> .search-text {
    color: red;
  }
  
  .search-res >>> .el-pager li{
    width:40px;
    height:40px;
    padding: 7px;
  }
  
  .search-res >>> .el-pagination .btn-prev .el-icon{
    font-size: 15px;
    margin: 15px;
  }
  
  .search-res >>> .el-pagination .btn-next .el-icon{
    font-size: 15px;
    margin: 15px;
  }
  
  .search-res .main-body {
    padding: 0 40px 20px 80px;
  }
  
  .search-res .header {
    margin-bottom: 40px;
  }
  
  .search-res .box-card {
    padding: 20px;
  }
  
  .search-res .box-card .sub-block {
    margin-bottom: 20px;
  }
  
  .search-res .year-input >>> .el-input--mini .el-input__inner {
    font-size: 13px;
    color: #0274B3;
  }
  
  .search-res .year-input >>> .el-input__inner {
    padding-left: 5px;
    padding-right: 5px;
    text-align: center;
  }
  
  .search-res .year-input >>> .el-input--mini {
    width: 45px;
    text-align: center;
  }
  
  .search-res >>> .el-pagination__editor.el-input .el-input__inner {
      height: 40px;
  }
  
  .search-res >>> .el-pagination__jump{
    font-size: 15px;
  }
  
  .search-res .box-card .check-box-title {
    text-align: left;
    font-size: 17px;
    margin-bottom: 20px;
  }
  
  </style>