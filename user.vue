<template>
  <el-card>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row style="padding:25px 0;">
      <el-col :span="10">
        <div>
          <el-input placeholder="请输入内容" class="input-with-select" v-model="search">
            <el-button slot="append" icon="el-icon-search" @click="searchs"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="14">
        <!-- 增加按钮 -->
        <el-button type="success" @click="addForm=true" class="addNewList">点击新增</el-button>

        <el-dialog title="收货地址" :visible.sync="addForm">
          <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addForm = false">取 消</el-button>
            <el-button type="primary" @click="addNewUsers">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
    <!-- 下方表格 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="id" label="#" width="180"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <!-- {{ scope.row }} -->
          <el-switch v-model="scope.row.mg_state" @change="changeSwicth(scope.row)"></el-switch>
          <!-- scope.row: 当前行的数据源对象 -->
        </template>
      </el-table-column>
      <!-- 编辑,删除按钮 -->
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <!-- {{ scope.row }} -->
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="edite(scope.row)"></el-button>
          <el-button size="mini" type="primary" icon="el-icon-delete" @click="del(scope.row)"></el-button>
          <el-button size="mini" type="primary" icon="el-icon-share"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑功能菜单 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="formObj">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="formObj.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editeOddUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 数据分页 -->
    <div class="block">
      <span class="demonstration">完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      pagenum: 1,
      pagesize: 4,
      userList: [],
      total: 0,
      search: "",
      dialogFormVisible: false,
      addForm: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "120px",
      formObj: {}
    };
  },
  methods: {
    //   渲染
    apply() {
      this.$http
        .get(
          `/users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${
            this.search
          }`,
          {
            headers: {
              Authorization: window.localStorage.getItem("token")
            }
          }
        )
        .then(resp => {
          //   console.log(resp);
          var { data, meta } = resp.data;
          // console.log(data.users)
          this.userList = data.users;
          this.total = data.total;
          //   console.log(this.userList);
        });
    },
    // 分页
    handleCurrentChange(num) {
      this.pagenum = num;
      this.apply();
    },
    // 换页
    handleSizeChange(val) {
      console.log(111);
      this.pagesize = val;
      this.apply();
      console.log(`每页显示${val}条`);
    },
    //智能查询
    searchs() {
      this.apply();
      //   console.log(this.search);
    },
    // 新增
    addNewUsers() {
      this.addForm = true;
      this.$http
        .request({
          url: "/users",
          method: "post",
          data: {
            ...this.form
          },
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        })
        .then(data => {
          this.apply();
          console.log(data);
          this.addForm = false;
        });
    },
    // 打开编辑界面
    edite(scopes) {
      this.dialogFormVisible = true;
      this.formObj = scopes;
    },
    // 编辑
    editeOddUser(id) {
      this.$http
        .request({
          url: `/users/${this.formObj.id}`,
          method: "put",
          data: {
            email: this.formObj.email,
            mobile: this.formObj.mobile
          },
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        })
        .then(response => {
          //   console.log(data);
          if (response.data.meta.status === 200) {
            this.apply();
            this.dialogFormVisible = false;
          }
        });
    },
    //删除
    del(delScope) {
      this.$http
        .request({
          url: `/users/${delScope.id}`,
          method: "delete",
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        })
        .then(response => {
          //   console.log(response);
          if (response.data.meta.status === 200) {
            this.apply();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
        });
    },
    //改变用户状态
    changeSwicth(changeIt) {
      this.$http
        .request({
          url: `/users/${changeIt.id}/state/${changeIt.mg_state}`,
          method: "put",
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        })
        .then(response => {
          //   console.log(response);
          if (response.data.meta.status === 200) {
            this.$message({
              message: "设置成功",
              type: "success"
            });
          }
        });
    }
  },
  mounted() {
    this.apply();
  }
};
</script>

<style>
.el-main {
  line-height: 0;
}
.input-with-select {
  width: 400px;
  float: left;
}
.addNewList {
  float: left;
}
</style>
