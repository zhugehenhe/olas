<script setup>
import "./loading.scss";
const { loading } = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="loader" v-if="loading"></div>
</template>
