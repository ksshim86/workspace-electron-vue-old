import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: require('@/components/dashboard/Dashboard').default
    },
    {
      path: '/tutorial',
      name: 'dashboard',
      component: require('@/components/tutorial/TutorialPage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
