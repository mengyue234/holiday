<template>
  <div class="box-card">
    <!-- 导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 下方表格 -->
    <el-table :data="tableData3" height="530px" size="100" border style="width: 100%;">
      <el-table-column prop="id" label="#" width="180"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData3: []
    };
  },
  methods: {
    listInformation() {
      this.$http
        .request({
          url: "/rights/list",
          methods: "get",
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        })
        .then(response => {
          console.log(response);
          //   var { data, meta } = response;
          if (response.data.meta.status === 200) {
            this.tableData3 = response.data.data;
          }
          //   console.log(response.data.meta);
        });
    }
  },
  mounted() {
    this.listInformation();
  }
};
</script>

<style>
.el-main {
  line-height: 0;
  /* overflow: auto; */
}
</style>
