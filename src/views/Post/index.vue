<template>
  <div class="post_content" v-if="post.user">
    <div class="post_header">
      <div class="post_title">
        <h1 class="title-article">{{ post.title }}</h1>
      </div>
      <div class="post_info">
        <div class="post_bar_top">
          <div class="bar_content">
            <a class="follow-nickName" :title="post.user.nickName">{{ post.user.nickName }}</a>
            <el-icon size="16"><Clock /></el-icon>
            <span class="time">于&nbsp;{{ post.createTime }}&nbsp;发布</span>
            <div class="read-count-box">
              <span> 板块：{{ post.section.sectionName }} </span>
              <el-icon size="16"><View /></el-icon>
              <span class="read-count">阅读量{{ post.hitCount }}</span>
              <el-icon size="16" @click="praise" v-if="!postPraise.status"><Star /></el-icon>
              <el-icon size="16" @click="praise" v-else><StarFilled /></el-icon>
              <span class="read-count">点赞数{{ post.praiseLen }}</span>
              <el-icon size="16"><ChatLineSquare /></el-icon>
              <span class="read-count">评论数{{ post.commentCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <article class="baidu_pl">
      <div class="baidu_pl_content" v-html="post.content"></div>
    </article>
  </div>
  <div class="post_comment">
    <div class="comment_content">
      <div class="comment-edit-box">
        <div class="user-img">
          <a href="https://blog.csdn.net/zhugehenhe" target="_blank">
            <img src="https://profile-avatar.csdnimg.cn/default.jpg!1" />
          </a>
        </div>

        <el-input v-model="textarea" maxlength="1000" placeholder="请输入评论" show-word-limit size="large" :rows="4" type="textarea"></el-input>
      </div>
      <div class="comment-operate-box">
        <el-button size="small" style="float: right; margin-top: 5px" type="primary" :disabled="disabled" @click="send">发送</el-button>
      </div>
      <div class="comment-list-container">
        <div class="comment-list-box" v-for="item in comments.listData" :key="item.id">
          <ul class="comment-list">
            <li class="comment-line-box">
              <div class="comment-list-item">
                <a class="comment-list-href" target="_blank"><img :src="item.user.avatar" :alt="item.user.nickName" class="avatar" /></a>
                <div class="right-box">
                  <div class="new-info-box clearfix">
                    <div class="comment-top">
                      <div class="user-box">
                        <a class="name-href" target="_blank">
                          <span class="name">{{ item.user.nickName }}</span>
                          <el-tag v-if="item.user.role == 1">律师</el-tag>
                        </a>
                        <span class="text" v-if="item.replyUser">回复</span
                        ><span class="nick-name" v-if="item.replyUser">{{ item.replyUser.nickName }}</span>
                        <span class="date">{{ item.createTime }} </span>
                        <div class="opt-comment">
                          <el-icon size="16" @click="replyShow(item)"><ChatSquare /></el-icon
                          ><a @click="replyShow(item)" class="btn-bt btn-reply">回复</a>
                        </div>
                      </div>
                    </div>
                    <div class="comment-center">
                      <div class="new-comment">{{ item.content }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog :title="'回复-' + toReplyName" v-model="DialogVisible" width="30%">
      <el-form :model="ask" label-width="80px">
        <el-input type="textarea" v-model="textarea" :rows="4"></el-input>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" :disabled="disabled" @click="send">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPostDetail, addPostHit, addPostComment, addPostPraise, getPostPraise, getCommentList } from "../../api";

const DialogVisible = ref(false);
const toReplyName = ref("");
const disabled = ref(true);
const textarea = ref("");
const route = useRoute();
const postId = route.query.id;
const post = ref({});
const postPraise = ref({ status: false });
const page = reactive({
  pageIndex: 1,
  pageSize: 15,
  total: 0,
  id: "",
});

const drawerVisible = ref(false);
const comments = ref([]);
const ask = reactive({
  content: "",
  id: "",
  reply: null,
});

const getComment = () => {
  page.id = postId;
  getCommentList(page).then((res) => {
    comments.value = res.data;
  });
};
const fetchPost = () => {
  getPostDetail(postId).then((response) => {
    post.value = response.data;
  });
};
const view = () => {
  addPostHit(postId);
};
const replyShow = (item) => {
  toReplyName.value = item.user.nickName;
  ask.reply = item.user.id;
  ask.id = postId;
  DialogVisible.value = true;
  console.log(ask);
};
const cancel = () => {
  DialogVisible.value = false;
  ask.reply = null;
};
const praise = () => {
  addPostPraise(postId).then((res) => {
    fetchPost();
    postPraise.value.status = !postPraise.value.status;
    if (postPraise.value.status) {
      ElMessage.success("点赞成功");
    } else {
      ElMessage.success("取消点赞");
    }
  });
};
const getPraise = () => {
  getPostPraise(postId).then((res) => {
    if (res.data.status) {
      postPraise.value = res.data;
    }
  });
};
const send = () => {
  ask.id = postId;
  ask.content = textarea.value;
  textarea.value = "";
  addPostComment(ask).then((res) => {
    if (res.status == 200) {
      ElMessage.success("评论成功");
      getComment();
      cancel();
    } else {
      ElMessage.error("评论失败");
      cancel();
    }
  });
};
watch(
  () => textarea.value,
  (New, Old) => {
    if (New.length > 0) {
      disabled.value = false;
    } else {
      disabled.value = true;
    }
  }
);
onMounted(() => {
  fetchPost();
  view();
  getPraise();
  getComment(); // 添加获取评论的调用
});
</script>

<style lang="scss" scoped>
.post_content {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 20px; /* 增加内边距 */
  background: linear-gradient(180deg, #f9f9f9, #ffffff); /* 渐变背景 */
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  .post_header {
    padding-top: 8px;
    background-color: #fff;

    .post_title {
      margin-bottom: 20px; /* 增加标题与信息栏的间距 */
      .title-article {
        font-size: 32px;
        word-wrap: break-word;
        color: #333333; /* 深色标题 */
        font-weight: 600;
        margin: 0;
        word-break: break-all;
      }
    }

    .post_info {
      position: relative;
      background: #f0f0f0; /* 浅灰色背景 */
      border-radius: 4px;
      padding: 10px 15px;
      .post_bar_top {
        color: #999aaa;
        width: 88%;
        display: flex;
        align-items: center;
        .bar_content {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding-left: 12px;
          .follow-nickName {
            color: #555666;
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
              color: #777888;
            }
          }
          .read-count-box {
            display: flex;
            align-items: center;
            .el-icon {
              cursor: pointer;
              transition: color 0.3s ease;
              &:hover {
                color: #ff6700; /* 悬停时变为橙色 */
              }
            }
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    .title-article {
      font-size: 24px;
    }
    .post_info {
      padding: 8px;
    }
  }
}

.post_comment {
  width: 1200px;
  margin: 20px auto;
  position: relative;
  padding: 20px; /* 增加内边距 */
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  .comment-edit-box {
    display: flex;
    justify-content: space-between;
    .user-img {
      margin-right: 8px;
      padding-top: 9px;
    }
  }

  .comment-list-container {
    padding-top: 12px;
    .comment-list-item {
      display: flex;
      width: 100%;
    }
    .comment-list-href {
      display: block;
      padding-top: 15px;
      height: 48px;
      position: relative;
      img.avatar {
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid #e8e8ed;
      }
    }
    .right-box {
      padding-top: 16px;
      padding-bottom: 16px;
      width: 100%;
      margin-left: 8px;
      .new-info-box {
        width: 100%;
        .comment-top {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 4px;
          line-height: 20px;
          font-size: 14px;
          .user-box {
            flex: 1;
            display: flex;
            align-items: center;
            position: relative;
            right: 0;
            top: 0;
            padding-right: 8px;
          }
          .name-href {
            display: flex;
            align-items: center;
            .name {
              display: inline-block;
              max-width: 110px;
              color: #777888;
              margin-right: 4px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .date {
            font-size: 14px;
            color: #777888;
          }
          .text {
            color: #999aaa;
            margin: 0 6px;
            min-width: 28px;
          }
          .nick-name {
            color: #777888;
            margin-right: 10px;
            max-width: 105px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .opt-comment {
            line-height: 20px;
            height: 20px;
            position: absolute;
            right: 0;
            top: 0;
            padding-left: 16px;
            background: #fff;
            .btn-reply {
              position: relative;
              left: -16px;
              padding-left: 16px;
              margin-right: 0;
            }
          }
          .comment-center {
            .new-comment {
              font-size: 14px;
              color: #222226;
              line-height: 22px;
              word-break: break-word;
            }
          }
        }
      }
    }
  }
}
</style>