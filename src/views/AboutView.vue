<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{this.var2}} 
  </div>
</template>

<script>
  export default {
    data() {
      return {
          var1:'12322' ,//query传参测试
          var2:[],
      };
    },
    created() {
      this.var2 = this.$route.query.search_ifo;
      // alert(123);
    }

  }
</script>
