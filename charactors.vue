<template>
  <div>
    <!-- 导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 下方表格 -->
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- {{ scope.row }} -->
          <!-- 遍历生成一级数据源 -->
          <el-row v-for="(item) in scope.row.children" :key="item.id">
            <el-col :span="5">
              <el-tag :closable="true">{{item.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="19">
              <!-- 遍历生成2级数据源 -->
              <el-row v-for="(item1) in item.children" :key="item1.id">
                <el-col :span="7">
                  <el-tag :closable="true" type="success">{{item1.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="17">
                  <!-- 遍历生成3级数据 -->
                  <el-tag
                    v-for="(item2) in item1.children"
                    :key="item2.id"
                    :closable="true"
                    type="danger"
                  >{{item2.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- {{ scope.row }} -->
          <!-- {{ scope.row.children }} -->
          <el-button type="primary" icon="el-icon-edit"></el-button>
          <el-button type="primary" icon="el-icon-share"></el-button>
          <el-button
            type="primary"
            icon="el-icon-check"
            @click="xuan(scope.row.children, scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 权限分配框 -->
    <el-dialog title="分配权限" :visible.sync="centerDialogVisible" width="30%" center>
      <el-tree
        :data="tableData6"
        show-checkbox
        :default-expand-all="true"
        node-key="id"
        :default-checked-keys="defaultCheck"
        ref="tree"
        :props="props"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPower">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultCheck: [],
      tableData5: [],
      tableData6: [],
      items: [],
      roleId: "",
      centerDialogVisible: false,
      props: {
        label: "authName",
        children: "children"
      }
    };
  },
  methods: {
    //   打开页面渲染权限
    async newRoles() {
      var res = await this.$http.request({
        url: "/roles",
        methods: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.tableData5 = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 点击编辑权限获取当前管理对应的权限
    xuan(rights, id) {
      this.roleId = id;
      this.defaultCheck = [];
      this.centerDialogVisible = true;
      this.getAllList();
      //   console.log(rights);
      //   console.log(id);
      //   console.log(item);
      rights.forEach(item => {
        item.children.forEach(item1 => {
          item1.children.forEach(item2 => {
            this.defaultCheck.push(item2.id);
          });
        });
      });
      console.log(this.defaultCheck);
    },
    // 得到所有数据
    async getAllList() {
      var res = await this.$http.request({
        url: "/rights/tree",
        methods: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.tableData6 = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 赋予角色权限
    async addPower() {
      this.centerDialogVisible = false;
      // 得到当前选中的所有权限的 id
      var allcheck = this.$refs.tree.getCheckedKeys();
      var halfcheck = this.$refs.tree.getHalfCheckedKeys();
      // 合并两个数组
      var newArr = halfcheck.concat(allcheck);
      // 拼接为字符串
      var ids = newArr.join(",");
      // 发送请求
      var res = await this.$http.request({
        url: `roles/${this.roleId}/rights`,
        method: "post",
        data: {
          rids: ids
        },
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta } = res.data;
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
      } else {
        this.$message.error(meta.msg);
      }
      this.roleDialog = false;
      this.getAllList();
    }
  },
  mounted() {
    this.newRoles();
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-main {
  line-height: 0;
}

.el-item {
  margin-top: 10px;
  margin-left: 10px;
}
</style>
