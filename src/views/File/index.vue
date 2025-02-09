<template>
  <div>
    <div id="wrapper">
      <div class="tabletop">
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
        <el-table-column prop="downLoadCount" label="下载次数"> </el-table-column>
        <el-table-column prop="uploadTime" label="上传时间" width="180"></el-table-column>
        <el-table-column prop="fileType" label="文件类别"></el-table-column>
        <el-table-column prop="sizeKb" label="文件大小(KB)" width="160"></el-table-column>
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button link type="primary" @click="DownLoadFile(scope.row.id)">
              <el-icon><Download /></el-icon>下载
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getFileList, downFile } from "../../api";
import { useRoute } from "vue-router";
const route = useRoute();
const data = ref([]);
const page = reactive({
  pageIndex: 1,
  pageSize: 10,
  search: null,
  total: 0,
});

const DownLoadFile = (id) => {
  const a = document.createElement("a");
  a.href = "/api/File/DownFile?Id=" + id;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
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

#wrapper {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.tabletop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  align-items: center;
}

.input-group input {
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  margin-right: 10px;
}

.el-button {
  margin-right: 10px;
}

.el-table {
  border-radius: 4px;
  overflow: hidden;
}

.el-table th,
.el-table td {
  padding: 12px;
}

.el-table th {
  background-color: #f5f7fa;
}

.el-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>