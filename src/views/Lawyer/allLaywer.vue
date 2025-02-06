<script setup>
import { pa } from "element-plus/es/locales.mjs";
import { getLawyerInfoBySection, getSections } from "../../api";
import router from "../../router";
const lawyerList = ref([]);
const sections = ref([]);
const page = reactive({
  pageIndex: 1,
  pageSize: 15,
  id: "",
  total: 0,
});

const handleSelect = (key, keyPath) => {
  page.id = key;
  page.pageIndex = 1;
  page.pageSize = 15;
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

const GetALL = () => {
  getLawyerInfoBySection(page).then((res) => {
    lawyerList.value = res.data;
    page.total = res.data.count;
  });
};
const handleView = (id) => {
  router.push({ path: "/OLAS/Lawyer", query: { id: id } });
};
onMounted(() => {
  getSections().then((res) => {
    sections.value = res.data;
    page.id = sections.value[0].children[0].id;
    GetALL();
  });
});
</script>
<template>
  <div class="container">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :ellipsis="false"
      :default-active="activeIndex"
      style="width: 1250px; margin: 0 auto"
    >
      <el-sub-menu v-for="(item, index) in sections" :key="item.id" :index="index">
        <template #title>{{ item.sectionName }}</template>
        <template v-for="(child, index1) in item.children" :key="child.id">
          <el-menu-item :index="child.id">{{ child.sectionName }}</el-menu-item>
        </template>
      </el-sub-menu>
    </el-menu>
    <div style="width: 1200px; margin: 0 auto">
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="6" v-for="(lawyer, index) in lawyerList.listData" :key="index" style="margin-bottom: 20px">
          <el-card shadow="hover" @click="handleView(lawyer.id)">
            <el-image :src="lawyer.coverPhoto" class="avatar" alt="Lawyer Avatar" />
            <div class="info">
              <p class="name">
                <strong>{{ lawyer.lawyerName }}</strong>
              </p>
              <p class="specialization">电话: {{ lawyer.phone }}</p>
              <p class="specialization">专业领域: {{ lawyer.specialization }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="page.pageIndex"
    :page-size="page.pageSize"
    layout="total,  prev, pager, next, jumper"
    :total="page.total"
    class="pagination-center"
  ></el-pagination>
</template>

<style lang="scss" scoped>
.avatar {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 5px;
}

.info {
  margin-top: 10px;
  text-align: center;
  .name {
    font-weight: bold;
  }
  .specialization {
    color: #999; // 淡化专业领域颜色
  }
}
.pagination-center {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>