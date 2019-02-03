<template>
  <el-col :span="12" class="titlebox">
    <el-menu
      :router="true"
      :unique-opened="true"
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#990000"
      active-text-color="#DC143C"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user">
            <i class="el-icon-sold-out"></i>用户列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/charactors">
            <i class="el-icon-sold-out"></i>角色列表
          </el-menu-item>
          <el-menu-item index="/rules">
            <i class="el-icon-sold-out"></i>权限列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <i class="el-icon-sold-out"></i>商品列表
          </el-menu-item>
          <el-menu-item index="1-1">
            <i class="el-icon-sold-out"></i>分类参数
          </el-menu-item>
          <el-menu-item index="1-1">
            <i class="el-icon-sold-out"></i>商品分类
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <i class="el-icon-sold-out"></i>订单列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <i class="el-icon-sold-out"></i>数据报表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {};
</script>

<style>
.titlebox {
  width: 99%;
  height: 100%;
  overflow: hidden;
}
.el-menu-vertical-demo {
  width: 198px;
  height: 100%;
}
.el-aside {
  height: 100%;
}
</style>
