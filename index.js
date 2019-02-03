import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login.vue'
import index from '../components/index.vue'
import user from '../components/user/user.vue'
import rules from '../components/rules/rules.vue'
import charactors from '../components/rules/charactors.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: {
        path: '/login'
      }
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'index',
      path: '/index',
      component: index,
      children: [{
          path: '/user',
          component: user
        },
        {
          path: '/rules',
          component: rules
        },
        {
          path: '/charactors',
          component: charactors
        }
      ]
    },
  ]
})
