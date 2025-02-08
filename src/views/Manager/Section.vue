<template>
  <div>
    <div class="Sub-head">
      <a>子板块管理</a>
    </div>
    <div id="wrapper">
      <div class="tabletop" v-if="Keylocking">
        <el-button type="info" @click="AddShow"
          ><el-icon><Plus /></el-icon>新增板块</el-button
        >
        <div class="input-group">
          <input type="text" placeholder="搜索" v-model="page.search" />
          <el-icon @click="SearchSection"><Search /></el-icon>
        </div>
      </div>
      <div class="tabletop" v-if="!Keylocking">
        <el-button type="info"
          ><el-icon><Plus /></el-icon> 新增板块
        </el-button>
        <div class="input-group">
          <input type="text" placeholder="搜索" /><el-icon><Search /></el-icon>
        </div>
      </div>
      <el-table :data="data.listData" style="width: 95%; margin: 0 auto" stripe>
        <el-table-column prop="index" label="序号" width="180">
          <template #default="scope">
            {{ scope.$index + 1 + (page.pageIndex - 1) * page.pageSize }}
          </template>
        </el-table-column>
        <el-table-column prop="sectionName" label="版块名称" />
        <el-table-column prop="squence" label="排序" />
        <el-table-column label="查看子版块">
          <template #default="scope">
            <router-link :to="{ path: '/Manager/SubSection', query: { id: scope.row.id } }">
              <el-icon><Tickets /></el-icon>详情
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <span @click="EditNameShow(scope.row)">
              <el-icon><Edit /></el-icon>编辑
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
      <!-- 添加 -->
      <div class="Cover" v-if="addShow">
        <div class="Show" style="top: 10%; left: 6%; width: 1020px">
          <el-form :model="section" :rules="rules" ref="ruleForm" label-width="100px" class="demo-dynamic">
            <div style="margin: 20px">
              <el-form-item label="新增子板块"> </el-form-item>
              <el-form-item label="板块名" prop="sectionName">
                <el-input v-model="section.sectionName" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item label="排序" prop="squence">
                <el-input type="number" v-model="section.squence" style="width: 400px"></el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" @click="Add()">立即创建</el-button>
              <el-button @click="resetForm()">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!-- 修改 -->
      <div class="Cover" v-if="editShow">
        <div class="Show" style="top: 10%; left: 6%; width: 1020px">
          <el-form :model="section" :rules="rules" ref="ruleForm" label-width="100px" class="demo-dynamic">
            <div style="margin: 20px">
              <el-form-item label="修改子板块"> </el-form-item>
              <el-form-item label="主板块名称" prop="section">
                <el-input v-model="section.sectionName" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item label="排序" prop="squence">
                <el-input type="number" v-model="section.squence" style="width: 400px"></el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" @click="editName('ruleForm')">立即修改</el-button>
              <el-button @click="resetForm()">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <button v-show="false" id="disShow" @click="dialogFormVisibleShow"></button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getSectionsPage, addSection, deleteSection, updateSection } from "../../api";
const router = useRouter();
const ruleForm = ref(null);
const data = ref([]);
const editShow = ref(false);
const addShow = ref(false);
const page = reactive({
  pageIndex: 1,
  pageSize: 10,
  search: "",
  total: 0,
});

const section = ref({
  sectionName: "",
  squence: 0,
  level: 0,
});
const Keylocking = ref(true);
const validateSquence = (rule, value, callback) => {
  if (parseInt(value) < 0) {
    callback(new Error("排序必须大于等于 0"));
  } else {
    callback();
  }
};
const rules = ref({
  sectionName: [
    { required: true, message: "请输入板块名称", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20个字符", trigger: "blur" },
  ],
  squence: [
    { required: true, message: "请输入排序", trigger: "blur" },
    { validator: validateSquence, trigger: "blur" },
  ],
});
const handleSizeChange = (newSize) => {
  page.pageSize = newSize;
  GetAll();
};

const handleCurrentChange = (newPage) => {
  page.pageIndex = newPage;
  GetAll();
};
const Add = async () => {
  await ruleForm.value.validate((valid) => {
    if (valid) {
      addSection(section.value).then((res) => {
        if (res.status == 200) {
          ElMessage({
            message: "添加成功",
            type: "success",
          });
          resetForm();
          GetAll();
        } else {
          ElMessage.error("添加失败");
          resetForm();
          GetAll();
        }
      });
    }
  });
};

const SearchSection = () => {
  page.pageIndex = 1;
  GetAll();
};

const DeleteShow = (id) => {
  ElMessageBox.confirm("此操作将删除该板块, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功!",
      });
      deleteSection(id).then((res) => {
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

const editName = async () => {
  await ruleForm.value.validate((valid) => {
    if (valid) {
      updateSection(section.value).then((res) => {
        if (res.status == 200) {
          ElMessage({
            message: "修改成功",
            type: "success",
          });
          resetForm();
          GetAll();
        } else {
          ElMessage.error("修改失败");
        }
      });
    }
  });
};

const GetAll = async () => {
  getSectionsPage(page).then((res) => {
    data.value = res.data;
    page.total = res.data.count;
  });
};

const EditNameShow = (b) => {
  editShow.value = true;
  section.value = JSON.parse(JSON.stringify(b)); // 取消数据绑定
  Keylocking.value = false;
};

const AddShow = () => {
  addShow.value = !addShow.value;
  Keylocking.value = false;
};

const resetForm = () => {
  addShow.value = false;
  editShow.value = false;
  Keylocking.value = true;
  section.value = {
    sectionName: "",
    squence: 0,
    level: 0,
  };
};

onMounted(() => {
  GetAll();
});
</script>

<style scoped>
@import "./Css/Subhead.css";
@import "./Css/tanchuang.css";
@import "./Css/top2.css";
</style>
<style>
.pagination-center {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>