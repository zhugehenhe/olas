<script setup>
import { getSections } from "@/api";
const sections = ref([]);
onMounted(() => {
  getSections().then((res) => {
    sections.value = res.data;
  });
});
</script>
<template>
  <div class="top">
    <div class="siderbar">
      <el-popover
        placement="right"
        :title="item.sectionName"
        :width="400"
        v-for="item in sections"
        :key="item.id"
        trigger="hover"
      >
        <template #reference>
          <div class="section">
            <div class="item_title">
              <span>{{ item.sectionName }}</span>
            </div>
            <div class="item_content">
              <template v-for="(child, index) in item.children" :key="child.id">
                <span v-if="index < 4">{{ child.sectionName }}</span>
              </template>
            </div>
          </div>
        </template>
        <template #default>
          <div class="item_all_content">
            <template v-for="child in item.children" :key="child.id">
              <span>{{ child.sectionName }}</span>
            </template>
          </div>
        </template>
      </el-popover>
    </div>
    <div class="article"></div>
    <div class="lawyer"></div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  margin: 0px auto;
  display: flex;
  width: 1180px;
  justify-content: space-between;
  .siderbar {
    width: 300px;
    background-color: #fff;
    border-radius: 10px;
    .section {
      padding: 10px;
      .item_title {
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        color: #111;
        margin-bottom: 16px;
      }
      .item_content {
        display: flex;
        line-height: 19px;
        cursor: pointer;
        span {
          font-size: 14px;
          font-weight: 400;
          color: #666;
          &:hover {
            color: #409eff;
          }
          &:not(:last-child) {
            margin-right: 10px;
          }
        }
      }
    }
  }
  .article {
    background-color: #fff;
    width: 300px;
  }
  .lawyer {
    background-color: #fff;
    width: 300px;
  }
}
.item_all_content {
  display: flex;
  line-height: 19px;
  flex-wrap: wrap;
  span {
    font-size: 14px;
    font-weight: 400;
    color: #666;
    margin: 10px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>