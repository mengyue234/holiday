<template>
  <div class="indexx">
    <el-container>
      <el-header>
        <Top></Top>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <sideLeft></sideLeft>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Top from "@/layout/topHead.vue";

import sideLeft from "@/layout/leftSide.vue";

export default {
  components: {
    Top,

    sideLeft
  }
};
</script>

<style>
.el-header,
.indexx {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 100%;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
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
.el-container {
  height: 100%;
}
</style>
