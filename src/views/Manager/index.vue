<template>
  <div class="Homeindex">
    <div class="box1">
      <div class="homeleft">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#262427"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item index="5">
                <el-icon><House /></el-icon>
                <span slot="title" @click="navigateTo('EchartData')">首页</span>
              </el-menu-item>
              <el-menu-item index="1">
                <el-icon><User /></el-icon>
                <span slot="title" @click="navigateTo('UserInformation')">用户</span>
              </el-menu-item>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><Menu /></el-icon>
                  <span>板块</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" @click="navigateTo('/Manager/Section')">主板块</el-menu-item>
                  <el-menu-item index="2-2" @click="navigateTo('/Manager/SubSection')">子板块</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <i class="iconfont icon-details"></i>
                  <span>评论</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1" @click="navigateTo('PostManager')">帖子</el-menu-item>
                  <el-menu-item index="3-2" @click="navigateTo('CommentManager')">评论</el-menu-item>
                  <el-menu-item index="3-3" @click="navigateTo('PostNotify')">公告</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>
                  <i class="iconfont icon-details"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1" @click="navigateTo('AgeData')">年龄统计</el-menu-item>
                  <el-menu-item index="4-2" @click="navigateTo('ChinaMap')">省份统计</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-menu-item index="6">
                <i class="iconfont icon-jinru"></i>
                <span slot="title" @click="backUserLogin()">退出</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="homeright">
        <!-- //右边的盒子 -->
        <div class="head">
          <!-- //上下分 -->
          <Header></Header>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Header from "./header.vue";

const router = useRouter();

const isCollapse = ref(true);

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};

const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const navigateTo = (path) => {
  router.push({ path: path });
};

const backUserLogin = () => {
  router.push({ path: "/home" });
};
</script>

<style scoped>
.Homeindex {
  display: flex;
  background: url("../../assets/image/background.jpg");
  filter: saturate(170%);
  background-size: 100% 100%;
  flex: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1600px;
  height: 100%;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
}
.Homeindex .box1 {
  width: 1300px;
  height: 780px;
  margin: 50px auto;
  padding: 41px;
  display: flex;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
}
.homeleft {
  width: 150px;
  padding-right: 2px;
  border-top: 2px solid rgba(255, 255, 255, 0.7);
  border-left: 2px solid rgba(255, 255, 255, 0.7);
  overflow: hidden;
  min-width: 150px;
  position: sticky;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  backdrop-filter: blur(20px);
}
.el-sub-menu .el-menu-item {
  min-width: 50px;
  font-size: 13px;
}
.tac.el-row {
  width: 100%;
}
.tac span {
  margin-left: 10px;
}
.el-menu-item {
  min-width: 150px;
  border-right: 1px solid #fff;
}
.el-sub-menu {
  min-width: 149px;
  border-right: 1px solid #fff;
}
.el-sub-menu .el-menu-item-group .el-menu-item {
  border: none;
}
.homeright {
  width: 88%;
  display: flex;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  flex-direction: column;
  background: rgba(54, 54, 54, 0.3);
  backdrop-filter: blur(3px);
}
.homeright .head {
  height: 5%;
}
a {
  text-decoration: none;
  outline: none;
  color: #fff;
}
</style>