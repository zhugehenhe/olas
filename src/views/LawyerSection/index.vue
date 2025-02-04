<script setup>
import { getArticleList, getHotLawyerBySection, getPostList, getArticleHot, getSectionById } from "../../api";
import { useRoute } from "vue-router";
const route = useRoute();

const articleList = ref([]);
const articleHot = ref([]);
const postList = ref([]);
const lawyerList = ref([]);
const section = ref({});
const page = ref({
  id: "",
  pageIndex: 1,
  pageSize: 10,
});

onMounted(() => {
  page.value.id = route.query.id;
  getSectionById(page.value.id).then((res) => {
    console.log(res);
    section.value = res.data;
  });
  getArticleList(page.value).then((res) => {
    console.log(res);
    articleList.value = res.data;
  });
  getPostList(page.value).then((res) => {
    console.log(res);
    postList.value = res.data;
  });
  getHotLawyerBySection(page.value.id).then((res) => {
    console.log(res);
    lawyerList.value = res.data;
  });
  getArticleHot(page.value).then((res) => {
    console.log(res);
    articleHot.value = res.data;
  });
});
</script>

<template>
  <div class="section">
    <div class="section_left">
      <div class="section_left_top white_box">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>{{ section.sectionName }}精选知识</span>
            </div>
          </template>
          <el-carousel motion-blur indicator-position="outside">
            <template v-for="(item, index) in articleHot.listData" :key="item.id">
              <el-carousel-item v-if="index < 4">
                <div class="section_left_top_carousel">
                  <div class="carousel_img">
                    <el-image :src="item.img" style="width: 360px; height: 240px" :fit="'fill'"> ></el-image>
                  </div>
                  <div class="carousel_content">
                    <div class="carousel_content_title">
                      <a>{{ item.title }}</a>
                    </div>
                    <div class="carousel_content_tag">
                      <span class="tag">{{ item.tag }}</span>
                      <span class="tag">{{ item.hits }}人浏览</span>
                    </div>
                    <div class="txt">
                      <span>导读：</span>
                      {{ item.content.slice(0, 50) }}
                    </div>
                  </div>
                </div>
              </el-carousel-item>
            </template>
          </el-carousel>
        </el-card>
      </div>
      <div class="section_left_bottom white_box">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>最新帖子</span>
            </div>
          </template>
          <div class="consult_list">
            <a class="link nowrap" href="https://www.lawtime.cn/ask/question_34254594.html" target="_blank"
              >重新找了一个女人成家没有领结婚证 搬玉米喂猪削茯苓什么都搞着苦死苦活的钱有时候还不给 是不是要的给钱
            </a>
            <a class="link nowrap" href="https://www.lawtime.cn/ask/question_34254323.html" target="_blank"
              >房子是男方父母拆迁安置房，由于面积啊不够，出钱买了一些面积，然后装修形成了债务离婚后债务属于夫妻共同债务吗？</a
            >
            <a class="link nowrap" href="https://www.lawtime.cn/ask/question_34253798.html" target="_blank">请问夫妻双方离婚女方债务怎么处理</a>
            <a class="link nowrap" href="https://www.lawtime.cn/ask/question_34253244.html" target="_blank"
              >女方隐瞒婚前债务20 婚后用彩礼，和男方家里钱偿还婚前债务，是否能够要求女方偿还</a
            >
            <a class="link nowrap" href="https://www.lawtime.cn/ask/question_34252962.html" target="_blank"
              >双方有一子，深圳房产一套少量欠款，女方工作稳定，男方失业不分担经济负担?</a
            >
            <a class="link nowrap" href="https://www.lawtime.cn/ask/question_34252389.html" target="_blank"
              >结婚后发现女方有精猜神方面的病，最后女方退彩礼十八，结婚光给女方现金3o多万，结婚三个月</a
            >
            <a class="link nowrap" href="https://www.lawtime.cn/ask/question_34252332.html" target="_blank"
              >离婚前双方贷款，带完款没还然后离婚，担保人给还的，现在男方找不到可以起诉女方吗</a
            >
            <a class="link nowrap" href="https://www.lawtime.cn/ask/question_34250119.html" target="_blank"
              >你好，2016年老公借贷，按老式婚姻法判夫妻有连带责任，现在能翻案吗</a
            >
            <a class="link nowrap" href="https://www.lawtime.cn/ask/question_34249416.html" target="_blank"
              >我和我老婆结婚没有打结婚证，现在要分开对方不还彩礼，可以起诉吗？</a
            >
            <a class="link nowrap" href="https://www.lawtime.cn/ask/question_34248147.html" target="_blank"
              >家里老公钱不给看病，我想离婚。查他的帐户能查到多少年的？</a
            >
          </div>
        </el-card>
      </div>
    </div>
    <div class="section_right">
      <div class="section_right_top white_box">
        <el-tabs type="border-card" :stretch="true">
          <el-tab-pane label="最新知识">
            <div class="knowledge_content" v-for="item in articleList.listData" :key="item.id">
              <router-link to="" class="title">
                {{ item.title }}
              </router-link>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="section_right_bottom">
        <div class="main_lawyer_cell">
          <p class="lawyer_tl">
            <span>{{ section.sectionName }}</span
            >专业精选律师
          </p>
          <template v-if="lawyerList.length > 0">
            <router-link :to="{ path: '/OLAS/Ask', query: { id: lawyerList[0].id } }" target="_blank" class="laywer_img">
              <img :src="lawyerList[0].coverPhoto" :alt="lawyerList[0].lawyerName + '律师'" />
            </router-link>
            <router-link :to="{ path: '/OLAS/Ask', query: { id: lawyerList[0].id } }" target="_blank" class="lawyer_name"
              >{{ lawyerList[0].lawyerName }}律师</router-link
            >
            <p class="lawyer_hobies">擅长<span class="lawyer_hobies_span">:</span>{{ lawyerList[0].specialization }}</p>
            <div class="lawyer_tel"><span class="tel_icon"></span>{{ lawyerList[0].phone }}</div>
            <router-link :to="{ path: '/OLAS/Ask', query: { id: lawyerList[0].id } }" target="_blank" class="cb_askmy_btn">立即咨询</router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section {
  width: 1250px;
  margin: 0 auto;
  .section_left {
    float: left;
    width: 800px;
    .section_left_top {
      .card-header {
        font-size: 28px;
        font-weight: 600;
        line-height: 40px;
        color: #333;
      }
      .section_left_top_carousel {
        padding: 20px 30px 30px;
        display: flex;
        align-items: flex-start;
        .carousel_content {
          margin-left: 20px;
          .carousel_content_title {
            font-size: 24px;
            font-weight: 500;
            line-height: 36px;
            color: #333;
            margin-bottom: 20px;
          }
          .carousel_content_tag {
            font-size: 14px;
            font-weight: 400;
            line-height: 14px;
            color: #999;
            display: flex;
            align-items: center;
            margin-bottom: 28px;
            .tag {
              margin: 0 20px;
            }
          }
          .txt {
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            color: #666;
            height: 90px;
            overflow: hidden;
          }
        }
      }
    }
    .section_left_bottom {
      margin-top: 40px;
      .card-header {
        font-size: 28px;
        font-weight: 600;
        line-height: 40px;
        color: #333;
      }
      .consult_list {
        margin-top: 30px;
        .link {
          font-size: 18px;
          font-weight: 400;
          line-height: 24px;
          color: #333;
          position: relative;
          padding-left: 36px;
          display: block;
          &:not(:last-child) {
            margin-bottom: 30px;
          }
          &:before {
            content: "";
            width: 24px;
            height: 24px;
            background: url("../../assets//image/law_detail-sprite.png") -213px 0px / 237px no-repeat;
            position: absolute;
            left: 0;
          }
          &:hover {
            color: #409eff;
          }
        }
      }
    }
  }
  .section_right {
    float: right;
    width: 400px;
    .section_right_top {
      .knowledge_content {
        padding: 15px 0;
        .title {
          font-weight: 400;
          font-size: 16px;
          color: #333;
          padding: 10px 30px 10px 36px;
          position: relative;
          min-height: 54px;
          box-sizing: border-box;
          &:before {
            content: "";
            position: absolute;
            width: 6px;
            height: 6px;
            background: #d8d8d8;
            border-radius: 3px;
            left: 22px;
            top: 50%;
            transform: translateY(-50%);
          }
          &:hover {
            color: #409eff;
          }
        }
      }
    }
    .section_right_bottom {
      margin-top: 20px;
      .main_lawyer_cell {
        width: 380px;
        background: linear-gradient(180deg, #fffcf6 0%, #fff 100%);
        background-size: 380px 592px;
        padding: 40px 30px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        flex-direction: column;
        border-radius: 6px;
        .lawyer_tl {
          font-size: 28px;
          font-weight: 700;
          color: #422c11;
          line-height: 28px;
          margin-bottom: 40px;
        }
        .laywer_img {
          position: relative;
          margin-bottom: 30px;
        }
        .lawyer_name {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 0px;
          line-height: 28px;
          color: #422c11;
          margin-bottom: 14px;
        }
        .lawyer_hobies {
          width: 320px;
          text-align: center;
          font-size: 14px;
          font-weight: 400;
          line-height: 14px;
          color: rgba(66, 44, 17, 0.5);
          padding-bottom: 30px;
          position: relative;
          margin-bottom: 29px;
        }
        .lawyer_tel {
          font-size: 24px;
          color: #422c11;
          line-height: 30px;
          display: flex;
          align-items: center;
          margin-bottom: 30px;
        }
        .main_lawyer_cell .tel_icon {
          position: relative;
          width: 30px;
          height: 30px;
          background-color: #f9e9d9;
          border-radius: 50%;
          overflow: hidden;
          display: block;
          margin-right: 8px;
          &:before {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 18px;
            height: 20px;
            background: url(https://pic2.lawtimeimg.com/images/v2/pc/zhishi/info/law_detail-sprite.png) -148px -65px / 237px no-repeat;
          }
        }
        .cb_askmy_btn {
          width: 321px;
          height: 60px;
          border-radius: 31.4px;
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 3px;
          color: #fff;
          background: linear-gradient(270deg, #bf956d 0%, #d5aa70 100%);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
