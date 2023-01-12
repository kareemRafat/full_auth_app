<template>
  <div>
    <Header></Header>
  <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
    <div class="wrapper wrapper--w680">
      <div class="card card-4">
        <div class="card-body">
          <h2 class="title">Registration Form</h2>
          <form @submit.prevent="authUser.handleRegister($event)">
            <div class="">
              <div class="col-6">
                <div class="input-group">
                  <label class="label">Name</label>
                  <input class="input--style-4" type="text" name="name" />
                </div>
                <small
                  v-if="authUser.error.name"
                  style="color: red; margin-bottom: 10px; disblay: block"
                  >{{ authUser.error.name[0] }}</small
                >
              </div>
            </div>
            <div class="row row-space">
              <div class="col-2">
                <div class="input-group">
                  <label class="label">email</label>
                  <input class="input--style-4" type="text" name="email" />
                </div>
                <small
                  v-if="authUser.error.email"
                  style="color: red; margin-bottom: 10px; disblay: block"
                  >{{ authUser.error.email[0] }}</small
                >
              </div>
              <div class="col-2">
                <div class="input-group">
                  <label class="label">Gender</label>
                  <div class="p-t-10">
                    <label class="radio-container m-r-45"
                      >Male
                      <input type="radio" checked="checked" name="gender" />
                      <span class="checkmark"></span>
                    </label>
                    <label class="radio-container"
                      >Female
                      <input type="radio" name="gender" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row row-space">
              <div class="col-2">
                <div class="input-group">
                  <label class="label">Password</label>
                  <input
                    class="input--style-4"
                    type="password"
                    name="password"
                  />
                </div>
                <small
                  v-if="authUser.error.password"
                  style="color: red; margin-bottom: 10px; disblay: block"
                  >{{ authUser.error.password[0] }}</small
                >
              </div>
              <div class="col-2">
                <div class="input-group">
                  <label class="label">Password confirmation</label>
                  <input
                    class="input--style-4"
                    type="password"
                    name="password_confirmation"
                  />
                </div>
              </div>
            </div>

            <div class="p-t-15">
              <button class="btn btn--radius-2 btn--blue" type="submit">
                Register
              </button>
            </div>
          </form>
          <p class="paragraph">
            <router-link to="/login" class="paragraph"
              >Already A User</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import useAuthStore from "@/stores/AuthStore";
import Header from "@/components/Header.vue";

const authUser = useAuthStore();

// the logic of handle register moved to AuthStore of pinia
// call the store to use handleLogin method in @submit
// and to get the errors using the error getter 

</script>

<style scoped>
.paragraph {
  margin-top: 30px;
  color: cornflowerblue !important;
  font-weight: bold;
}
</style>
