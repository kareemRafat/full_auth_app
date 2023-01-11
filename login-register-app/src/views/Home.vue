<script setup>
import { onMounted } from "vue";
import Header from "@/components/Header.vue";
import Home from "@/components/HomeBody.vue";
import axios from "axios";

import useAuthStore from "@/stores/AuthStore";
const authUser = useAuthStore();

onMounted(async () => {
  await authUser.getUser();
});

</script>

<template>
  <div>
    <Header></Header>
    <Suspense>
      <div>
        <Home :loggedUser="authUser.user"></Home>
      </div>
      <template #fallback>
        <div class="parent">
          <div class="lds-hourglass"></div>
          <span>fetching Data </span>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.parent {
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  flex-wrap: wrap;
  align-items: center;
  color: rgb(184, 29, 184);
  font-weight: bold;
}

.parent span {
  margin-top: 20px;
}
.lds-hourglass {
  /* position: relative; */
  width: 80px;
  height: 80px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid rgb(184, 29, 184);
  border-color: rgb(184, 29, 184) transparent rgb(184, 29, 184) transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
.header {
  margin-top: 30px;
  text-align: center;
}

ul {
  justify-content: center;
  margin: 30px;
}
</style>
