import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Customer from '@/components/Customer'
import Signup from '@/components/Signup'
import List from '@/components/List'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/list/*',
      name: 'List',
      component: List
    },
    {
      path: '/test2',
      name: 'Test',
      component: Test
    },
  ]
})
