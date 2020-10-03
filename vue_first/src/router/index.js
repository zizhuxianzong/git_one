import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '@/views/register.vue'
import Login from '@/views/login.vue' 
import userInfo from '@/views/userInfo.vue'
Vue.use(VueRouter)
const routes =[
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
    }
]
const router = new VueRouter({
    mode:'history',
    routes
})
router.beforeEach((to, from, next) => { 
    console.log(to);    
   if(!localStorage.getItem('id') && !localStorage.getItem('token') && to.meta.isToken==true){
       router.push('/login') 
       Vue.prototype.$msg("请重新登录")
       return;    
   }
   next()
  })
export default router