<template>
  <div>
    <div class="Sub-head">
      <a>用户管理</a>
    </div>
    <div id="wrapper">
      <div class="tabletop" v-if="Keylocking">
        <el-select v-model="page.status" @change="SearchSection">
          <el-option label="所有" :value="null"> </el-option>
          <el-option label="启用" :value="1"> </el-option>
          <el-option label="禁用" :value="0"> </el-option>
        </el-select>
        <div class="input-group">
          <input type="text" placeholder="搜索" v-model="page.search" />
          <el-icon @click="SearchSection"><Search /></el-icon>
        </div>
      </div>
      <el-table :data="data.listData" style="width: 95%; margin: 0 auto" stripe>
        <el-table-column prop="index" label="序号" width="180">
          <template #default="scope">
            {{ scope.$index + 1 + (page.pageIndex - 1) * page.pageSize }}
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="nickName" label="昵称" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-text type="success" v-if="scope.row.status == 1">启用</el-text>
            <el-text type="warning" v-else-if="scope.row.status == 2">审核中</el-text>
            <el-text type="error" v-else>禁用</el-text>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <el-text v-if="scope.row.role == 1">律师</el-text>
            <el-text v-else-if="scope.row.role == 2">管理员</el-text>
            <el-text v-else>普通用户</el-text>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" @click="DetailShow(scope.row)">
              <el-icon><Edit /></el-icon>详情
            </el-button>
            <el-button type="danger" v-if="scope.row.status == 1" link @click="DeleteShow(scope.row.id)">
              <el-icon><Hide /></el-icon>禁用
            </el-button>
            <el-button type="success" v-else link @click="DeleteShow(scope.row.id)">
              <el-icon><View /></el-icon>启用
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
    <!-- 用户详情弹窗 -->
    <el-dialog title="用户详情" v-model="detailVisible" width="40%">
      <div class="user-detail-container">
        <div class="user-avatar">
          <img :src="userDetail.avatar" alt="用户头像" />
        </div>
        <div class="user-info">
          <div class="info-item">
            <el-icon><User /></el-icon>
            <span>{{ userDetail.userName }}</span>
            <el-tooltip content="用户的登录名" placement="right">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="info-item">
            <el-icon><Avatar /></el-icon>
            <span>{{ userDetail.nickName }}</span>
            <el-tooltip content="用户的昵称" placement="right">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="info-item">
            <el-icon><Message /></el-icon>
            <span>{{ userDetail.email }}</span>
            <el-tooltip content="用户的电子邮件地址" placement="right">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="info-item">
            <el-icon><Calendar /></el-icon>
            <span>{{ userDetail.briDate }}</span>
            <el-tooltip content="用户的出生日期" placement="right">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="info-item">
            <el-icon><Phone /></el-icon>
            <span>{{ userDetail.phone }}</span>
            <el-tooltip content="用户的手机号码" placement="right">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="info-item">
            <el-icon><Location /></el-icon>
            <span>{{ userDetail.loginCity }}</span>
            <el-tooltip content="用户最后登录的城市" placement="right">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="info-item">
            <el-icon><Clock /></el-icon>
            <span>{{ userDetail.lastLogin }}</span>
            <el-tooltip content="用户最后登录的时间" placement="right">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="info-item">
            <el-icon><Clock /></el-icon>
            <span>{{ userDetail.registerTime }}</span>
            <el-tooltip content="用户的注册时间" placement="right">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="info-item">
            <el-icon><SwitchButton /></el-icon>
            <span>
              <el-text type="success" v-if="userDetail.status == 1">启用</el-text>
              <el-text type="warning" v-else-if="userDetail.status == 2">审核中</el-text>
              <el-text type="error" v-else>禁用</el-text></span
            >
            <el-tooltip content="用户的账户状态" placement="right">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="info-item">
            <el-icon><UserFilled /></el-icon>
            <span v-if="userDetail.role == 1">律师</span>
            <span v-else-if="userDetail.role == 2">管理员</span>
            <span v-else>普通用户</span>
            <el-tooltip content="用户的角色" placement="right">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUserList, updateUserStatus } from "../../api";
const router = useRouter();
const ruleForm = ref(null);
const data = ref([]);
const editShow = ref(false);
const addShow = ref(false);
const page = reactive({
  pageIndex: 1,
  pageSize: 10,
  search: null,
  status: null,
  total: 0,
});

const Keylocking = ref(true);
const detailVisible = ref(false);
const userDetail = ref({});

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

const DeleteShow = (id) => {
  ElMessageBox.confirm("确定禁用或启用用户?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "修改成功!",
      });
      updateUserStatus(id).then((res) => {
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
const DetailShow = (row) => {
  userDetail.value = row;
  detailVisible.value = true;
};

const GetAll = async () => {
  getUserList(page).then((res) => {
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
