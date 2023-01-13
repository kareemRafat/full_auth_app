<template>
  <body>
    <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
      <div class="wrapper wrapper--w680">
        <div class="card card-4">
          <div class="card-body">
            <div
              v-if="authUser.error"
              style="margin-bottom: 30px;
                color: white;
                font-weigh: bold;
                background-color: tomato;
                padding: 10px;
              "
            >
              <p>{{ authUser.error }}</p>
            </div>
            <h2 class="title">Login Form</h2>
            <form @submit.prevent="authUser.handleLogin($event, this.$route.query.redirect)">
              <div class="col-6">
                <div class="input-group">
                  <label class="label">Email</label>
                  <input class="input--style-4" type="email" name="email" />
                </div>
              </div>
              <div class="col-6">
                <div class="input-group">
                  <label class="label">password</label>
                  <input
                    class="input--style-4"
                    type="password"
                    name="password"
                  />
                </div>
              </div>

              <div class="p-t-15">
                <button class="btn btn--radius-2 btn--blue" type="submit">
                  login
                </button>
              </div>
            </form>
            <p class="paragraph">
              <router-link class="paragraph" to="/register"
                >Register new User</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup>
import Header from "@/components/Header.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuthStore from "@/stores/AuthStore";

const authUser = useAuthStore();

// the logic of handle login moved to AuthStore of pinia
// call the store to use handleLogin method in @submit
</script>

<style scoped>
.paragraph {
  margin-top: 30px;
  color: cornflowerblue !important;
  font-weight: bold;
}
</style>
