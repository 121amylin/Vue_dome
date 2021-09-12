import Vue from 'vue'
import VueRouter from 'vue-router'
import list from '../views/list.vue'
import show from '../views/show.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: list
  },
  {
    path: '/show/:id',
    name: 'show',
    component: show
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
