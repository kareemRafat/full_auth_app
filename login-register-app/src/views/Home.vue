
<script setup>
import { onMounted } from "vue";
import Header from "@/components/Header.vue";
import  useAuthStore  from '@/stores/AuthStore';

import axios from "axios";

const authUser = useAuthStore();

onMounted(async () => {
  // get the logged user data 
  await authUser.getUser();
  console.log(authUser.user.name);
});
</script>


<template>
  <div>
    <Header></Header>
    <h1 class="header">Home - main page</h1>
    <h2 class="header">welcome Home {{ authUser.user.name }}</h2>
    <ul class="">
      <li>{{ authUser.user.id }}</li>
      <li>{{ authUser.user.name }}</li>
      <li>{{ authUser.user.email }}</li>
    </ul>
  </div>
</template>


<style scoped>
.header {
  margin-top: 30px;
  text-align: center;
}

ul {
  justify-content: center;
  margin:30px;
  
}
</style>
