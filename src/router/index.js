import Vue from 'vue'
import Router from 'vue-router'
import editor from '@/components/editor'
import show from '@/components/show'
import mind from '@/components/mind'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/editor/:id',
      name: 'editor',
      component: editor
    },
    {
      path: '/',
      name: 'show',
      component: show
    },
    {
      path: '/mind/:id',
      name: 'mind',
      component: mind
    },
  ]
})
