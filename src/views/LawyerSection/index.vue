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
const goArticleDetail = (id) => {
  router.push({ path: "/OLAS/Article", query: { id: id } });
};

onMounted(() => {
  page.value.id = route.query.id;
  getSectionById(page.value.id).then((res) => {
    section.value = res.data;
  });
  getArticleList(page.value).then((res) => {
    articleList.value = res.data;
  });
  getPostList(page.value).then((res) => {
    console.log(res);
    postList.value = res.data;
  });
  getHotLawyerBySection(page.value.id).then((res) => {
    lawyerList.value = res.data;
  });
  getArticleHot(page.value).then((res) => {
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
              <span></span>
              <div class="card-header-title">{{ section.sectionName }}精选知识</div>
              <div class="card-header-more">
                <router-link :to="{ path: '/OLAS/AllArticle', query: { id: section.id } }">
                  <el-icon><Right /></el-icon> <span>所有知识</span></router-link
                >
              </div>
            </div>
          </template>
          <el-carousel motion-blur indicator-position="outside">
            <template v-for="(item, index) in articleHot.listData" :key="item.id">
              <el-carousel-item v-if="index < 4">
                <div class="section_left_top_carousel" @click="goArticleDetail(item.id)">
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
              <div class="card-header-title">最新帖子</div>
              <div class="card-header-more">
                <router-link :to="{ path: '/OLAS/AllPost', query: { id: section.id } }">
                  <el-icon><Right /></el-icon> <span>所有帖子</span></router-link
                >
              </div>
            </div>
          </template>
          <div class="consult_list" v-for="item in postList.listData" :key="item.id">
            <router-link class="link nowrap" :to="{ path: '/OLAS/Post', query: { id: item.id } }">{{
              item.title
            }}</router-link>
          </div>
        </el-card>
      </div>
    </div>
    <div class="section_right">
      <div class="section_right_top white_box">
        <el-tabs type="border-card" :stretch="true">
          <el-tab-pane label="最新知识">
            <div class="knowledge_content" v-for="item in articleList.listData" :key="item.id">
              <router-link :to="{ path: '/OLAS/Article', query: { id: item.id } }" class="title">
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
            <router-link
              :to="{ path: '/OLAS/Ask', query: { id: lawyerList[0].id } }"
              target="_blank"
              class="laywer_img"
            >
              <img :src="lawyerList[0].coverPhoto" :alt="lawyerList[0].lawyerName + '律师'" />
            </router-link>
            <router-link
              :to="{ path: '/OLAS/Ask', query: { id: lawyerList[0].id } }"
              target="_blank"
              class="lawyer_name"
              >{{ lawyerList[0].lawyerName }}律师</router-link
            >
            <p class="lawyer_hobies">擅长<span class="lawyer_hobies_span">:</span>{{ lawyerList[0].specialization }}</p>
            <div class="lawyer_tel"><span class="tel_icon"></span>{{ lawyerList[0].phone }}</div>
            <router-link
              :to="{ path: '/OLAS/Ask', query: { id: lawyerList[0].id } }"
              target="_blank"
              class="cb_askmy_btn"
              >立即咨询</router-link
            >
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
        display: flex;
        justify-content: space-between;
        .card-header-title {
          font-size: 28px;
          font-weight: 600;
          line-height: 40px;
          color: #333;
          flex-grow: 1;
        }
        .card-header-more {
          font-size: 14px;
          font-weight: 300;
          line-height: 40px;
          color: #5a5a5a;
          cursor: pointer;
        }
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
        display: flex;
        justify-content: space-between;
        .card-header-title {
          font-size: 28px;
          font-weight: 600;
          line-height: 40px;
          color: #333;
          flex-grow: 1;
        }
        .card-header-more {
          font-size: 14px;
          font-weight: 300;
          line-height: 40px;
          color: #5a5a5a;
          cursor: pointer;
        }
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
            background: url(https://pic2.lawtimeimg.com/images/v2/pc/zhishi/info/law_detail-sprite.png) -148px -65px /
              237px no-repeat;
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
