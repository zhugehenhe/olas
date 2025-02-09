<template>
  <div>
    <div class="Sub-head">
      <a>地区分布</a>
    </div>
    <div class="content">
      <div class="tabletop">
        <el-button type="info" @click="changeMap">切换</el-button>
      </div>
      <div id="chinamap" style="width: 100%; height: 640px"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAddress } from "../../api";
import * as echarts from "echarts";
import zhongguo from "./Json/ChinaMap.json";

const echartsData = ref([]);
const key = ref(0);
const testData = ref([]);
const scatterData = ref([]);
const Mapoption = ref({});
const barOption = ref({});
const mapshow = ref(true);

const get = async () => {
  const res = await getAddress();
  testData.value = res.data;
  console.log(testData.value);
  echartsData.value = testData.value.map(({ name, value }) => {
    return {
      name: getCityName(name),
      value,
    };
  });
  console.log(echartsData.value);
  initCharts();
};

const initCharts = () => {
  const myChart = echarts.init(document.getElementById("chinamap"));
  echarts.registerMap("china", zhongguo);
  echartsData.value.sort((a, b) => a.value - b.value);
  Mapoption.value = {
    backgroundColor: "rgba(255,255,255,0.3)",
    tooltip: {
      show: true,
      trigger: "item",
      alwaysShowContent: false,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: [0, 10, 8, 10],
      roam: true,
      hideDelay: 100,
      triggerOn: "mousemove",
      enterable: true,
      borderColor: "rgba(0, 0, 0, 0.7)",
      confine: true,
      textStyle: {
        color: "#fff",
        fontSize: "12",
        width: 20,
        height: 30,
        overflow: "break",
      },
      showDelay: 50,
      formatter: (params) => {
        return `<p style="text-align:center;line-height: 30px;height:30px;font-size: 14px;border-bottom: 1px solid #7A8698;">${params.name}</p>
              <div style="line-height:22px;margin-top:5px">人数<span style="margin-left:12px;color:#fff;float:right">${
                params.data?.value || "--"
              }人</span></div>`;
      },
    },
    graphic: {
      type: "text",
      left: "10%",
      top: "10%",
      style: {
        text: "用户分布",
        font: 'bolder 1.5rem "Microsoft YaHei", sans-serif',
        fill: "#fff",
      },
    },
    series: [
      {
        id: "ACGNMap",
        type: "map",
        roam: true,
        zoom: 1,
        geoIndex: 0,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
          emphasis: {
            textStyle: {
              color: "#640000",
            },
          },
        },
        animationDurationUpdate: 1000,
        universalTransition: true,
        data: echartsData.value,
      },
    ],
    geo: {
      map: "china",
      roam: true,
      zoom: 1,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        emphasis: {
          textStyle: {
            color: "#fff",
          },
        },
      },
      itemStyle: {
        normal: {
          borderColor: "rgba(147, 235, 248, 1)",
          borderWidth: 1,
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: "rgba(147, 235, 248, 0)",
              },
              {
                offset: 1,
                color: "rgba(147, 235, 248, .2)",
              },
            ],
            globalCoord: false,
          },
          shadowColor: "rgba(128, 217, 248, 1)",
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 10,
        },
        emphasis: {
          areaColor: "#389BB7",
          borderWidth: 0,
        },
      },
    },
    visualMap: {
      show: true,
      text: ["高", "低"],
      min: 0,
      max: Math.ceil(echartsData.value[echartsData.value.length - 1].value / 1000) * 1000,
      left: "10%",
      bottom: "10%",
      calculable: true,
      seriesIndex: [0],
      inRange: {
        color: ["#00467F", "#A5CC82"],
      },
      textStyle: {
        color: "#fff",
        map: "china",
      },
    },
  };
  barOption.value = {
    tooltip: {},
    backgroundColor: "rgba(255,255,255,0.6)",
    xAxis: {
      type: "value",
      nameTextStyle: {
        color: "white",
      },
      axisLabel: {
        color: "black",
      },
    },
    yAxis: {
      axisLabel: {
        rotate: 30,
        color: "black",
      },
      nameTextStyle: {
        color: "white",
      },
      data: echartsData.value.map((item) => item.name),
    },
    animationDurationUpdate: 1000,
    series: {
      type: "bar",
      id: "ACGNMap",
      data: echartsData.value.map((item) => item.value),
      universalTransition: true,
    },
  };
  myChart.setOption(Mapoption.value);
};

const changeMap = () => {
  const myChart = echarts.init(document.getElementById("chinamap"));
  mapshow.value = !mapshow.value;
  if (mapshow.value) {
    myChart.setOption(Mapoption.value, true);
  } else {
    myChart.setOption(barOption.value, true);
  }
};

const getCityName = (cityName) => {
  if (!cityName) return;
  cityName = cityName.split("/")[0];
  let isAutonomy = cityName.search("自治区") != -1;
  if (isAutonomy) {
    return cityName.search("内") != -1 ? cityName.substr(0, 3) : cityName.substr(0, 2);
  } else {
    return cityName.match(/(\S*)(省|市|特别行政区)/) ? cityName.match(/(\S*)(省|市|特别行政区)/)[1] : cityName;
  }
};

onMounted(() => {
  get();
});
</script>
<style scoped>
@import "./Css/Echar.css";
</style>