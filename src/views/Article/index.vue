<template>
  <div class="post_content" v-if="article.user">
    <div class="post_header">
      <div class="post_title">
        <h1 class="title-article">{{ article.title }}</h1>
      </div>
      <div class="post_info">
        <div class="post_bar_top">
          <div class="bar_content">
            <a class="follow-nickName" :title="article.user.nickName">{{ article.user.nickName }}</a>
            <el-icon size="16"><Clock /></el-icon>
            <span class="time">于&nbsp;{{ article.createDate }}&nbsp;发布</span>
            <div class="read-count-box">
              <span> 板块：{{ article.tag }} </span>
              <el-icon size="16"><View /></el-icon>
              <span class="read-count">阅读量{{ article.hits }}</span>
              <el-icon size="16" @click="praise" v-if="!articlePraise.status"><Star /></el-icon>
              <el-icon size="16" @click="praise" v-else><StarFilled /></el-icon>
              <span class="read-count">点赞数{{ article.praiseLen }}</span>
              <el-icon size="16" v-if="article.source"><Link /></el-icon>
              <span v-if="article.source" class="read-count">
                <a v-if="article.url" :href="article.url">{{ article.source }} </a>
                <a>{{ article.source }} </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <article class="baidu_pl">
      <div class="baidu_pl_content" v-html="article.content"></div>
    </article>
    <div class="post_footer">
      <div class="post_footer_left">
        <a href="">
          <img :src="article.user.avatar" :alt="article.user.nickName" class="profile-img" />
          <span class="profile-name"> {{ article.user.nickName }} </span>
        </a>
      </div>
      <div class="post_footer_right">
        <div class="read-count-box">
          <el-icon size="16"><View /></el-icon>
          <span class="read-count">阅读量{{ article.hits }} </span>
          <el-icon size="16" @click="praise" v-if="!articlePraise.status"><Star /></el-icon>
          <el-icon size="16" @click="praise" v-else><StarFilled /></el-icon>
          <span class="read-count">点赞数{{ article.praiseLen }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getArticleDetail, addArticleHit, addArticlePraise, getArticlePraise } from "../../api";

const route = useRoute();
const id = route.query.id;
const article = ref({});
const articlePraise = ref({ status: false });

const fetchPost = () => {
  getArticleDetail(id).then((response) => {
    article.value = response.data;
  });
};
const view = () => {
  addArticleHit(id);
};
const praise = () => {
  addArticlePraise(id).then((res) => {
    fetchPost();
    articlePraise.value.status = !articlePraise.value.status;
    if (articlePraise.value.status) {
      ElMessage.success("点赞成功");
    } else {
      ElMessage.success("取消点赞");
    }
  });
};
const getPraise = () => {
  getArticlePraise(id).then((res) => {
    if (res.data.status) {
      articlePraise.value = res.data;
    }
  });
};

onMounted(() => {
  fetchPost();
  view();
  getPraise();
});
</script>

<style lang="scss" scoped>
.post_content {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 24px;
  background: #fff;
  border-radius: 2px 2px 0 0;
  font-family: "Arial", sans-serif;
  color: #333;
  .post_header {
    padding-top: 8px;
    background-color: #fff;
    margin-bottom: 24px;
    .post_title {
      margin-bottom: 16px;
      .title-article {
        font-size: 28px;
        word-wrap: break-word;
        color: #333;
        font-weight: 600;
        margin: 0;
        word-break: break-all;
      }
    }
    .post_info {
      position: relative;
      background: #f8f8f8;
      border-radius: 4px;
      margin-bottom: 16px;
      .post_bar_top {
        color: #999aaa;
        width: 88%;
        display: -webkit-box;
        display: -ms-flexbox;
        padding: 12px;
        display: flex;
        .bar_content {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          gap: 12px;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          padding-left: 12px;
          .follow-nickName {
            color: #007bff;
            margin-right: 20px;
            max-width: 232px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          span {
            margin-right: 8px;
            line-height: 32px;
            .time {
              position: relative;
              font-size: 12px;
              color: #999;
            }
          }
          .read-count-box {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
          }
        }
      }
    }
  }
  article {
    position: relative;
    padding-top: 16px;
    margin: 20px 0;
  }
  .post_footer {
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 17px 24px;
    height: 64px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #fff;
    -webkit-box-shadow: 0 -1px 8px 0 rgba(0, 0, 0, 0.06);
    box-shadow: 0 -1px 8px 0 rgba(0, 0, 0, 0.06);
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-bottom: 8px;
    background-color: #fff;
    .post_footer_left {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      gap: 12px;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      .profile-img {
        width: 32px;
        height: 32px;
        border-radius: 32px;
        border: 1px solid #f5f6f7;
        margin-right: 8px;
      }
      .profile-name {
        max-width: 160px;
        height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        font-weight: 600;
        color: #222226;
        line-height: 24px;
        margin-right: 8px;
      }
    }
    .post_footer_right {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
    span {
      margin: 0 8px;
    }
    .read-count-box {
      margin: -17px 0;
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      gap: 8px;
      justify-content: flex-end;
    }
  }
}
.el-icon {
  margin-right: 8px;
}

.el-icon:hover {
  cursor: pointer;
  color: #007bff;
}
</style>