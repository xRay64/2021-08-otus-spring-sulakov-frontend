import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Books.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/genres',
    name: 'Genres',
    component: () => import(/* webpackChunkName: "genres" */ '../components/Genres.vue')
  },
  {
    path: '/genre/edit',
    name: 'GenresEdit',
    component: () => import(/* webpackChunkName: "genreAddEdit" */ '../components/GenreAddEdit.vue')
  },
  {
    path: '/authors',
    name: 'Authors',
    component: () => import(/* webpackChunkName: "authors" */ '../components/Authors.vue')
  },
  {
    path: '/author/edit',
    name: 'AuthorEdit',
    component: () => import(/* webpackChunkName: "authorsEdit" */ '../components/AuthorAddEdit.vue')
  },
  {
    path: '/book/comments',
    name: 'BookComments',
    component: () => import(/* webpackChunkName: "bookComments" */ '../components/BookComments.vue')
  },
  {
    path: '/book/edit',
    name: 'BookEdit',
    component: () => import(/* webpackChunkName: "bookEdit" */ '../components/BookAddEdit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
