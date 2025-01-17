<script setup>
import { getArticleList } from "../../api";
import { useRoute } from "vue-router";
const route = useRoute();

const page = ref({
  id: "",
  pageIndex: 1,
  pageSize: 10,
});

onMounted(() => {
  page.value.id = route.query.id;
  getArticleList(page.value).then((res) => {
    console.log(res);
  });
});
</script>

<template>
  <div></div>
</template>



<style>
</style>