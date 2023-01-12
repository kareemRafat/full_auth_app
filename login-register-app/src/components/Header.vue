<template>
  <nav>
    <div class="logo">
      <router-link to="/" class="links">Home</router-link>
    </div>
    <div class="navigation">
      <ul>
        <template v-if="!authUser.AuthUser">
          <li>
            <router-link to="/login" class="links">Login</router-link>
          </li>
          <li>
            <router-link to="/register" class="links">register</router-link>
          </li>
        </template>
        <template v-else>
          <li>
            <a @click.prevent="authUser.logout" class="links">Logout</a>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import useAuthStore from "@/stores/AuthStore";

const authUser = useAuthStore();
// the logic of logout action moved to AuthStore of pinia actions
// call the store to use logout method in @click <a logout
</script>

<style>
nav {
  background: linear-gradient(to top right, #fc2c77 0%, #6c4079 100%);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  font-size: 20px;
  color: white;
}

ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

ul li {
  margin-right: 30px;
}

.links {
  color: white;
  text-decoration: none;
  cursor: pointer;
}
</style>
