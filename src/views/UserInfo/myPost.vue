<template>
  <div>
    <el-table :data="data.listData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
      <el-table-column label="评论/点赞/点击" width="200">
        <template #default="scope">
          {{ scope.row.commentCount }} / {{ scope.row.hitCount }} / {{ scope.row.praiseLen }}
        </template>
      </el-table-column>
      <el-table-column prop="section.sectionName" label="板块" width="100"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleView(scope.row.id)">查看</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      class="pagination-center"
    ></el-pagination>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { getPostListByUserId, deletePost } from "../../api"; // 添加 deletePost 引入
import router from "../../router";

const data = ref([]);

const page = reactive({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
});

const GetALL = async () => {
  getPostListByUserId(page).then((response) => {
    data.value = response.data;
    page.total = response.data.count;
  });
};

const handleSizeChange = (newSize) => {
  page.pageSize = newSize;
  GetALL();
};

const handleCurrentChange = (newPage) => {
  page.pageIndex = newPage;
  GetALL();
};
const handleView = (id) => {
  router.push({ path: "/OLAS/Post", query: { id: id } });
};
const handleDelete = (id) => {
  ElMessageBox.confirm("确定要删除该帖子吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deletePost(id)
        .then(() => {
          ElMessage.success("删除成功!");
          GetALL();
        })
        .catch(() => {
          ElMessage.error("删除失败!");
        });
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    });
};

onMounted(() => {
  GetALL();
});
</script>

<style scoped>
.pagination-center {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>