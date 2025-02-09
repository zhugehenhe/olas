<template>
  <div id="wrapper">
    <div class="tabletop">
      <div class="input-group">
        <input type="text" placeholder="搜索" v-model="page.search" />
        <el-icon @click="SearchSection"><Search /></el-icon>
      </div>
    </div>
    <el-table :data="data.listData" style="width: 100%" @row-click="handleRowClick" stripe>
      <el-table-column label="封面" width="120">
        <template #default="scope">
          <el-image style="width: 80px; height: 80px" :src="scope.row.img" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="user.nickName" label="发布人" width="150"></el-table-column>
      <el-table-column prop="createDate" label="发布时间" width="150"></el-table-column>
      <el-table-column label="点赞数/查看数" width="200">
        <template #default="scope">
          {{ scope.row.hits ? scope.row.hits : 0 }} /
          {{ scope.row.praiseLen ? scope.row.praiseLen : 0 }}
        </template>
      </el-table-column>
      <el-table-column prop="tag" label="板块" width="100"></el-table-column>
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
  search: null,
  total: 0,
});

const GetALL = async () => {
  page.id = sectionId;
  getArticleList(page).then((response) => {
    data.value = response.data;
    page.total = response.data.count;
  });
};
const SearchSection = () => {
  page.pageIndex = 1;
  GetALL();
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

const handleRowClick = (row) => {
  handleView(row.id);
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

#wrapper {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.tabletop {
  display: flex;
  justify-content: flex-end;
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

.el-table .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-table-column--selection .cell {
  padding: 0;
}

.el-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.el-image {
  border-radius: 4px;
}

.el-table-column--selection .cell {
  padding: 0;
}

.el-table__row:hover {
  background-color: #f0f9eb;
}

.el-table__header-wrapper {
  border-bottom: 1px solid #ebeef5;
}

.el-table__body-wrapper {
  border-top: 1px solid #ebeef5;
}

.el-table__body-wrapper tr:nth-child(even) {
  background-color: #fafafa;
}
</style>