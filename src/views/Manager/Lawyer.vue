<template>
  <div>
    <div class="Sub-head">
      <a>律师审核管理</a>
    </div>
    <div id="wrapper">
      <div class="tabletop" v-if="Keylocking">
        <el-select v-model="page.status" @change="SearchSection">
          <el-option label="所有" :value="0"> </el-option>
          <el-option label="审核中" :value="1"> </el-option>
          <el-option label="审核通过" :value="2"> </el-option>
          <el-option label="驳回" :value="3"> </el-option>
        </el-select>
      </div>
      <el-table :data="data.listData" style="width: 95%; margin: 0 auto" stripe>
        <el-table-column prop="index" label="序号" width="150">
          <template #default="scope">
            {{ scope.$index + 1 + (page.pageIndex - 1) * page.pageSize }}
          </template>
        </el-table-column>
        <el-table-column prop="lawyerName" label="用户名" />
        <el-table-column prop="licenseNumber" label="律师执照号" width="200" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-text type="warning" v-if="scope.row.examineState == undefined">审核中</el-text>
            <el-text type="success" v-if="scope.row.examineState == 1">审核通过</el-text>
            <el-text type="danger" v-if="scope.row.examineState == 2">驳回</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间" width="200"> </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button link type="primary" v-if="scope.row.examineState == undefined" @click="Approve(scope.row.id)">
              <el-icon><Edit /></el-icon>审核
            </el-button>
            <el-button type="danger" v-if="scope.row.examineState == undefined" link @click="Reject(scope.row.id)">
              <el-icon><Close /></el-icon>驳回
            </el-button>
            <el-button type="success" v-if="scope.row.examineState == 1" link>
              <el-icon><Hide /></el-icon>已审核
            </el-button>
            <el-button type="danger" v-if="scope.row.examineState == 2" link>
              <el-icon><Hide /></el-icon>已驳回
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
import { getLawyerUser, approve, refuse } from "../../api";
const data = ref([]);
const page = reactive({
  pageIndex: 1,
  pageSize: 10,
  search: null,
  status: 0,
  total: 0,
});

const Keylocking = ref(true);
const RefuseMsg = reactive({
  id: null,
  reason: null,
});

const handleSizeChange = (newSize) => {
  page.pageSize = newSize;
  GetAll();
};

const handleCurrentChange = (newPage) => {
  page.pageIndex = newPage;
  GetAll();
};
const SearchSection = () => {
  page.pageIndex = 1;
  GetAll();
};

const Approve = (id) => {
  ElMessageBox.confirm("确定批准该律师?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "修改成功!",
      });
      approve(id).then((res) => {
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
const Reject = (id) => {
  ElMessageBox.prompt("请输入驳回原因:", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputPattern: /.+/,
    inputErrorMessage: "原因不能为空",
  })
    .then(({ value }) => {
      RefuseMsg.id = id;
      RefuseMsg.reason = value;
      refuse(RefuseMsg).then((res) => {
        if (res.status == 200) {
          ElMessage({
            type: "success",
            message: "驳回成功!",
          });
          GetAll();
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消驳回",
      });
    });
};
const GetAll = async () => {
  getLawyerUser(page).then((res) => {
    data.value = res.data;
    page.total = res.data.count;
  });
};

onMounted(() => {
  GetAll();
});
</script>

<style scoped>
@import "./Css/top2.css";
.pagination-center {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.el-select {
  height: 30px;
}
.user-detail-container {
  display: flex;
  align-items: flex-start;
}

.user-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.info-item .el-icon {
  margin-right: 10px;
}

.info-item .el-tooltip {
  margin-left: 5px;
}
</style>
