import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import axios from "axios";
import { createPinia } from "pinia";
import { markRaw } from "vue";
import PersistPiniaState from "@/composable/PersistPiniaState";

// assets
import "@/assets/css/main.css";

// very important part
/**
 * withCredentials -> to send the cookie with request headers
 * baseURL -> to make the base url for every request
 * headers.common['headername'] = headervalue  -> to default a header
 *
 */
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.common["Accept"] = "application/json";

const pinia = createPinia();
/**
 * insert router library into pinia store
 * When adding external properties, class instances that come from other libraries, or simply things that are not reactive, you should wrap the object with markRaw()
 * its name must be store
 */
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

// localstorage first way -- manual way in composable folder
// PersistPiniaState(pinia);
// second way import { useStorage } from "@vueuse/core" in pinia store file

createApp(App).use(router).use(pinia).mount("#app");
