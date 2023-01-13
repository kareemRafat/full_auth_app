import { defineStore } from "pinia";
import axios from "axios";
import csrfCookie from "@/composable/csrfCookie";
import { useStorage } from "@vueuse/core";

const useAuthStore = defineStore("auth", {
  state: () => ({
    AuthUser: "",
    errors: "",
  }),
    // useStorage("user", {
    //   AuthUser: "",
    //   errors: "",
    // }),
    

  getters: {
    user: (state) => state.AuthUser,
    error: (state) => state.errors,
  },

  actions: {
    async getUser() {
      const res = await axios.get("api/user");
      this.AuthUser = res.data;
    },

    async handleLogin(event, params) {
      const form = event.target;

      let formData = new FormData(form);

      try {
        await csrfCookie();
        const res = await axios.post("api/login", formData);

        // to set the auth user in pinia
        await this.getUser();

        /** if there is query param redirect from meta requiresAuth or not */
        const redirectPath = params || "/";
        this.router.push(redirectPath); // used [this] beacuse of markRaw(router) in main.js

        form.reset();

        this.errors = "";
      } catch (err) {
        this.errors = "wrong creds";
      }
    },

    async handleRegister(event) {
      const form = event.target;
      let formData = new FormData(form);

      try {
        await csrfCookie();
        await axios.post("api/register", formData);

        this.router.push("/"); // used [this] beacuse of markRaw(router) in main.js
      } catch (err) {
        this.errors = err.response.data.errors;
      }
    },

    async logout() {
      await csrfCookie(); // return the promise contain token
      const res = await axios.post("api/logout");
      this.router.push("/login"); // used [this] beacuse of markRaw(router) in main.js

      // reset the user to ""
      this.AuthUser = "";

      // remove localstorage item the placed when login using useStorage [required]
      // localStorage.removeItem('user');
    },
  },
  // when using pinia Plugin Persisted state 
  //https://prazdevs.github.io/pinia-plugin-persistedstate/guide/
  persist : true ,
}
   
);

export default useAuthStore;
