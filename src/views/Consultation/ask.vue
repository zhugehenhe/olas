<script setup>
import { useRoute } from "vue-router";
import { getLawyerInfo, newGuid, createConsulation } from "../../api";
import router from "../../router";
const route = useRoute();
const lid = ref(0);
const info = ref({});
const disabled = ref(true);
const con = reactive({
  id: 0,
  LawyerId: 0,
  ConsultationQuestions: "",
});

watch(
  () => con.ConsultationQuestions,
  (New, Old) => {
    if (New.length > 0) {
      disabled.value = false;
    } else {
      disabled.value = true;
    }
  }
);
const send = () => {
  if (con.ConsultationQuestions.length > 500) {
    ElMessage.error("请输入小于500字的问题");
    return;
  }
  createConsulation(con).then((res) => {
    if (res.status == 200) {
      ElMessage.success("发送成功,请等待律师回复");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      ElMessage.error("发送失败");
    }
  });
};
const handleView = (id) => {
  router.push({ path: "/OLAS/Lawyer", query: { id: id } });
};
onMounted(() => {
  lid.value = route.query.id;
  con.LawyerId = lid.value;
  getLawyerInfo(lid.value).then((res) => {
    info.value = res.data;
  });
  newGuid().then((res) => {
    con.id = res.data;
  });
});
</script>

<template>
  <div class="order_main">
    <div class="order_w fix">
      <div class="l order_l">
        <div class="pd">
          <div class="fix layer_box">
            <div class="l temp_box">
              <div class="temp">
                <a @click="handleView(info.id)" target="_blank"><img :src="info.coverPhoto" :alt="info.lawyerName + '律师'" class="img" /></a>
              </div>
              <div class="txt">在线</div>
            </div>
            <div class="t_desc">
              <div class="tl">
                <a @click="handleView(info.id)" target="_blank">{{ info.lawyerName + "律师" }}</a>
              </div>
              <div class="info">擅长： {{ info.specialization }}</div>
              <div class="area">服务地区： 全国</div>
            </div>
          </div>
          <div class="text_box">
            <textarea name="content" v-model="con.ConsultationQuestions" class="textarea" placeholder="请说说您的问题（500字以内）"></textarea>
          </div>
          <input type="hidden" name="stayphone" value="1" />
          <div class="btn_tr">
            <el-button type="primary" :disabled="disabled" @click="send">立即提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.order_main {
  width: 1080px;
  margin: 50px auto 0;
  .order_l {
    position: relative;
    width: 100%;
    height: 543px;
    background-color: #fff;
    border-radius: 20px;
    .pd {
      padding: 50px;
    }
  }
  .l,
  .fl {
    float: left;
  }
  .layer_box {
    .temp_box {
      position: relative;
      width: 100px;
      height: 100px;
      margin-right: 20px;
    }
    .temp {
      width: 100px;
      height: 100px;
      border-radius: 8px;
      overflow: hidden;
      .img {
        width: 100%;
        display: block;
      }
    }
    .txt {
      position: absolute;
      bottom: -10px;
      left: 50%;
      margin-left: -27px;
      display: block;
      width: 54px;
      height: 20px;
      line-height: 20px;
      background: #2aa399;
      color: #fff;
      font-size: 12px;
      text-align: center;
      border-radius: 4px;
      font-weight: 500;
      &:before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #fff;
        vertical-align: middle;
        margin-right: 6px;
      }
    }
    .t_desc {
      display: block;
      overflow: hidden;
    }
    .tl {
      font-size: 28px;
      line-height: 42px;
      margin-bottom: 4px;
      font-weight: 700;
      color: #333;
      a {
        color: #333;
      }
    }
    .info {
      line-height: 24px;
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .area {
      font-size: 14px;
      color: #999;
      line-height: 21px;
    }
  }
  .text_box {
    position: relative;
    margin-top: 40px;
    background-color: #f8f8f8;
    border-radius: 16px;
    margin-bottom: 20px;
    padding: 15px;
    .textarea {
      height: 170px;
      line-height: 22px;
      font-size: 14px;
      width: 100%;
      border: none;
      background: 0 0;
      outline: none;
      resize: none;
      color: #333;
      font-family: PingFang SC, Microsoft YaHei;
    }
  }
  .btn_tr {
    margin-top: 42px;
    text-align: right;
  }
}
</style>