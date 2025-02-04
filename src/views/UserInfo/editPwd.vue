<template>
  <div>
    <div class="boxPassword">修改密码</div>
    <div class="Passwordbox2">
      <el-form :model="Password" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码：" prop="oldPwd">
          <el-input type="password" v-model="Password.oldPwd" autocomplete="off" show-password style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPwd">
          <el-input type="password" v-model="Password.newPwd" autocomplete="off" show-password style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPwd">
          <el-input type="password" v-model="Password.confirmPwd" autocomplete="off" show-password style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { editUserPwd } from "../../api";
import { reactive, ref } from "vue";

const Password = reactive({
  oldPwd: "",
  newPwd: "",
  confirmPwd: "",
});

const ruleForm = ref(null);

const validateConfirmPwd = (rule, value, callback) => {
  if (value !== Password.newPwd) {
    callback(new Error("两次输入的密码不一致!"));
  } else {
    callback();
  }
};
const rules = {
  oldPwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
  newPwd: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6到20个字符", trigger: "blur" },
  ],
  confirmPwd: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    { validator: validateConfirmPwd, trigger: "blur" },
  ],
};

const submitForm = () => {
  ruleForm.value.validate((valid) => {
    if (valid) {
      editUserPwd(Password).then((Response) => {
        if (Response.status == 200) {
          ElMessage({
            message: Response.msg,
            type: "success",
          });
          ruleForm.value.resetFields();
        } else {
          console.log(Response);
          ElMessage.error(Response.msg);
        }
      });
    }
  });
};

const resetForm = () => {
  ruleForm.value.resetFields();
};
</script>

<style scoped>
.boxPassword {
  border-bottom: 1px solid #d7d6d6; /* //特别的颜色 */
  font-size: 15px;
  padding: 20.5px 15px;
}
.Passwordbox2 {
  margin: 1%;
}
</style>