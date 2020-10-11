import axios from 'axios'
import router from '../router'
import Vue from 'vue'
/* 
post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置，
即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
 */
 const http = axios.create({   
    timeout: 1000 * 3,

 })
 http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//送请求前可以进行一个请求的拦截，用来做一些验证,比如是否登录
http.interceptors.request.use(
    config => {
        if (localStorage.getItem('id') && localStorage.getItem('token')) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

http.interceptors.response.use(response =>{
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误  
      return response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
       }
      ,error =>{
    if (error.response.status === 401 || error.response.status === 402) {
        router.push('/login')
        Vue.prototype.$msg(error.response.data.message)
    }
    return Promise.reject(error);
      });
 export default http;