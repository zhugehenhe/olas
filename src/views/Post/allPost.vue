<template>
  <div>
    <!-- 添加发布帖子按钮 -->
    <el-button type="success" size="small" @click="handleCreatePost">发布帖子</el-button>
    <el-table :data="data.listData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="user.userName" label="发布人"></el-table-column>
      <el-table-column prop="createTime" label="发布时间" width="180"></el-table-column>
      <el-table-column label="评论/点赞/点击" width="200">
        <template #default="scope">
          {{ scope.row.commentCount ? scope.row.commentCount : 0 }} /
          {{ scope.row.hitCount ? scope.row.hitCount : 0 }} /
          {{ scope.row.praiseLen ? scope.row.praiseLen : 0 }}
        </template>
      </el-table-column>
      <el-table-column prop="section.sectionName" label="板块" width="100"></el-table-column>
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
    <!-- 添加弹窗组件 -->
    <el-dialog title="发布帖子" v-model="dialogVisible">
      <el-form :model="postForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="postForm.content" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitPost">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { getPostList, postSubmit } from "../../api"; // 添加 deletePost 引入
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

const dialogVisible = ref(false); // 弹窗可见性
const postForm = reactive({
  title: "",
  content: "",
  sid: sectionId,
});

const GetALL = async () => {
  page.id = sectionId;
  console.log(sectionId);
  getPostList(page).then((response) => {
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

// 添加 handleCreatePost 方法
const handleCreatePost = () => {
  dialogVisible.value = true;
};

// 添加 submitPost 方法
const submitPost = () => {
  if (!postForm.title || !postForm.content) {
    ElMessage.error("标题和内容不能为空");
    return;
  }
  postSubmit(postForm).then((response) => {
    if (response.success) {
      ElMessageBox.alert("发布成功", "提示", {
        confirmButtonText: "确定",
      });
      dialogVisible.value = false;
      GetALL();
    } else {
      ElMessageBox.alert("发布失败", "提示", {
        confirmButtonText: "确定",
      });
    }
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