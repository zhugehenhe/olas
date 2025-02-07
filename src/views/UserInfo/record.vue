<template>
  <div>
    <el-table :data="data.listData" style="width: 100%">
      <el-table-column prop="consultationQuestions" show-overflow-tooltip label="咨询问题"></el-table-column>
      <el-table-column prop="lawyer.lawyerName" label="咨询人姓名" width="180"></el-table-column>
      <el-table-column label="回复状态" width="180">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.replyStatus)">
            {{ getStatusText(scope.row.replyStatus) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
      <el-table-column prop="userReviews" label="用户评价"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button type="primary" size="small" @click="toView(scope.row)">查看</el-button>
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
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { getConsultationByLawyer } from "../../api";
import router from "../../router";
const data = ref([]);

const page = reactive({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
});

const GetALL = async () => {
  getConsultationByLawyer(page).then((response) => {
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
const getStatusText = (status) => {
  switch (status) {
    case 0:
      return "未读";
    case undefined:
      return "未读";
    case 1:
      return "咨询中";
    case 2:
      return "咨询结束";
    default:
      return "未知状态";
  }
};

const toView = (row) => {
  router.push({ path: "/OLAS/Consulation/" + row.id });
};
const getStatusType = (status) => {
  switch (status) {
    case 0:
      return "info"; // 未读状态使用info类型
    case undefined:
      return "info"; // 未读状态使用info类型
    case 1:
      return "warning"; // 咨询中状态使用warning类型
    case 2:
      return "success"; // 咨询结束状态使用success类型
    default:
      return "danger"; // 未知状态使用danger类型
  }
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