<template>
  <div>
    <div class="Sub-head">
      <a>帖子管理</a>
    </div>
    <div id="wrapper">
      <div class="tabletop">
        <el-tree-select
          ref="tree"
          accordion
          :props="defaultProps"
          v-model="page.id"
          :data="Sections"
          value-key="id"
          :render-after-expand="false"
          style="width: 200px; margin-left: 10px"
          @change="SearchSection"
        />
        <div class="input-group">
          <input type="text" placeholder="搜索" v-model="page.search" />
          <el-icon @click="SearchSection"><Search /></el-icon>
        </div>
      </div>
      <el-table :data="data.listData" style="width: 95%; margin: 0 auto" stripe>
        <el-table-column prop="index" label="序号" width="80">
          <template #default="scope">
            {{ scope.$index + 1 + (page.pageIndex - 1) * page.pageSize }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="300" show-overflow-tooltip />
        <el-table-column prop="section.sectionName" label="板块" />
        <el-table-column prop="user.userName" label="发布人" />
        <el-table-column prop="hitCount" label="查看数"> </el-table-column>
        <el-table-column prop="commentCount" label="评论数"></el-table-column>
        <el-table-column prop="praiseLen" label="点赞数"></el-table-column>

        <el-table-column label="操作" width="150">
          <template #default="scope">
            <span @click="DetailShow(scope.row)">
              <el-icon><Reading /></el-icon>查看详情
            </span>
            <el-button link @click="DeleteShow(scope.row.id)">
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
    <el-dialog v-model="dialogFormVisible" title="帖子详情" width="60%">
      <div class="post-detail">
        <h3>{{ selectedPost.title }}</h3>
        <div class="post-info">
          <p>
            <el-icon><Folder /></el-icon> 板块: {{ selectedPost.section.sectionName }}
          </p>
          <p>
            <el-icon><User /></el-icon> 发布人: {{ selectedPost.user.userName }}
          </p>
          <p>
            <el-icon><View /></el-icon> 查看数: {{ selectedPost.hitCount }}
          </p>
          <p>
            <el-icon><ChatDotRound /></el-icon> 评论数: {{ selectedPost.commentCount }}
          </p>
          <p>
            <el-icon><Star /></el-icon> 点赞数: {{ selectedPost.praiseLen }}
          </p>
        </div>
        <div class="post-content">
          <h4>内容:</h4>
          <p>{{ selectedPost.content }}</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getPostList, deletePost, getSections } from "../../api";
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
  ElMessageBox.confirm("此操作将删除该帖子, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功!",
      });
      deletePost(id).then((res) => {
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

const GetSection = () => {
  getSections().then((res) => {
    Sections.value = res.data;
  });
};
const DetailShow = (post) => {
  selectedPost.value = post;
  dialogFormVisible.value = true;
};
const GetAll = async () => {
  getPostList(page).then((res) => {
    data.value = res.data;
    page.total = res.data.count;
  });
};

onMounted(() => {
  GetAll();
  GetSection();
});
</script>

<style scoped>
@import "./Css/Subhead.css";
@import "./Css/tanchuang.css";
@import "./Css/top2.css";
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
