<template>
  <div>
    <div
      class="DetailNewsbox"
      v-infinite-scroll="loadData"
      :infinite-scroll-distance="100"
      :infinite-scroll-delay="1000"
      :infinite-scroll-disabled="disabled"
      style="overflow: auto"
    >
      <div class="DetailNews" v-for="d in data" :key="d.id">
        <template v-if="d.sysUser.id !== uid">
          <div class="leftbox">
            <img :src="d.sysUser.avatar" />
          </div>
          <div class="rightbox">
            <div class="upbox">
              <a>{{ d.sysUser.userName }}</a> <a>{{ d.sendTime }}</a>
            </div>
            <div class="downbox" style="text-align: left" v-html="d.content"></div>
          </div>
        </template>
        <template v-else>
          <div class="rightboxone">
            <div class="upbox">
              <a>{{ d.sendTime }}</a>
              <a @click="toUser(d.sysUser.id)" style="color: blue">{{ d.sysUser.userName }}</a>
            </div>
            <div class="downbox" v-html="d.content"></div>
          </div>
          <div class="leftboxone">
            <img :src="d.sysUser.avatar" />
          </div>
        </template>
      </div>
    </div>
    <div class="Divisionline"></div>
    <el-form
      :model="sendMsg"
      :rules="rules"
      label-width="10px"
      ref="ruleForm"
      class="demo-dynamic"
      v-if="info.replyStatus === undefined || info.replyStatus === 1"
    >
      <el-form-item prop="Content">
        <div style="display: block; width: 800px; height: 100%; margin: 0 auto 30px">
          <QuillEditor class="demo-dynamic" ref="myQuillEditor" :options="editorOption" v-model="sendMsg.Content"> </QuillEditor>
        </div>
        <el-upload class="avatar-uploader-img" :show-file-list="false" action="" :http-request="upload" :before-upload="beforeUploadImg" />
      </el-form-item>
      <el-form-item style="width: 600px; margin: 50px auto 30px">
        <el-button type="success" @click="endConsultation">结束咨询</el-button>
        <el-button type="primary" style="margin-left: 350px" @click="submitForm()">发送</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <button v-show="false" id="disShow" @click="dialogFormVisibleShow"></button>
    <div>
      <el-form v-show="showbox" class="SendEidtbox">
        <el-form-item label="本地上传" label-width="100px">
          <el-button @click="uploadimage">上传图片</el-button>
        </el-form-item>
        <el-form-item label="图床上传" label-width="100px">
          <el-input v-model="upurl"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="uploadurl(upurl, indexlength)">确定</el-button>
          <el-button @click="showbox = false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";
import { getConsultationInfoList, sendConsultation, readConsultation, finishConsultation, getConsultationById } from "../../api";
import router from "../../router/index";
import { useRoute } from "vue-router";
import { userStore } from "../../store";
const user = userStore();
const route = useRoute();
var uid = "";

const page = reactive({
  pageIndex: 1,
  pageSize: 15,
  id: "",
});
page.id = route.params.id;

const data = ref([]);
const info = ref([]);
const sendMsg = reactive({
  cid: "",
  Content: "",
});

const ruleForm = ref(null);
const myQuillEditor = ref(null);
const options = [["bold", "italic", "underline", "strike"], [{ color: [] }, { background: [] }], ["image"]];

const upurl = ref("");
const indexlength = ref("");
const showbox = ref(false);
const rules = reactive({
  Content: [{ required: true, message: "请输入内容", trigger: "blur" }],
});

const editorOption = reactive({
  theme: "snow",
  placeholder: "请输入内容.....",
  modules: {
    toolbar: {
      container: options,
      handlers: {
        image: function (value) {
          if (value) {
            document.querySelector("#disShow").click();
          } else {
            this.quill.format("image", false);
          }
        },
      },
    },
  },
});

const GetAll = async () => {
  getConsultationInfoList(page).then((res) => {
    if (res.data.listData.length == 0) {
      noMore.value = true;
    }
    if (res.data.listData.length == 15) {
      noMore.value = false;
    }
    if (page.pageIndex == 1) {
      data.value = res.data.listData;
    } else {
      data.value = data.value.concat(res.data.listData);
    }
  });
};

const GetConBuyId = () => {
  getConsultationById(page.id).then((res) => {
    info.value = res.data;
    if (res.data.userId != uid) {
      readConsultation(page.id);
    }
  });
};
const noMore = ref(true);
const disabled = computed(() => noMore.value);
const loadData = async () => {
  if (data.value.length % 15 == 0) {
    page.pageIndex += 1;
    await GetAll();
  }
};
const endConsultation = () => {
  ElMessageBox.confirm("确定要结束咨询吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      finishConsultation(page.id).then((res) => {
        if (res.status == 200) {
          ElMessage({
            message: "结束咨询成功",
            type: "success",
          });
        } else {
          ElMessage.error("结束咨询失败");
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消结束咨询",
      });
    });
};
const submitForm = async (formName) => {
  sendMsg.cid = page.id;
  const quill = myQuillEditor.value.getQuill();
  const content = quill.root.innerHTML;
  sendMsg.Content = content;
  await ruleForm.value.validate((valid) => {
    if (valid) {
      sendConsultation(sendMsg).then((res) => {
        if (res.data) {
          ElMessage({
            message: "发送成功",
            type: "success",
          });
          sendMsg.Content = "";
          quill.root.innerHTML = "";
          GetAll();
        } else {
          ElMessage.error("发送失败");
        }
      });
    } else {
      return false;
    }
  });
};

const dialogFormVisibleShow = () => {
  const quill = myQuillEditor.value.getQuill();
  console.log(quill);
  indexlength.value = quill.getSelection().index;
  upurl.value = "";
  showbox.value = true;
};

const uploadimage = () => {
  document.querySelector(".avatar-uploader-img input").click();
};

const beforeUploadImg = (file) => {
  const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";
  if (!isJPG) {
    ElMessage.error("上传图片只能是 JPG, PNG, GIF 格式!");
  } else {
  }
  return isJPG;
};

const uploadurl = (url, indexlength) => {
  const quill = myQuillEditor.value.getQuill();
  try {
    quill.insertEmbed(indexlength, "image", url);
    const images = quill.root.querySelectorAll(".ql-editor img");
    images.forEach((img) => {
      img.style.maxWidth = "400px";
      img.style.height = "auto";
    });
    showbox.value = false;
    quill.setSelection(indexlength + 1);
  } catch {
    uploadImgError();
  }
};

const uploadImgSuccess = (res, file) => {
  const quill = myQuillEditor.value.getQuill();
  if (res.status == "200" && res.data.data.links.url != null) {
    const length = quill.getSelection().index;
    quill.insertEmbed(length, "image", res.data.data.links.url);
    const images = quill.root.querySelectorAll(".ql-editor img");
    images.forEach((img) => {
      img.style.maxWidth = "200px";
      img.style.height = "auto";
    });
    quill.setSelection(length + 1);
  } else {
    ElMessage.error("图片插入失败");
  }
};

const upload = async (file) => {
  const formData = new FormData();
  formData.append("file", file.file);
  console.log(formData);
  await axios
    .post(
      "https://pro.helloimg.com/api/v1/upload",
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer 81|wbu2wloCplxdajMs7oGzlf9I9OE9bRXsIJdVXlk9",
        },
      },
      { timeout: 150000 }
    )
    .then((res) => {
      uploadImgSuccess(res);
      showbox.value = false;
    })
    .catch((error) => {
      console.log(error);
      uploadImgError();
    });
};

const uploadImgError = () => {
  ElMessage.error("图片插入失败");
};

const resetForm = () => {
  sendMsg.Content = "";
  quill.root.innerHTML = "";
};
let intervalId = null;
onMounted(() => {
  uid = JSON.parse(localStorage.getItem("userInfo")).id;
  GetAll();
  GetConBuyId();
  intervalId = setInterval(GetAll, 5000); // 每5秒调用一次 GetAll
});
onUnmounted(() => {
  clearInterval(intervalId); // 清除定时器
});
</script>

<style scoped>
.DetailNewsbox {
  width: 1000px;
  height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 1% auto;
  background: #f8f8f8;
  border: 2px solid rgba(255, 255, 255, 0.8);
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.DetailNews {
  width: 100%;
  margin: 10px 0;
  display: flex;
  align-items: flex-start;
}

/* 非登录账号的排版 */
.DetailNews .leftbox {
  flex: 5%;
  margin-right: 10px;
}

.DetailNews .leftbox img {
  width: 50px;
  height: 50px;
  padding: 4px;
  margin: 5px;
  border: 3px solid rgb(255, 255, 255);
  border-radius: 50%;
  background: #d0d0d0c4;
}

.DetailNews .rightbox {
  flex: 90%;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-all;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.DetailNews .rightbox .upbox {
  height: 20px;
  font-size: 12px;
  padding: 3px;
  color: #555;
}

.DetailNews .rightbox .downbox {
  max-width: 600px;
  position: relative;
  display: inline-block;
  padding: 10px 13px;
  min-height: 22px;
  background: #fff;
  border-radius: 8px;
  line-height: 25px;
  font-size: 14px;
  color: #111;
  box-sizing: border-box;
  text-align: left;
  margin-top: 5px;
}

/* 自己账号的排版 */
.DetailNews .leftboxone {
  flex: 10%;
  margin-left: 10px;
}

.DetailNews .leftboxone img {
  width: 50px;
  height: 50px;
  padding: 4px;
  margin: 5px;
  border: 3px solid rgb(255, 255, 255);
  border-radius: 50%;
  background: #d0d0d0c4;
}

.DetailNews .rightboxone {
  flex: 85%;
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: flex-end;
}

.DetailNews .rightboxone .upbox {
  height: 20px;
  font-size: 12px;
  padding: 3px;
  text-align: right;
  color: #555;
}

.DetailNews .rightboxone .downbox {
  max-width: 600px;
  position: relative;
  display: inline-block;
  padding: 10px 13px;
  min-height: 22px;
  background: #e0f7fa;
  border-radius: 8px;
  line-height: 25px;
  font-size: 14px;
  color: #111;
  box-sizing: border-box;
  text-align: right;
  margin-top: 5px;
}

.DetailNews:hover {
  background: #cccccc65;
}

.Divisionline {
  border-top: 1px dashed #7e7f7f;
  padding: 10px 0;
  margin: 20px 0;
}

.SendEidtbox {
  width: 500px;
  height: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  transition: background-color 0.3s, color 0.3s;
}

.el-button:hover {
  background-color: #409eff;
  color: white;
}
</style>