<template>
  <div>
    <div class="Sub-head">
      <a>评论管理</a>
    </div>
    <div id="wrapper">
      <div class="tabletop">
        <div class="input-group">
          <input type="text" placeholder="搜索" v-model="page.search" />
          <el-icon @click="SearchSection"><Search /></el-icon>
        </div>
      </div>
      <el-table :data="data.listData" style="width: 95%; margin: 50px auto" stripe>
        <el-table-column prop="index" label="序号" width="80">
          <template #default="scope">
            {{ scope.$index + 1 + (page.pageIndex - 1) * page.pageSize }}
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" width="300" show-overflow-tooltip />

        <el-table-column prop="user.userName" label="发布人" />
        <el-table-column prop="createTime" label="发布时间" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="danger" link @click="DeleteShow(scope.row.id)">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCommentPage, deleteComment } from "../../api";
import { useRoute } from "vue-router";
const route = useRoute();
const data = ref([]);
const Sections = ref([]);
const SeclectId = ref("");
const subSections = ref({});
const page = reactive({
  pageIndex: 1,
  pageSize: 10,
  search: null,
  total: 0,
});
const dialogFormVisible = ref(false);
const selectedPost = ref({});
page.id = route.query.id;
const defaultProps = {
  children: "children",
  label: "sectionName",
};
const handleSizeChange = (newSize) => {
  page.pageSize = newSize;
  GetAll();
};

const handleCurrentChange = (newPage) => {
  page.pageIndex = newPage;
  GetAll();
};

const SelectChange = () => {
  subSections.value = Sections.value.find((item) => item.id == SeclectId.value);
};
const SearchSection = () => {
  page.pageIndex = 1;
  GetAll();
};

const DeleteShow = (id) => {
  ElMessageBox.confirm("此操作将删除该评论, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功!",
      });
      deleteComment(id).then((res) => {
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

const DetailShow = (post) => {
  selectedPost.value = post;
  dialogFormVisible.value = true;
};
const GetAll = async () => {
  getCommentPage(page).then((res) => {
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
</style>
