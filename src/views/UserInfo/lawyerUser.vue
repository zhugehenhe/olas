<template>
  <h2>律师信息</h2>
  <el-form :model="lawyerForm" label-width="200px" ref="lawyerFormRef" :rules="rules">
    <el-form-item label="封面图片" :disabled="disabled" prop="coverPhoto">
      <el-upload :disabled="disabled" v-loading="loading" :show-file-list="false" action="" :http-request="upload" :before-upload="beforeUploadImg">
        <el-image style="width: 100px; height: 100px" :src="lawyerForm.coverPhoto"></el-image>
      </el-upload>
    </el-form-item>
    <el-form-item label="律师姓名" prop="lawyerName">
      <el-input :disabled="disabled" v-model="lawyerForm.lawyerName"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-select :disabled="disabled" v-model="lawyerForm.gender" placeholder="请选择性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="联系电话" prop="phone">
      <el-input :disabled="disabled" v-model="lawyerForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input :disabled="disabled" v-model="lawyerForm.email"></el-input>
    </el-form-item>
    <el-form-item label="律师执业证书编号" prop="licenseNumber">
      <el-text>{{ lawyerForm.licenseNumber }}</el-text>
    </el-form-item>

    <el-form-item label="简介" prop="introduction">
      <el-input :disabled="disabled" type="textarea" v-model="lawyerForm.introduction"></el-input>
    </el-form-item>
    <el-form-item label="办公地址" prop="address">
      <el-input :disabled="disabled" v-model="lawyerForm.address"></el-input>
    </el-form-item>
    <el-form-item label="专业领域" prop="specialization">
      <el-tree-select
        ref="tree"
        accordion
        :props="defaultProps"
        v-model="selectSection"
        :data="sections"
        value-key="sectionName"
        multiple
        :render-after-expand="false"
        style="width: 400px"
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item>
      <el-button v-if="disabled" type="primary" @click="disabled = false">修改</el-button>
      <el-button v-if="!disabled" type="primary" @click="submitForm(lawyerFormRef)">确认修改</el-button>
      <el-button v-if="!disabled" @click="disabled = true">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { uploadFile, getLawyerInfoByUser, getSections, updateLawyerInfo } from "../../api";

const lawyerFormRef = ref(null);
const lawyerForm = reactive({
  id: "",
  lawyerName: "",
  gender: "",
  phone: "",
  licenseNumber: "",
  professionalExperience: null,
  coverPhoto: "",
  introduction: "",
  email: "",
  address: "",
  specialization: "",
});
const loading = ref(false);
const disabled = ref(true);
const sections = ref([]);
const tree = ref(null);
const selectSection = ref([]);
const defaultProps = {
  children: "children",
  label: "sectionName",
};

const rules = reactive({
  lawyerName: [{ required: true, message: "请输入律师姓名", trigger: "blur" }],
  licenseNumber: [{ required: true, message: "请输入律师执业证书编号", trigger: "blur" }],
  LicensureDate: [{ required: true, message: "请选择取得执业资格日期", trigger: "change" }],
  email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" },
  ],
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      updateLawyerInfo(lawyerForm).then((res) => {
        if (res.status == 200) {
          ElMessage.success("保存成功!");
          disabled.value = true;
        } else {
          ElMessage.error("修改失败!");
        }
      });
    } else {
      return false;
    }
  });
};
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
      lawyerForm.coverPhoto = res.data;
    } else if (res.status == 500) {
      loading.value = false;
      ElMessage.error(res.data);
    } else {
      loading.value = false;
      ElMessage.error("图片上传失败");
    }
  });
};
const handleChange = (key) => {
  lawyerForm.specialization = selectSection.value.join(",");
  console.log(lawyerForm.specialization);
};

const GetInfo = () => {
  getLawyerInfoByUser().then((res) => {
    lawyerForm.id = res.data.id;
    lawyerForm.lawyerName = res.data.lawyerName;
    lawyerForm.gender = res.data.gender;
    lawyerForm.phone = res.data.phone;
    lawyerForm.licenseNumber = res.data.licenseNumber;
    lawyerForm.professionalExperience = res.data.professionalExperience;
    lawyerForm.coverPhoto = res.data.coverPhoto;
    lawyerForm.introduction = res.data.introduction;
    lawyerForm.email = res.data.email;
    lawyerForm.address = res.data.address;
    lawyerForm.specialization = res.data.specialization;
    selectSection.value = res.data.specialization.split(",");
    console.log(selectSection.value);
  });
};
const GetSections = () => {
  getSections().then((res) => {
    sections.value = res.data;
  });
};
onMounted(() => {
  GetInfo();
  GetSections();
});
</script>

<style scoped>
.el-form {
  width: 600px;
  margin: 0 100px;
}
</style>