<template>
  <div id="bpp">
    <div id="login">
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <h2>用户登录</h2>
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        username: "",
        password: ""
      },
      rules2: {
        username: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    add() {
      this.$http.post("/login", this.ruleForm2).then(response => {
        console.log(response);
        var { meta, data } = response.data;
        if (meta.status === 200) {
          window.localStorage.setItem("token", data.token);
          this.$router.push("/index");
          this.$message({
            message: "恭喜你，登录成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "恭喜你，登录失败",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style>
#bpp {
  width: 100%;
  height: 100%;
  background-color: #333;
}
#login {
  width: 500px;
  height: 400px;
  left: 0;
  right: 0;
  margin: auto;
  top: 100px;
  position: relative;
  background-color: #fff;
}
.demo-ruleForm {
  position: relative;
  top: 20px;
  width: 400px;
  height: 200px;
  margin: auto;
}

.el-form-item__label {
  text-align: center;
}
.el-form-item__content {
  width: 100%;
}
</style>
