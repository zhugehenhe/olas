<template>
  <div>
    <div class="Sub-head">
      <a>法律资讯管理</a>
    </div>
    <div id="wrapper">
      <div class="tabletop">
        <el-button type="info" @click="AddShow">
          <el-icon><Plus /></el-icon>新增资讯
        </el-button>
        <el-tree-select
          ref="tree"
          accordion
          :props="defaultProps"
          v-model="page.id"
          :data="Sections"
          value-key="id"
          :render-after-expand="false"
          style="width: 200px; margin-left: 10px"
          @change="SearchSection"
        />
        <div class="input-group">
          <input type="text" placeholder="搜索" v-model="page.search" />
          <el-icon @click="SearchSection"><Search /></el-icon>
        </div>
      </div>
      <el-table :data="data.listData" style="width: 95%; margin: 0 auto" stripe>
        <el-table-column prop="index" label="序号" width="80">
          <template #default="scope">
            {{ scope.$index + 1 + (page.pageIndex - 1) * page.pageSize }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="300" show-overflow-tooltip />
        <el-table-column prop="tag" label="板块" />
        <el-table-column prop="user.userName" label="发布人" />
        <el-table-column prop="hits" label="查看数"> </el-table-column>
        <el-table-column prop="praiseLen" label="点赞数"></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button link type="primary" @click="DetailShow(scope.row)">
              <el-icon><Reading /></el-icon>详情
            </el-button>
            <el-button link type="danger" @click="DeleteShow(scope.row.id)">
              <el-icon><Delete /></el-icon>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageIndex"
        :page-size="page.pageSize"
        layout="total,  prev, pager, next, jumper"
        :total="page.total"
        class="pagination-center"
      ></el-pagination>
    </div>
    <!-- 详情页 -->
    <el-dialog v-model="dialogFormVisible" title="文章详情" width="60%">
      <div class="post-detail">
        <h3>{{ selectedPost.title }}</h3>
        <div class="post-info">
          <p>
            <el-icon><Folder /></el-icon> 板块: {{ selectedPost.tag }}
          </p>
          <p>
            <el-icon><User /></el-icon> 发布人: {{ selectedPost.user.userName }}
          </p>
          <p>
            <el-icon><View /></el-icon> 查看数: {{ selectedPost.hits }}
          </p>
          <p>
            <el-icon><Star /></el-icon> 点赞数: {{ selectedPost.praiseLen }}
          </p>
          <p>
            <el-icon><Link /></el-icon> 来源处: {{ selectedPost.source }}
          </p>
          <p>
            <el-icon><Link /></el-icon> 来源地址:
            <a :href="selectedPost.url" target="_blank">{{ selectedPost.url }}</a>
          </p>
        </div>
        <div class="post-cover">
          <h4>封面:</h4>
          <el-image style="width: 300px; height: 200px" :src="selectedPost.img" fit="cover"></el-image>
        </div>
        <div class="post-content">
          <h4>内容:</h4>
          <p>{{ selectedPost.content }}</p>
        </div>
      </div>
    </el-dialog>
    <!-- 添加页 -->
    <el-dialog v-model="addDialogVisible" title="新增文章" width="80%">
      <el-form :model="newArticle" :rules="rules" ref="articleForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="newArticle.title"></el-input>
        </el-form-item>
        <el-form-item label="板块" prop="section">
          <el-tree-select
            ref="tree"
            accordion
            :props="defaultProps"
            v-model="newArticle.section"
            :data="Sections"
            value-key="id"
            :render-after-expand="false"
            style="width: 240px"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="封面" prop="img">
          <el-upload v-loading="loading" :show-file-list="false" action="" :http-request="upload" :before-upload="beforeUploadImg">
            <el-image style="width: 100px" v-if="newArticle.img" :src="newArticle.img" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <el-input v-model="newArticle.source" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="来源地址" prop="url">
          <el-input v-model="newArticle.url" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <div style="display: block; width: 800px; height: 200px; margin: 0 auto 10px">
            <QuillEditor class="demo-dynamic" ref="myQuillEditor" :options="editorOption" v-model="newArticle.content"> </QuillEditor>
          </div>
          <el-upload class="avatar-uploader-img" :show-file-list="false" action="" :http-request="uploadimg" :before-upload="beforeUploadImg" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('articleForm')">确 定</el-button>
        </span>
      </template>
    </el-dialog>
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
import { ref, onMounted } from "vue";
import { getArticleList, deleteArticle, getSections, addArticle, uploadFile } from "../../api";
import { useRoute } from "vue-router";
const route = useRoute();
const data = ref([]);
const loading = ref(false);
const Sections = ref([]);
const page = reactive({
  pageIndex: 1,
  pageSize: 10,
  search: null,
  total: 0,
});
const dialogFormVisible = ref(false);
const selectedPost = ref({});
page.id = route.query.id;
const tree = ref(null);
const defaultProps = {
  children: "children",
  label: "sectionName",
};
const addDialogVisible = ref(false);
const newArticle = ref({
  section: "",
  url: "",
  title: "",
  tag: "",
  img: "",
  content: "",
  source: "",
});
const rules = ref({
  section: [{ required: true, message: "请选择板块", trigger: "change" }],
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  img: [{ required: true, message: "请上传封面图片", trigger: "change" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
});
const articleForm = ref(null);
const myQuillEditor = ref(null);
const options = [["bold", "italic", "underline", "strike"], [{ color: [] }, { background: [] }], ["image"]];

const upurl = ref("");
const indexlength = ref("");
const showbox = ref(false);

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

const AddShow = () => {
  addDialogVisible.value = true;
};

const submitForm = () => {
  const quill = myQuillEditor.value.getQuill();
  const content = quill.root.innerHTML;
  newArticle.value.content = content;
  articleForm.value.validate((valid) => {
    if (valid) {
      console.log("提交表单数据:", newArticle.value);
      addArticle(newArticle.value).then((res) => {
        if (res.status === 200) {
          ElMessage({
            type: "success",
            message: "新增成功!",
          });
          addDialogVisible.value = false;
          GetAll();
        } else {
          ElMessage.error("新增失败");
        }
      });
    } else {
      console.log("表单验证失败!");
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
      newArticle.value.img = res.data;
    } else if (res.status == 500) {
      loading.value = false;
      ElMessage.error(res.data);
    } else {
      loading.value = false;
      ElMessage.error("图片上传失败");
    }
  });
};
const handleSizeChange = (newSize) => {
  page.pageSize = newSize;
  GetAll();
};

const handleCurrentChange = (newPage) => {
  page.pageIndex = newPage;
  GetAll();
};

const handleChange = (key) => {
  const node = tree.value.getNode(key);
  newArticle.value.tag = node.data.sectionName;
};
const SearchSection = () => {
  page.pageIndex = 1;
  GetAll();
};

const DeleteShow = (id) => {
  ElMessageBox.confirm("此操作将删除该文章, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功!",
      });
      deleteArticle(id).then((res) => {
        if (res.status == 200) {
          GetAll();
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};
const dialogFormVisibleShow = () => {
  const quill = myQuillEditor.value.getQuill();
  indexlength.value = quill.getSelection().index;
  upurl.value = "";
  showbox.value = true;
};

const uploadimage = () => {
  document.querySelector(".avatar-uploader-img input").click();
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

const uploadimg = async (file) => {
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
const GetSection = () => {
  getSections().then((res) => {
    Sections.value = res.data;
  });
};
const DetailShow = (post) => {
  selectedPost.value = post;
  dialogFormVisible.value = true;
};
const GetAll = async () => {
  getArticleList(page).then((res) => {
    data.value = res.data;
    page.total = res.data.count;
  });
};

onMounted(() => {
  GetAll();
  GetSection();
});
</script>

<style scoped>
.pagination-center {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.el-select {
  height: 30px;
}
.post-detail {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.post-detail {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.post-detail h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.post-info {
  margin-bottom: 20px;
}

.post-info p {
  font-size: 16px;
  color: #555;
  margin-bottom: 5px;
}

.post-info p .el-icon {
  margin-right: 5px;
}

.post-cover {
  margin-bottom: 20px;
}

.post-cover h4 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.post-cover .el-image {
  border: 1px solid #ddd;
  border-radius: 8px;
}

.post-content h4 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.post-content p {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}
.SendEidtbox {
  width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 9999;
}
</style>