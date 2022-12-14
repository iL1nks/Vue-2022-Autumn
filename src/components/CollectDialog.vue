<template>
  <div class="collect-dialog">
    <el-dialog
        title="收藏"
        :visible.sync="dialogVisible"
        @close="closeDialog"
        width="40%">
      <el-divider></el-divider>
      <div style="text-align:left; padding-left: 10px; padding-right: 10px">
        <el-checkbox
            :key="favor.favorites_id"
            v-for="favor in favors"
            closable
            :disable-transitions="false"
            @click.native="chooseFavor(favor)"
            :effect=favor.favorites_id
            style="margin-top:10px; margin-bottom: 10px; cursor: pointer">
          {{favor.name}}
        </el-checkbox>
        <div style="text-align:left; padding-left: 10px; padding-right: 10px"></div>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">创建新收藏夹</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="sureCollect">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "CollectDialog",
  props: ["curPaper", "showCollect"],
  watch: {
    showCollect(newVal) {
      this.dialogVisible = newVal;
      if (this.dialogVisible === true) {
        this.getFavors().then(() => {
          this.dialogVisible = true;
        });
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      favors: [
        {
          favorites_id: 1,
          name: "默认收藏夹",
          description: '',
          time: "2022-12-11T17:22:27+08:00",
        },
        {
          favorites_id: 2,
          name: "收藏夹1",
          description: '',
          time: "2022-12-11T17:22:27+08:00",
        },
      ],
      select_favors: [],
      inputVisible: false,
      inputValue: '',
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeChildDialog');
    },
    chooseFavor(favor) {
      debugger
      if(this.select_favors.findIndex(favor.favorites_id) == -1)
        this.select_favors.push(favor.favorites_id);
      else this.select_favors.filter(item => item.favorites_id != favor.favorites_id)
    },
    //新建
    handleInputConfirm() {
      debugger
      this.$axios
      .post('user/create_favorites', qs.stringify({
        name: this.inputValue,
        description: this.inputValue,
      }), {
        headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
        },
      })
      .then((res) => {
        if (res.data.errno === 0) {
          this.$message.success('创建成功');
        } else {
          this.$message.error('创建失败');
        }
      })
      .catch((err) => {
        this.$message.error('创建失败');
      });

      this.$axios
      .post('user/my_favorites_list', qs.stringify({}), {
        headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
        },
      })
      .then((res) => {
        if (res.data.errno === 0) {
          if(res.data.favorites_contents.length > 0) 
            this.favors = res.data.favorites_contents;
        } else {
          console.log(res.data.errno)
        }
      })
      .catch((err) => {
        this.$message.error(err);
      });
      this.select_favors = [];
      for(let i = 0; i < this.favors.length; i++) {
        this.select_favors.push(this.favors[i].favorites_id);
      }
    },
    sureCollect() {
      for(let i = 0; i < this.select_favors.length; i++) {
        this.doFavor(this.select_favors[i].favorites_id)
      }
    },
    doFavor(favor_id) {
      this.$axios
      .post('issue/favorites_issue', qs.stringify({
        data_id: this.curPaper.issue_id,
        favorites_id: favor_id
      }), {
        headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
        },
      })
      .then((res) => {
        if (res.data.errno === 0) {
          this.$message.success('...');
        } else {
          this.$message.error('收藏失败');
        }
      })
      .catch((err) => {
        this.$message.error('收藏失败');
      });
    },
    async getFavors() {
      // 获取用户所有收藏夹
      this.$axios
      .post('user/my_favorites_list', qs.stringify({}), {
        headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
        },
      })
      .then((res) => {
        if (res.data.errno === 0) {
          if(res.data.favorites_contents.length > 0) 
            this.favors = res.data.favorites_contents;
        } else {
          console.log(res.data.errno)
        }
      })
      .catch((err) => {
        console.log(err)
      });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
  }
}
</script>

<style scoped>

.collect-dialog .el-tag {
  margin-right: 10px;
}
.collect-dialog .button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 10px;
  margin-bottom: 10px;
}
.collect-dialog .input-new-tag {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90px;
  vertical-align: bottom;
}
.collect-dialog >>> .el-dialog__body{
  padding-top: 0 !important;
}
.collect-dialog >>> .el-dialog__body .el-divider--horizontal{
  margin-top:5px;
}

</style>