<template>
  <el-row class="topBar">
    <el-col :span="4">
      <div class="box1">
        <img src="@/assets/images/logo.png" alt>
      </div>
    </el-col>

    <el-col :span="18">
      <div class="box2">电商后台管理系统</div>
    </el-col>

    <el-col :span="2">
      <div class="box3">
        <a href="#" @click.prevent="open2">退出</a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    open2() {
      this.$confirm("此操作将退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          window.localStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style>
.el-header {
  padding: 0;
}
.box2 {
  color: aliceblue;
  font-size: 24px;
  text-align: center;
}
.box3 a {
  color: aliceblue;
  text-decoration: none;
}
</style>
