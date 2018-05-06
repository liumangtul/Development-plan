import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import User from '@/components/user'
import Article from '@/components/article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path:'/user',
      name:'User',
      component:User
    },{
      path:'/article',
      name:'Article',
      component:Article
    }
  ]
})
