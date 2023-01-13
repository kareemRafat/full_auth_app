<template>
  <div>
    <Header></Header>
    <img src="prod.jpg" alt="" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "@/components/Header.vue";
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
}
img {
  width: 100%;
}
</style>
