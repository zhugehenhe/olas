<script setup>
</script>

<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
ol,
ul {
  padding: 0;
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
.white_box {
  border-radius: 6px;
  background: #fff;
}
.nowrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
