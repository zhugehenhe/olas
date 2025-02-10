<template>
  <div>
    <div class="Sub-head">
      <a>数据统计</a>
    </div>
    <div id="Echarbackground">
      <div class="Ecahrtop">
        <el-select v-model="days" @change="Get">
          <el-option :value="7" label="最近七天"></el-option>
          <el-option :value="30" label="最近一月"></el-option>
        </el-select>
        <el-select v-model="type" @change="inputData">
          <el-option value="line" label="折线图"></el-option>
          <el-option value="bar" label="柱状图"></el-option>
          <el-option value="scatter" label="散点图"></el-option>
        </el-select>
        <el-select v-model="datatype" @change="inputData">
          <el-option :value="1" label="所有数据"></el-option>
          <el-option :value="2" label="帖子"></el-option>
          <el-option :value="3" label="咨询"></el-option>
          <el-option :value="4" label="新用户"></el-option>
          <el-option :value="5" label="点击数"></el-option>
        </el-select>
      </div>
      <div v-if="ifmian" style="width: 95%; height: 700px" id="main"></div>
      <div v-if="ifAll" style="width: 95%; height: 700px" id="All"></div>
      <div v-if="ifSingle" style="width: 95%; height: 500px" id="singleShow"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DataTable from "./Json/DataTable.json";
import * as echarts from "echarts";
import { getData } from "../../api";

const ifmian = ref(false);
const ifAll = ref(false);
const ifSingle = ref(true);
const datatype = ref(1);
const data = ref("");
const days = ref("");
const postCountArr = ref([]);
const consultationCountArr = ref([]);
const hitCountArr = ref([]);
const newUserArr = ref([]);
const DateArr = ref([]);
const type = ref("line");
const EchartsData = ref({
  text: "",
  xdata: [],
  ydata: "",
  series: [],
});

const Get = async () => {
  const res = await getData(days.value);
  data.value = res.data;
  postCountArr.value = [];
  consultationCountArr.value = [];
  hitCountArr.value = [];
  DateArr.value = [];
  newUserArr.value = [];
  for (let i = 0; i < data.value.length; i++) {
    postCountArr.value[i] = data.value[i].postCount;
  }
  for (let i = 0; i < data.value.length; i++) {
    newUserArr.value[i] = data.value[i].newUser;
  }
  for (let i = 0; i < data.value.length; i++) {
    DateArr.value[i] = data.value[i].dateTime;
  }
  for (let i = 0; i < data.value.length; i++) {
    hitCountArr.value[i] = data.value[i].hitCount;
  }
  for (let i = 0; i < data.value.length; i++) {
    consultationCountArr.value[i] = data.value[i].consultationCount;
  }
  inputData();
};

const chart = () => {
  var myChart = echarts.init(document.getElementById("main"), "DataTable");
  // 绘制图表
  myChart.setOption({
    title: {
      text: "数据统计",
    },
    tooltip: {},
    dataset: {
      dimensions: ["dateTime", "postCount", "commentCount", "userCount", "newUser"],
      source: data.value,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {},
    series: [
      { type: type.value, barWidth: "10%" },
      { barWidth: "10%", type: type.value },
      { barWidth: "10%", type: type.value },
      { barWidth: "10%", type: type.value },
    ],
  });
};

const inputData = () => {
  if (datatype.value === 1) {
    ifSingle.value = false;
    ifAll.value = true;
    setTimeout(() => {
      AllShow();
    }, 20); /* 延时0.02S */
  } else {
    EchartsData.value.xdata = DateArr.value;
    switch (datatype.value) {
      case 2:
        EchartsData.value.series = postCountArr.value;
        EchartsData.value.text = "帖子";
        EchartsData.value.ydata = "帖子数/个";
        break;
      case 3:
        EchartsData.value.series = consultationCountArr.value;
        EchartsData.value.text = "咨询";
        EchartsData.value.ydata = "咨询数/个";
        break;
      case 4:
        EchartsData.value.series = newUserArr.value;
        EchartsData.value.text = "新用户";
        EchartsData.value.ydata = "人数/人";
        break;
      case 5:
        EchartsData.value.series = hitCountArr.value;
        EchartsData.value.text = "点击数";
        EchartsData.value.ydata = "点击数/次";
        break;
    }
    ifAll.value = false;
    setTimeout(() => {
      ifSingle.value = true;
    }, 20); /* 延时0.02S */
    setTimeout(() => {
      SingleShow(EchartsData.value);
    }, 20); /* 延时0.02S */
  }
};

const SingleShow = (data) => {
  var myChart = echarts.init(document.getElementById("singleShow"), "DataTable");
  // 绘制图表
  myChart.setOption({
    title: {
      text: data.text,
      left: "center",
      top: 0,
    },
    tooltip: {
      formatter: function (params) {
        var html = params.name + "<br/>";
        html += params.marker + params.value + "人" + "<br/>";
        return html;
      },
    },
    // 工具栏组件
    toolbox: {
      show: true,
      orient: "vertical",
      top: "center",
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        mark: { show: true },
        dataView: { readOnly: false },
        saveAsImage: {},
      },
    },
    xAxis: { name: "日期", nameGap: 15, data: data.xdata },
    yAxis: { name: EchartsData.value.ydata },
    series: [
      {
        data: data.series,
        type: type.value,
        barWidth: "30%",
        markPoint: {
          data: [
            { type: "max", name: "最大值" },
            { type: "min", name: "最小值" },
          ],
        },
        smooth: true,
      },
    ],
  });
};

const AllShow = () => {
  var myChart = echarts.init(document.getElementById("All"), "DataTable");
  // 绘制图表
  myChart.setOption({
    title: {
      text: "系统数据",
      left: "center",
      top: 0,
    },
    tooltip: {},
    // 工具栏组件
    toolbox: {
      show: true,
      orient: "vertical",
      top: "center",
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        mark: { show: true },
        dataView: { readOnly: false },
        saveAsImage: {},
      },
    },
    grid: [
      { left: "7%", top: "9%", width: "38%", height: "38%" },
      { right: "7%", top: "9%", width: "38%", height: "38%" },
      { left: "7%", bottom: "7%", width: "38%", height: "38%" },
      { right: "7%", bottom: "7%", width: "38%", height: "38%" },
    ],
    xAxis: [
      { gridIndex: 0, nameGap: 3, name: "日期", data: DateArr.value },
      { gridIndex: 1, nameGap: 3, name: "日期", data: DateArr.value },
      { gridIndex: 2, nameGap: 3, name: "日期", data: DateArr.value },
      { gridIndex: 3, nameGap: 3, name: "日期", data: DateArr.value },
    ],
    yAxis: [
      { gridIndex: 0, nameGap: 4, name: "新用户" },
      { gridIndex: 1, nameGap: 4, name: "咨询数" },
      { gridIndex: 2, nameGap: 4, name: "帖子数" },
      { gridIndex: 3, nameGap: 4, name: "点击数" },
    ],
    series: [
      {
        name: "新用户",
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: newUserArr.value,
        type: type.value,
        markPoint: {
          data: [
            { type: "max", name: "最大值" },
            { type: "min", name: "最小值" },
          ],
        },
        smooth: true,
      },
      {
        name: "咨询数",
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: consultationCountArr.value,
        type: type.value,
        markPoint: {
          data: [
            { type: "max", name: "最大值" },
            { type: "min", name: "最小值" },
          ],
        },
        smooth: true,
      },
      {
        name: "帖子数",
        xAxisIndex: 2,
        yAxisIndex: 2,
        data: postCountArr.value,
        type: type.value,
        markPoint: {
          data: [
            { type: "max", name: "最大值" },
            { type: "min", name: "最小值" },
          ],
        },
        smooth: true,
      },
      {
        name: "点击数",
        xAxisIndex: 3,
        yAxisIndex: 3,
        data: hitCountArr.value,
        type: type.value,
        markPoint: {
          data: [
            { type: "max", name: "最大值" },
            { type: "min", name: "最小值" },
          ],
        },
        smooth: true,
      },
    ],
  });
};

onMounted(() => {
  echarts.registerTheme("DataTable", DataTable);
  days.value = 7;
  Get();
});
</script>

<style lang="scss" scoped>
@import "./Css/Echar.css";
.el-select {
  height: 30px;
}
</style>