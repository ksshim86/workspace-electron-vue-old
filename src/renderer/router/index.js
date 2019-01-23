import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tutorial-page',
      component: require('@/components/tutorial/TutorialPage').default
    },
    {
      path: '/workspace',
      name: 'workspace-page',
      component: require('@/components/workspace/WorkspacePage').default
    },
    {
      path: '/WTreeView',
      name: 'WTreeView',
      component: require('@/components/cmmn/WTreeView').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
