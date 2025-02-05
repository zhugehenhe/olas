<template>
  <div>
    <el-table :data="data.listData" style="width: 100%">
      <el-table-column label="封面" width="120">
        <template #default="scope">
          <el-image style="width: 80px; height: 80px" :src="scope.row.img" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="user.userName" label="发布人" width="150"></el-table-column>
      <el-table-column prop="createDate" label="发布时间" width="150"></el-table-column>
      <el-table-column label="评论/点赞/点击" width="200">
        <template #default="scope">
          {{ scope.row.commentCount ? scope.row.commentCount : 0 }} /
          {{ scope.row.hitCount ? scope.row.hitCount : 0 }} /
          {{ scope.row.praiseLen ? scope.row.praiseLen : 0 }}
        </template>
      </el-table-column>
      <el-table-column prop="tag" label="板块" width="100"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleView(scope.row.id)">查看</el-button>
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
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { getArticleList } from "../../api"; // 添加 deletePost 引入
import router from "../../router";

const data = ref([]);
const route = useRoute();
const sectionId = route.query.id;

const page = reactive({
  id: "",
  pageIndex: 1,
  pageSize: 10,
  total: 0,
});

const GetALL = async () => {
  page.id = sectionId;
  getArticleList(page).then((response) => {
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
  router.push({ path: "/OLAS/Article", query: { id: id } });
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