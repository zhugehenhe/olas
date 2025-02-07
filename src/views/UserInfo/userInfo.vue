<script setup>
import { ref, reactive, onMounted } from "vue";
import { getUserInfo, uploadFile, getProvinceChild, editUserInfo } from "../../api";

const loading = ref(false);
const disabled = ref(true);
const tree = ref(null);
const form = ref(null);
const provinces = ref([]);
const user = reactive({
  userName: "",
  nickName: "",
  email: "",
  phone: "",
  address: "",
  briDate: "",
  gender: "",
  avatar: "",
});
const defaultProps = {
  children: "children",
  label: "shortName",
};

// 定义验证规则
const rules = reactive({
  email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" },
  ],
});

const beforeUploadImg = (file) => {
  const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";
  if (!isJPG) {
    ElMessage.error("上传图片只能是 JPG, PNG, GIF 格式!");
  }
  return isJPG;
};

const upload = async (file) => {
  loading.value = true;
  const formData = new FormData();
  formData.append("file", file.file);
  uploadFile(formData).then((res) => {
    if (res.status == 200) {
      loading.value = false;
      user.avatar = res.data;
    } else if (res.status == 500) {
      loading.value = false;
      ElMessage.error(res.data);
    } else {
      loading.value = false;
      ElMessage.error("图片上传失败");
    }
  });
};

onMounted(() => {
  getUserInfo().then((res) => {
    user.userName = res.data.userName;
    user.nickName = res.data.nickName;
    user.email = res.data.email;
    user.phone = res.data.phone;
    user.address = res.data.address;
    user.briDate = res.data.briDate;
    user.gender = res.data.gender;
    user.avatar = res.data.avatar;
  });
  getProvinceChild().then((res) => {
    provinces.value = res.data;
    console.log(res.data);
  });
});

const handleChange = (key) => {
  const node = tree.value.getNode(key);
  user.address = node.parent.data.shortName + "/" + node.data.shortName;
};

const submitForm = () => {
  form.value.validate((valid) => {
    if (valid) {
      editUserInfo(user).then((res) => {
        if (res.status == 200) {
          ElMessage.success("修改成功!");
          disabled.value = true;
        } else {
          ElMessage.error("修改失败!");
        }
      });
    }
  });
};
</script>

<template>
  <div>
    <h2>个人信息</h2>
    <el-form :model="user" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="头像">
        <el-upload
          :disabled="disabled"
          v-loading="loading"
          :show-file-list="false"
          action=""
          :http-request="upload"
          :before-upload="beforeUploadImg"
        >
          <el-avatar v-if="user.avatar" :size="100" :src="user.avatar"></el-avatar>
        </el-upload>
      </el-form-item>
      <el-form-item label="账号名">
        <el-text>{{ user.userName }}</el-text>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input :disabled="disabled" v-model="user.nickName" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input :disabled="disabled" v-model="user.email" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input :disabled="disabled" v-model="user.phone" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-tree-select
          ref="tree"
          :disabled="disabled"
          accordion
          :props="defaultProps"
          v-model="user.address"
          :data="provinces"
          value-key="shortName"
          :render-after-expand="false"
          style="width: 240px"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="出生日期" prop="briDate">
        <el-date-picker :disabled="disabled" v-model="user.briDate" type="date" />
      </el-form-item>
      <el-form-item>
        <el-button v-if="disabled" type="primary" @click="disabled = false">修改</el-button>
        <el-button v-if="!disabled" type="primary" @click="submitForm">确认修改</el-button>
        <el-button v-if="!disabled" @click="disabled = true">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.el-form {
  width: 500px;
  margin: 0 auto;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>