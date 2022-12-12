import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // component: HomeView
    component: () => import('../views/HomePageView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  {
    path: '/homepage',
    name: 'homepage',
    component: () => import('../views/HomePageView.vue')
  },
  {
    path: '/personalPage',
    name: 'personalPage',
    component: () => import('../views/PersonalPage/PersonalPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/searchRes',
    name: 'searchRes',
    component: () => import('../views/search/SearchRes.vue')
  },
  // 文献详情模块
  {
    path: '/article',
    name: '/Article',
    component: () => import('../views/literature/Article'),
  },
  {
    path: '/commentDetail',
    name: 'CommentDetail',
    component: () => import('../views/community/CommentDetail.vue'),
  },
  {
    path: '/portal',
    name: 'Portal',
    component: () => import('../views/portal/Portal.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
