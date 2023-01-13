
import { createRouter , createWebHistory } from "vue-router";
import useAuthStore from "@/stores/AuthStore";

import Home from '@/views/Home.vue';



const routes = [
  {
    path : '/',
    name : 'Home' ,
    component : Home,
    meta : {
      requiresAuth : true
    }
  } ,
  {
    path : '/login',
    name : 'Login' ,
    component : () => import('@/views/Login.vue'),
    meta : {
      guest : true
    }
  },
  {
    path : '/register',
    name : 'Register' ,
    component : () => import('@/views/Register.vue'),
    meta : {
      guest : true
    }
  },
  {
    path : '/products',
    name : 'Products' ,
    component : () => import('@/views/Products.vue'),
    meta : {
      requiresAuth : true
    }
  },
  {
    path : "/:catchAll(.*)" ,
    name : 'notFound' ,
    component : () => import('@/views/PageNotFound.vue'),
  }
] ;

const router = createRouter({
  history : createWebHistory(),
  routes
});



router.beforeEach((to, from) => {

    // this line must be inside this function not out
    // ✅ This will work because the router starts its navigation after
    // the router is installed and pinia will be installed too
    const authUser = useAuthStore();

  if (to.meta.requiresAuth && !authUser.user ) {
    
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/login',
      // save the location we were at to come back later
      // add it to query string
      query: { redirect: to.fullPath },
    }
  } else if (to.meta.guest && authUser.user) {
    return {
      path: '/',
      query: { redirect: to.fullPath },
    }
  }
})

export default router ;

