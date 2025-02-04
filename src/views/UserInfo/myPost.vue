<template>
  <div>
    <el-table :data="data.listData" style="width: 100%">
      <el-table-column label="封面" width="120">
        <template #default="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.imageUrl || '/default-image.png'" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
      <el-table-column label="评论/点赞/点击" width="200">
        <template #default="scope"> {{ scope.row.commentCount }} / {{ scope.row.hitCount }} / {{ scope.row.praiseLen }} </template>
      </el-table-column>
      <el-table-column prop="section.sectionName" label="板块" width="100"></el-table-column>
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
import { getPostListByUserId } from "../../api";
import { useRouter } from "vue-router";

const router = useRouter();

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