<script setup>
import { getSections, getLatestArticles, getHotLawyer } from "@/api";
import { ref } from "vue";
import image from "../assets/image";
import router from "../router";
const { top_card_bg } = image;
const sections = ref([]);
const hotArticles = ref([]);
const hotLawyer = ref([]);
const toSection = (id) => {
  router.push({ name: "Section", query: { id: id } });
};
onMounted(() => {
  getSections().then((res) => {
    sections.value = res.data;
  });
  getLatestArticles().then((res) => {
    hotArticles.value = res.data;
  });
  getHotLawyer().then((res) => {
    hotLawyer.value = res.data;
  });
});
</script>
<template>
  <div class="top">
    <div class="siderbar">
      <el-popover placement="right" :title="item.sectionName" :width="400" v-for="item in sections" :key="item.id" trigger="hover">
        <template #reference>
          <div class="section">
            <div class="item_title">
              <span>{{ item.sectionName }}</span>
            </div>
            <div class="item_content">
              <template v-for="(child, index) in item.children" :key="child.id">
                <span v-if="index < 5" @click="toSection(child.id)">{{ child.sectionName }}</span>
              </template>
            </div>
          </div>
        </template>
        <template #default>
          <div class="item_all_content">
            <template v-for="child in item.children" :key="child.id">
              <span @click="toSection(child.id)">{{ child.sectionName }}</span>
            </template>
          </div>
        </template>
      </el-popover>
    </div>
    <div class="article">
      <template v-if="hotArticles.length">
        <a target="_blank" class="page-top-card">{{ hotArticles[0].title }}</a>
      </template>
      <div class="white_box">
        <div class="article_top">最新文章</div>
        <ul class="article_list">
          <template v-for="(item, index) in hotArticles" :key="item.id">
            <li class="item" v-if="index > 0">
              <div class="type">{{ item.tag }}</div>
              <router-link :to="{ path: '/OLAS/Article', query: { id: item.id } }" target="_blank" class="link nowrap">{{ item.title }}</router-link>
              <div class="time">{{ item.createDate.split(" ")[0] }}</div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="lawyer">
      <div class="lawyer-top">专业律师推荐</div>
      <ul>
        <li class="top-lawyer-media-card" v-for="item in hotLawyer" :key="item.id">
          <a href="" target="_blank" class="lawyer-img-box">
            <img :src="item.coverPhoto" :alt="item.lawyerName + '律师'" class="lawyer-img" />
          </a>
          <div class="lawyer-msg">
            <a href="" target="_blank" class="name nowrap">{{ item.lawyerName }}律师</a>
            <div class="desc nowrap">{{ item.specialization }}</div>
            <div class="tel">{{ item.phone }}</div>
            <router-link :to="{ path: '/OLAS/Ask', query: { id: item.id } }" rel="nofollow" target="_blank" class="ask-btn btn">咨询我</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="home_content"></div>
</template>

<style lang="scss" scoped>
.top {
  margin: 0px auto;
  display: flex;
  width: 1600px;
  justify-content: space-between;
  .siderbar {
    width: 400px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    .section {
      padding: 10px;
      .item_title {
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
        color: #111;
        margin-bottom: 20px;
      }
      .item_content {
        display: flex;
        line-height: 24px;
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
    width: 700px;
    border-radius: 10px;
    .page-top-card {
      height: 222px;
      background: url("../assets/image/top-card-bg.png") center / 100% no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 0 20px;
      font-size: 28px;
      font-weight: 700;
      line-height: 50px;
      color: #e61;
      margin-bottom: 20px;
    }
    .article_top {
      line-height: 86px;
      font-size: 20px;
      font-weight: 700;
      color: #333;
      padding-left: 30px;
      border-bottom: 1px solid #eee;
    }
    .article_list {
      padding-top: 15px;
      height: 352px;
      .type {
        font-size: 18px;
        color: #999;
        font-weight: 400;
        &:after {
          content: "|";
          padding: 0 10px;
          color: #333;
        }
      }
      .link {
        flex: 1;
        width: 0;
        font-size: 18px;
        color: #333;
        font-weight: 400;
        margin-right: 20px;
        &:hover {
          color: #409eff;
        }
      }
      .nowrap {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item {
        height: 54px;
        display: flex;
        align-items: center;
        padding: 0 30px;
      }
      .time {
        font-size: 14px;
        font-weight: 400;
        color: #999;
      }
    }
  }
  .lawyer {
    background-color: #fff;
    width: 400px;
    border-radius: 6px;
    .lawyer-top {
      line-height: 86px;
      font-size: 20px;
      font-weight: 700;
      color: #333;
      padding-left: 30px;
      border-bottom: 1px solid #eee;
    }

    .top-lawyer-media-card {
      margin: 0 30px;
      padding: 36px 0;
      height: 80px;
      display: flex;
      border-bottom: 1px solid #eee;
      .lawyer-img-box {
        width: 80px;
        height: 80px;
        border-radius: 4px;
        overflow: hidden;
        margin-right: 20px;
      }
      .lawyer-img {
        width: 100%;
        display: block;
      }
      .lawyer-msg {
        flex: 1;
        width: 0;
        height: 80px;
        position: relative;
      }
      .name {
        font-size: 18px;
        font-weight: 700;
        color: #333;
        display: block;
        line-height: 26px;
        margin-bottom: 8px;
      }
      .desc {
        transition: all 0.2s;
        font-size: 14px;
        font-weight: 400;
        color: #999;
        margin-bottom: 13px;
      }
      .tel {
        transition: all 0.2s;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        color: #666;
        white-space: nowrap;
        &:before {
          content: "";
          width: 12px;
          height: 14px;
          background: url("../assets/image/icon-sprite.png") -17.5px 0px / 44px no-repeat;
          margin-right: 4px;
          flex-shrink: 0;
        }
      }
      &:hover {
        .ask-btn {
          visibility: visible;
          opacity: 1;
        }
        .tel {
          display: none;
        }
        .desc {
          display: none;
        }
      }
      .ask-btn {
        position: absolute;
        bottom: 10px;
        font-size: 14px;
        font-weight: 400;
        opacity: 0;
        visibility: hidden;
        color: #fff;
        left: 0;
        transition: all 0.2s;
        width: 74px;
        height: 28px;
        line-height: 28px;
        border-radius: 14px;
        background: linear-gradient(225deg, #1251ff 0%, #2eb2ff 100%);
      }
      .btn {
        display: inline-block;
        text-align: center;
        overflow: hidden;
        cursor: pointer;
      }
    }
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