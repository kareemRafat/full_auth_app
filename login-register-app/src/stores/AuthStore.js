import { defineStore } from "pinia";
import axios from "axios";
import csrfCookie from "@/composable/csrfCookie";

const useAuthStore = defineStore("auth", {
  state: () => ({
    AuthUser: "",
    errors: "",
  }),

  getters: {
    user: (state) => state.AuthUser,
    error: (state) => state.errors,
  },

  actions: {
    async getUser() {
      const res = await axios.get("api/user");
      this.AuthUser = res.data;
    },

    async handleLogin(event) {
      const form = event.target;

      let formData = new FormData(form);

      try {
        await csrfCookie();
        const res = await axios.post("api/login", formData);
        localStorage.setItem("Auth", true);
        this.router.push("/"); // used [this] beacuse of markRaw(router) in main.js
        
        
        
        form.reset();
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
    },
  },
});

export default useAuthStore;
