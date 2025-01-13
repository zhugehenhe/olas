<script setup>
import { getSections, getLatestArticles } from "@/api";
import { ref } from "vue";
import image from "../assets/image";
const { top_card_bg } = image;
const sections = ref([]);
const articles = ref([]);
onMounted(() => {
  getSections().then((res) => {
    sections.value = res.data;
  });
  getLatestArticles().then((res) => {
    articles.value = res.data;
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
    <div class="article">
      <a target="_blank" class="page-top-card">{{ articles[0].title }}</a>
      <div class="white_box">
        <div class="article_top">最新文章</div>
        <ul class="article_list">
          <template v-for="(item, index) in articles" :key="item.id">
            <li class="item" v-if="index > 0">
              <div class="type">{{ item.tag }}</div>
              <a target="_blank" class="link nowrap">{{ item.title }}</a>
              <div class="time">{{ item.createDate.split(" ")[0] }}</div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="lawyer">
      <div class="lawyer-top">专业律师推荐</div>
      <ul>
        <li class="top-lawyer-media-card">
          <a href="https://www.lawtime.cn/lawyer/lll135836243135841337" target="_blank" class="lawyer-img-box">
            <img src="//att3.lawtimeimg.com/photo/1685064671697_220wh220.jpg" alt="柴传程律师" class="lawyer-img" />
          </a>
          <div class="lawyer-msg">
            <a href="https://www.lawtime.cn/lawyer/lll135836243135841337" target="_blank" class="name nowrap"
              >柴传程律师</a
            >
            <div class="desc nowrap">知识产权,互联网纠纷,人格尊严,损害赔偿,合同纠纷</div>
            <div class="tel">131-0891-8066</div>
            <a
              rel="nofollow"
              href="https://www.lawtime.cn/lawyer/ask135836243135841337?from=5001"
              target="_blank"
              onclick="_lthm.push(['_trackEvent', 'pc_pa0461_po1_ty1', '135512261_buty2', 'ac1']);"
              class="ask-btn btn"
              >咨询我</a
            >
          </div>
        </li>
        <li class="top-lawyer-media-card">
          <a href="https://www.lawtime.cn/lawyer/lll124468668124473762" target="_blank" class="lawyer-img-box">
            <img src="//att1.lawtimeimg.com/photo/1677651307986_220wh220.jpg" alt="徐婕律师" class="lawyer-img" />
          </a>
          <div class="lawyer-msg">
            <a href="https://www.lawtime.cn/lawyer/lll124468668124473762" target="_blank" class="name nowrap"
              >徐婕律师</a
            >
            <div class="desc nowrap">婚姻家庭,合同纠纷,继承,刑事案件,公司企业,劳动纠纷</div>
            <div class="tel">153-2040-1482</div>
            <a
              rel="nofollow"
              href="https://www.lawtime.cn/lawyer/ask124468668124473762?from=5001"
              target="_blank"
              onclick="_lthm.push(['_trackEvent', 'pc_pa0461_po1_ty1', '124144686_buty2', 'ac1']);"
              class="ask-btn btn"
              >咨询我</a
            >
          </div>
        </li>
        <li class="top-lawyer-media-card bdb1">
          <a href="https://www.lawtime.cn/lawyer/lll121191486121196580" target="_blank" class="lawyer-img-box">
            <img
              src="//att3.lawtimeimg.com/photo/201911141725428kiavdrf5pqu591_220wh220.jpg"
              alt="杨斌律师"
              class="lawyer-img"
            />
          </a>
          <div class="lawyer-msg">
            <a href="https://www.lawtime.cn/lawyer/lll121191486121196580" target="_blank" class="name nowrap"
              >杨斌律师</a
            >
            <div class="desc nowrap">合同纠纷,债权债务,婚姻家庭,公司企业,房产纠纷,交通事故,劳动纠纷</div>
            <div class="tel">138-8333-5575</div>
            <a
              rel="nofollow"
              href="https://www.lawtime.cn/lawyer/ask121191486121196580?from=5001"
              target="_blank"
              onclick="_lthm.push(['_trackEvent', 'pc_pa0461_po1_ty1', '120867504_buty2', 'ac1']);"
              class="ask-btn btn"
              >咨询我</a
            >
          </div>
        </li>
        <li class="top-lawyer-media-card bdb1">
          <a href="https://www.lawtime.cn/lawyer/lll136422851136427945" target="_blank" class="lawyer-img-box">
            <img src="//att1.lawtimeimg.com/photo/1717061822169_220wh220.jpg" alt="赵海波律师" class="lawyer-img" />
          </a>
          <div class="lawyer-msg">
            <a href="https://www.lawtime.cn/lawyer/lll136422851136427945" target="_blank" class="name nowrap"
              >赵海波律师</a
            >
            <div class="desc nowrap">婚姻家庭,劳动纠纷,刑事案件,建筑工程,交通事故,债权债务,公司企业</div>
            <div class="tel">178-4862-0324</div>
            <a
              rel="nofollow"
              href="https://www.lawtime.cn/lawyer/ask136422851136427945?from=5001"
              target="_blank"
              onclick="_lthm.push(['_trackEvent', 'pc_pa0461_po1_ty1', '136098869_buty2', 'ac1']);"
              class="ask-btn btn"
              >咨询我</a
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  margin: 0px auto;
  display: flex;
  width: 1200px;
  justify-content: space-between;
  .siderbar {
    width: 300px;
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
    width: 580px;
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
    width: 280px;
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