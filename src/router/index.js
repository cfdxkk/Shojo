import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/hotGroup/add',
    name: 'addHotGroup',
    component: () => import('@/components/hotGroup/AddHotGroup')
  },{
    path: '/hotGroup/remove',
    name: 'removeHotGroup',
    component: () => import('@/components/hotGroup/RemoveHotGroup')
  },{
    path: '/ogtUser/edit',
    name: 'removeUser',
    component: () => import('@/components/ogtUser/RemoveUser')
  },{
    path: '/ogtUser/info',
    name: 'editUser',
    component: () => import('@/components/ogtUser/EditUser')
  },{
    path: '/ogtGroup/edit',
    name: 'editGroup',
    component: () => import('@/components/ogtGroup/GroupInfo')
  },{
    path: '/ogtGroup/event',
    name: 'editGroupEvent',
    component: () => import('@/components/ogtGroup/GroupEvent')
  },{
    path: '/other/testImageUpload',
    name: 'testImageUpload',
    component: () => import('@/components/other/testImageUpload')
  },{
    path: '/other/testImageUpload2',
    name: 'testImageUpload2',
    component: () => import('@/components/other/testImageUpload2')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
