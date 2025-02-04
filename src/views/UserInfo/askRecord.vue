<template>
  <div>
    <el-table :data="data.listData" style="width: 100%">
      <el-table-column prop="consultationQuestions" show-overflow-tooltip label="咨询问题"></el-table-column>
      <el-table-column prop="lawyer.lawyerName" label="律师姓名" width="180"></el-table-column>
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
          <el-button
            :disabled="!(scope.row.replyStatus === 2 && !scope.row.userReviews)"
            type="primary"
            size="small"
            @click="openReviewDialog(scope.row)"
          >
            评价
          </el-button>
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
    <!-- 评价对话框 -->
    <el-dialog title="评价咨询记录" v-model="reviewDialogVisible" width="30%">
      <el-form :model="reviewForm" label-width="80px">
        <el-form-item label="评价内容">
          <el-input type="textarea" v-model="reviewForm.userReviews" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="reviewDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitReview">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getConsultationByUser, reviews } from "../../api";
const data = ref([]);
const reviewDialogVisible = ref(false);
const reviewForm = reactive({
  userReviews: "",
  Id: null,
});

const page = reactive({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
});

const GetALL = async () => {
  getConsultationByUser(page).then((response) => {
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

const openReviewDialog = (row) => {
  reviewForm.userReviews = "";
  reviewForm.Id = row.id; //
  reviewDialogVisible.value = true;
};

const submitReview = async () => {
  try {
    await reviews(reviewForm).then((response) => {
      if (response.status == 200) {
        ElMessage({
          message: "评价成功",
          type: "success",
        });
      } else {
        ElMessage.error("评价失败");
      }
    });
    reviewDialogVisible.value = false;
    GetALL(); // 刷新数据
  } catch (error) {
    console.error("提交评价失败", error);
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