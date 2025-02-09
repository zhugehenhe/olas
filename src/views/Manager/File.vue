<template>
  <div>
    <div class="Sub-head">
      <a>文件管理</a>
    </div>
    <div id="wrapper">
      <div class="tabletop">
        <el-button type="info">
          <el-upload v-loading="loading" :show-file-list="false" action="" :http-request="upload">
            <el-icon><Plus /></el-icon>新增文件
          </el-upload>
        </el-button>
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
        <el-table-column prop="fileName" label="文件名" width="230" show-overflow-tooltip />

        <el-table-column prop="user.userName" label="上传人" />
        <el-table-column prop="downLoadCount" label="下载次数"> </el-table-column>
        <el-table-column prop="uploadTime" label="上传时间" width="180"></el-table-column>
        <el-table-column prop="fileType" label="文件类别"></el-table-column>
        <el-table-column prop="sizeKb" label="文件大小(KB)" width="160"></el-table-column>
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button link type="primary" @click="DownLoadFile(scope.row.id)">
              <el-icon><Download /></el-icon>下载
            </el-button>
            <el-button link type="primary" @click="DetailShow(scope.row)">
              <el-icon><Edit /></el-icon>修改
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
    <!-- 修改文件名弹窗 -->
    <el-dialog title="修改文件名" v-model="editVisible" width="50%">
      <el-form :model="selectedFile" :rules="fileRules" ref="fileFormRef" label-width="100px">
        <el-form-item label="文件名" prop="fileName">
          <el-input v-model="selectedFile.fileName" placeholder="请输入新的文件名"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button type="primary" @click="submitFileName">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getFileList, deleteFile, uploadSysFile, updateFile, downFile } from "../../api";
import { useRoute } from "vue-router";
const route = useRoute();
const data = ref([]);
const loading = ref(false);
const editVisible = ref(false);
const page = reactive({
  pageIndex: 1,
  pageSize: 10,
  search: null,
  total: 0,
});

const selectedFile = reactive({
  fileName: "",
  id: "",
});
const fileFormRef = ref(null);
const fileRules = reactive({
  fileName: [{ required: true, message: "请输入文件名", trigger: "blur" }],
});
const DetailShow = (row) => {
  selectedFile.fileName = row.fileName;
  selectedFile.id = row.id;
  editVisible.value = true;
};

const submitFileName = () => {
  fileFormRef.value.validate((valid) => {
    if (valid) {
      updateFile(selectedFile).then((res) => {
        if (res.status === 200) {
          ElMessage({
            type: "success",
            message: "修改成功!",
          });
          editVisible.value = false;
          GetAll();
        } else {
          ElMessage.error("修改失败");
        }
      });
    } else {
      console.log("表单验证失败!");
      return false;
    }
  });
};

const DownLoadFile = (id) => {
  const a = document.createElement("a");
  a.href = "/api/File/DownFile?Id=" + id;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
const upload = async (file) => {
  loading.value = true;
  const formData = new FormData();
  formData.append("file", file.file);
  uploadSysFile(formData).then((res) => {
    if (res.status == 200) {
      loading.value = false;
      GetAll();
    } else if (res.status == 500) {
      loading.value = false;
      ElMessage.error(res.data);
    } else {
      loading.value = false;
      ElMessage.error("上传失败");
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
  ElMessageBox.confirm("此操作将删除该文件, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功!",
      });
      deleteFile(id).then((res) => {
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

const GetAll = async () => {
  getFileList(page).then((res) => {
    data.value = res.data;
    page.total = res.data.count;
  });
};

onMounted(() => {
  GetAll();
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
.el-dialog {
  border-radius: 8px;
}

.el-dialog__header {
  background-color: #f0f9eb;
  border-bottom: 1px solid #ebeef5;
  padding: 15px 20px;
}

.el-dialog__title {
  font-size: 18px;
  color: #333;
}

.el-dialog__footer {
  background-color: #f0f9eb;
  border-top: 1px solid #ebeef5;
  padding: 10px 20px;
  text-align: right;
}

.el-dialog__footer .el-button {
  margin-left: 10px;
}
</style>