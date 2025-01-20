<script setup>
import { ref, watch } from "vue";

const disabled = ref(true);
const textarea = ref("");

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
</script>
<template>
  <div class="c_cont">
    <div class="c_title">
      咨询助手沟通中
      <span class="small">在线</span>
    </div>
    <div class="c_main">
      <ul class="all_view">
        <li class="item show">
          <div class="question_view">
            <div class="content">
              <div class="desc">您好，我是快快，请问您遇到了什么问题？🤔</div>
            </div>
            <div class="temp_box">
              <div class="nobox">
                <img src="../../assets/image/lawtime_user1.png" alt="" class="temp" />
              </div>
            </div>
          </div>
        </li>
        <li class="item show" data-delay="1000">
          <div class="question_view">
            <div class="content">
              <div class="desc">
                请在下方发送问题~
                <br />
                我将根据问题，为您快速匹配专业律师。律师将为您做针对性解答。😊
              </div>
            </div>
            <div class="temp_box">
              <div class="nobox">
                <img src="../../assets/image/lawtime_user1.png" alt="" class="temp" />
              </div>
            </div>
          </div>
        </li>
        <li class="item hide" data-out="1">
          <div class="reply_con">
            <div class="content">
              <div class="desc" id="questionVal"></div>
            </div>
            <div class="temp_box none">
              <div class="nobox">
                <img src="//pic1.lawtimeimg.com/images/ask/fabu/v4/p_temp.png?v=1737085162" alt="" class="temp" />
              </div>
            </div>
          </div>
        </li>
        <li class="item hide" data-out="1000">
          <div class="question_view">
            <div class="content">
              <div class="desc">已收到您的咨询，正在为您匹配律师。</div>
            </div>
            <div class="temp_box">
              <div class="nobox">
                <img
                  src="//pic2.lawtimeimg.com/images/ask/fabu/v5/lawtime_user1.png?v=1737085163"
                  alt=""
                  class="temp"
                />
              </div>
            </div>
          </div>
        </li>
        <li class="item hide" data-out="3000">
          <div class="question_view">
            <div class="content">
              <div class="desc w320">
                已有律师准备解答，点击下方“立即使用”按钮支付后可开始咨询。
                <div class="nlawyer_box">
                  <div class="swiper-container nlawyer_siwper"></div>
                </div>
              </div>
            </div>
            <div class="temp_box">
              <div class="nobox">
                <img
                  src="//pic2.lawtimeimg.com/images/ask/fabu/v5/lawtime_user1.png?v=1737085163"
                  alt=""
                  class="temp"
                />
              </div>
            </div>
          </div>
        </li>
        <li class="item hide" data-out="16000">
          <div class="question_view">
            <div class="content">
              <div class="desc">我已分析案情，使用服务立即开始咨询，未解答100%退款</div>
            </div>
            <div class="temp_box">
              <div class="nobox">
                <img src="//att1.lawtimeimg.com/photo/1731476622218_300wh300.jpg" alt="" class="temp defaultImg" />
              </div>
            </div>
          </div>
        </li>
        <li id="bot"></li>
      </ul>
    </div>
    <div class="c_input">
      <div class="ask-explain">
        <div class="ask-icon"></div>
        <div class="ask-txt">您的信息仅律师可见，请放心咨询</div>
      </div>
      <el-input
        v-model="textarea"
        maxlength="500"
        placeholder="请简单描述您的问题（500字以内）"
        show-word-limit
        size="large"
        :rows="4"
        type="textarea"
      />
      <div class="submit-b">
        <el-button type="primary" :disabled="disabled">发送</el-button>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.c_cont {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 560px;
  width: 860px;
  border-radius: 20px;
  background-color: #fff;
  position: relative;
  margin: 50px auto 0;
  .c_title {
    height: 50px;
    background-color: #fff;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    border-radius: 20px 20px 0 0;
    .small {
      font-size: 12px;
      display: inline-block;
      font-weight: 500;
      color: #fff;
      height: 20px;
      line-height: 20px;
      padding: 0 6px;
      background-color: #43cf7c;
      border-radius: 3px;
      vertical-align: middle;
      margin-left: 8px;
    }
  }
  .c_main {
    flex: 1;
    background-color: #f8f8f8;
    overflow-y: auto;
    .all_view {
      padding: 22px 0 20px;
      .hide {
        display: none !important;
      }
      .item {
        padding: 10px 40px;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }
      .show {
        display: block;
        -webkit-animation: 0.4s fadeIn;
        animation: 0.4s fadeIn;
      }
      .question_view {
        position: relative;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: reverse;
        flex-direction: row-reverse;
        .content {
          padding-right: 214px;
        }
      }
      .desc {
        position: relative;
        display: inline-block;
        padding: 10px 13px;
        min-height: 22px;
        background: #fff;
        border-radius: 8px;
        line-height: 25px;
        font-size: 14px;
        color: #111;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        &:after {
          content: "";
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          top: 16px;
          border-width: 6px;
          border-style: solid;
          border-color: transparent #fff transparent transparent;
        }
      }
      .content {
        -webkit-box-flex: 1;
        flex: 1;
        padding: 0 20px;
        position: relative;
        .desc {
          max-width: 487px;
          background: #fff;
          &:after {
            left: -12px;
          }
        }
      }
      .temp_box {
        width: 44px;
        height: 44px;
        position: relative;
        .nobox {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          overflow: hidden;
        }
        .temp {
          width: 100%;
        }
        &:after {
          content: "";
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #43cf7c;
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
  .c_input {
    position: relative;
    height: 145px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px 30px 17px;
  }
  .ask-explain {
    position: absolute;
    top: -48px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    background: rgba(253, 239, 231, 1);
    height: 28px;
    .ask-icon {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      background-image: url("../../assets/image/l_bh.png");
      background-repeat: no-repeat;
      background-size: 100% auto;
    }
    .ask-txt {
      padding: 0 12px;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 12px;
      color: #e61;
    }
  }
  .textarea {
    width: 790px;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: none;
    background: 0 0;
    resize: none;
    margin: 13px 0 5px;
    font-size: 14px;
    color: #333;
    line-height: 22px;
    height: 38px;
    outline: none;
  }
  .submit-b {
    text-align: right;
    font-size: 12px;
    color: #999;
    line-height: 17px;
    margin-top: 5px;
  }
}
</style>