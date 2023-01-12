<template>
  <div>
    <h1 class="header">Home - main page</h1>
    <h2 class="header">welcome Home {{ props.loggedUser.name }}</h2>
    <ul>
      <li>{{ props.loggedUser.id }}</li>
      <li>{{ props.loggedUser.name }}</li>
      <li>{{ props.loggedUser.email }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

// this components are made to use async <suspense></suspense>

// if the await is the first thing in the script setup you need suspense
await new Promise((r) => setTimeout(r, 2000)); // to make the page wait 2 s

const props = defineProps(["loggedUser"]);

console.log(props.loggedUser);
</script>

<style scoped>
.header {
  margin-top: 30px;
  text-align: center;
}

ul {
  justify-content: center;
  margin: 30px;
}
</style>
