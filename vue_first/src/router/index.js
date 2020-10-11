import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '@/views/register.vue'
import Login from '@/views/login.vue' 
import userInfo from '@/views/userInfo.vue'
import edit from '@/views/edit.vue'
import Home from '@/views/Home.vue'
import acticleEvery from '@/components/common/acticleEvery.vue'
import tabitemEdit from '@/components/common/tabitemEdit.vue'
Vue.use(VueRouter)
const routes =[
    {
        path:'/',
        component:Home,
        meta:{
            keepAlive:true
        }
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/register',
        component:register
    },
    {
        path:'/userInfo',
        component:userInfo,
        meta:{
            isToken:true
        }
    },
    {
        path:'/edit',
        component:edit,
        meta:{
            isToken:true
        }
    },
    {
        path:'/acticleEvery/:id',
        component:acticleEvery
    },
    {
        path:'/tabitemEdit',
        component:tabitemEdit
    }
]
const router = new VueRouter({
    mode:'history',
    routes
})
router.beforeEach((to, from, next) => { 
   if(!localStorage.getItem('id') && !localStorage.getItem('token') && to.meta.isToken==true){
       router.push('/login') 
       Vue.prototype.$msg("请重新登录")
       return;    
   }
   next()
  })
export default router