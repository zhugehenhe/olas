<script setup>
import { getLawyerInfo, getCount, getLawyerPraise, addLawyerPraise } from "../../api";
import { useRoute } from "vue-router";
import router from "../../router";
const route = useRoute();
const id = route.query.id;
const info = ref({});
const count = ref([]);
const LawyerPraise = ref({ status: false });
const getInfo = () => {
  getLawyerInfo(id).then((res) => {
    console.log(res);
    info.value = res.data;
  });
};
const getPraise = () => {
  getLawyerPraise(id).then((res) => {
    if (res.data.status) {
      LawyerPraise.value = res.data;
    }
  });
};
const praise = () => {
  addLawyerPraise(id).then((res) => {
    getInfo();
    LawyerPraise.value.status = !LawyerPraise.value.status;
    if (LawyerPraise.value.status) {
      ElMessage.success("点赞成功");
    } else {
      ElMessage.success("取消点赞");
    }
  });
};
const Ask = () => {
  router.push({
    path: "/OLAS/Ask",
    query: { id: info.value.id },
  });
};
onMounted(() => {
  getInfo();
  getCount(id).then((res) => {
    count.value = res.data;
  });
  getPraise();
});
</script>
<template>
  <div>
    <div class="container">
      <div class="content">
        <div class="law-info">
          <div class="subtitle">律师信息</div>
          <ul class="item-b">
            <li class="item fix">
              <el-icon size="30" class="icon"><UserFilled /></el-icon>
              <p class="two-r" :title="lawyerName + '律师'">{{ info.lawyerName }}律师</p>
            </li>
            <li class="item fix">
              <el-icon size="30" class="icon"><Cellphone /></el-icon>
              <p class="two-r b" :title="info.phone">{{ info.phone }}</p>
            </li>
            <li class="item fix">
              <el-icon size="30" class="icon"><Postcard /></el-icon>
              <p class="two-r" :title="info.licenseNumber">{{ info.licenseNumber }}</p>
            </li>
            <li class="item fix">
              <el-icon size="30" class="icon"><Message /></el-icon>
              <p class="two-nowrap nowrap" :title="info.email">{{ info.email }}</p>
            </li>
            <li class="item fix">
              <el-icon size="30" class="icon"><MapLocation /></el-icon>
              <p class="two-r" :title="info.address">
                {{ info.address }}
              </p>
            </li>
            <li>
              <el-button v-if="!LawyerPraise.status" type="primary" plain @click="praise" style="margin: 10px 77px">点个赞</el-button>
              <el-button v-else @click="praise" type="danger" plain style="margin: 10px 70px"> 取消点赞</el-button>
            </li>
            <li><el-button @click="Ask" type="success" style="margin: 10px 70px">立即咨询</el-button></li>
          </ul>
        </div>
        <div class="introduce-b">
          <p class="title">律师介绍</p>
          <div class="text-b">
            <div class="img-b">
              <a href="">
                <el-image :src="info.coverPhoto" :alt="info.lawyerName + '律师'" class="law-img" />
                <div class="name-b">{{ info.lawyerName }}</div>
              </a>
            </div>
            <p class="text">{{ info.introduction }}</p>
          </div>
          <div class="profession-b">
            <div class="subtitle">专业<br />领域</div>
            <ul class="two-r item-b" v-if="info.specialization" v-for="item in info.specialization.split(',')" :key="item">
              <li class="item nowrap">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="evaluation-section">
      <el-row :gutter="20" style="width: 1200px; margin: 20px auto 0; background-color: #fff; padding: 20px">
        <el-col :span="8">
          <div class="count-b">
            <p class="b col">点赞数:{{ info.praiseLen }}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="count-b">
            <p class="b col">服务次数: {{ count.b }}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="count-b">
            <p class="b col">用户评价</p>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="width: 1200px; margin: 0 auto; background-color: #fff; padding: 20px">
        <el-col :span="24">
          <div class="reviews">
            <div v-for="item in count.a" :key="item.id" class="review-item">
              <p class="b col">{{ item }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="scss" scoped>
p {
  word-break: break-all;
}
.b {
  font-weight: 700;
}
.col {
  margin-top: 10px;
  text-align: center;
}
.evaluation-section {
  margin-top: 20px;
  background-color: #f9fafc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.count-b {
  background-color: #eef5fe;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #d8e5f9;
}

.reviews {
  margin-top: 20px;
}

.review-item {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  margin-bottom: 10px;
}
.container {
  padding: 50px 0 40px;
  background-color: #fff;
  min-width: 1200px;
}
.content {
  width: 1200px;
  margin: 0 auto;
  display: flex;
}
.law-info {
  width: 400px;
  .subtitle {
    padding-left: 20px;
    color: #fff;
    font-size: 24px;
    line-height: 60px;
    background-color: #375893;
  }
  .item-b {
    width: 230px;
    padding: 27px 23px 40px 16px;
    line-height: 30px;
    font-size: 16px;
    min-height: 311px;
    color: #666;
    background-color: #f3f7fd;
  }
  .item {
    .two-r {
      padding: 8px 0 8px 6px;
      border-bottom: 1px solid #d8e5f9;
    }
    .two-nowrap {
      padding: 8px 0 8px 6px;
      border-bottom: 1px solid #d8e5f9;
    }
    .icon {
      width: 32px;
      height: 32px;
      border-radius: 100%;
      margin-top: 8px;
      margin-right: 7px;
      float: left;
    }
  }
}
.introduce-b {
  padding-left: 40px;
  .title {
    font-size: 30px;
    line-height: 36px;
    color: #353535;
    border-bottom: 1px solid #dae6f4;
    padding-bottom: 20px;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 63px;
      height: 5px;
      border-radius: 5px;
      background-color: #375893;
      bottom: -3px;
      left: 0;
    }
  }
  .text-b {
    padding: 20px 0 40px;
    .img-b {
      width: 220px;
      height: 220px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      float: left;
    }
    .law-img {
      display: block;
      width: 220px;
      height: 220px;
    }
    .name-b {
      position: absolute;
      line-height: 50px;
      color: #fff;
      font-size: 18px;
      width: 100%;
      bottom: 0;
      text-align: center;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
    }
    .text {
      font-size: 16px;
      color: #404040;
      line-height: 31px;
      padding: 10px 20px;
      margin-left: 230px;
    }
  }
  .profession-b {
    color: #375893;
    margin-top: 20px;
    float: left;
    .subtitle {
      padding-top: 15px;
      width: 110px;
      height: 85px;
      background-color: #375893;
      border-radius: 4px;
      font-size: 24px;
      color: #fff;
      text-align: center;
      line-height: 34px;
      float: left;
    }
    .item-b {
      font-size: 0;
      .item {
        font-size: 16px;
        margin-left: 20px;
        margin-bottom: 20px;
        border-radius: 4px;
        display: inline-block;
        width: 162px;
        height: 40px;
        line-height: 40px;
        background-color: #d8e5f9;
        text-align: center;
        transition: all 0.5s;
      }
    }
  }
}
.two-r {
  display: table-cell;
  width: 2000px;
}
</style>