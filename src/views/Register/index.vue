<template>
  <div class="register">
    <div class="register-container">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="注册普通用户" name="user">
          <el-form :model="userForm" :rules="userRules" ref="userFormRef" label-width="100px">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input v-model="userForm.code" maxlength="6" placeholder="请输入六位验证码">
                <template #append>
                  <a style="cursor: pointer" :disabled="isSending" @click="sendUserCode">{{ isSending ? `${countdown}秒后重发` : "获取验证码" }}</a>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="userForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitUserForm">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册律师" name="lawyer">
          <el-form :model="lawyerForm" :rules="lawyerRules" ref="lawyerFormRef" label-width="100px">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="lawyerForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input v-model="lawyerForm.code" maxlength="6" placeholder="请输入六位验证码">
                <template #append>
                  <a style="cursor: pointer" :disabled="isSending" @click="sendLawyerCode">{{ isSending ? `${countdown}秒后重发` : "获取验证码" }}</a>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="lawyerForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="律师编号" prop="number">
              <el-input v-model="lawyerForm.number" placeholder="请输入律师编号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="lawyerForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitLawyerForm">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="login-link">
        <el-button type="text" @click="toLogin">返回登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { registerLawyer, registerUser, getPhoneCode } from "../../api";
import router from "../../router";

const activeTab = ref("user");

// 普通用户表单
const userForm = reactive({
  phone: "",
  code: "",
  password: "",
});

const userRules = reactive({
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入有效的手机号", trigger: "blur" },
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { min: 4, max: 6, message: "验证码长度为6位", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度为6到20位", trigger: "blur" },
  ],
});

const userFormRef = ref(null);

// 律师表单
const lawyerForm = reactive({
  phone: "",
  code: "",
  name: "",
  number: "",
  password: "",
});

const lawyerRules = reactive({
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入有效的手机号", trigger: "blur" },
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { min: 4, max: 6, message: "验证码长度为6位", trigger: "blur" },
  ],
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  number: [{ required: true, message: "请输入律师编号", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度为6到20位", trigger: "blur" },
  ],
});

const lawyerFormRef = ref(null);

// 验证码相关
const isSending = ref(false);
const countdown = ref(60);

const sendUserCode = () => {
  if (isSending.value) return;

  if (userForm.phone === "") {
    ElMessage({ type: "error", message: "请输入手机号" });
    return;
  }
  getPhoneCode(userForm.phone).then((res) => {
    if (res.code === 200) {
      ElMessage.success("验证码已发送");
    }
  });

  isSending.value = true;
  let timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timer);
      isSending.value = false;
      countdown.value = 60;
    }
  }, 1000);
};

const sendLawyerCode = () => {
  if (isSending.value) return;

  if (lawyerForm.phone === "") {
    ElMessage({ type: "error", message: "请输入手机号" });
    return;
  }
  getPhoneCode(lawyerForm.phone).then((res) => {
    if (res.code === 200) {
      ElMessage.success("验证码已发送");
    }
  });

  isSending.value = true;
  let timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timer);
      isSending.value = false;
      countdown.value = 60;
    }
  }, 1000);
};

// 提交普通用户表单
const submitUserForm = () => {
  userFormRef.value.validate((valid) => {
    if (valid) {
      registerUser(userForm).then((res) => {
        if (res.status == 200) {
          ElMessage.success(res.msg);
        } else {
          ElMessage.error(res.msg);
        }
      });
    } else {
      return false;
    }
  });
};

// 提交律师表单
const submitLawyerForm = () => {
  lawyerFormRef.value.validate((valid) => {
    if (valid) {
      registerLawyer(lawyerForm).then((res) => {
        if (res.status == 200) {
          ElMessage.success(res.msg);
        } else {
          ElMessage.error(res.msg);
        }
      });
    } else {
      console.log("律师注册表单验证失败");
      return false;
    }
  });
};

const toLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
.register {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to bottom, #fff1eb, #ace0f9);
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-container {
  width: 400px;
  padding: 30px;
  background: white;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
}

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link .el-button {
  width: auto;
  color: #409eff;
  font-size: 14px;
}
</style>