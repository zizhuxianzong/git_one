/**
 * 登录注册模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const allloginApi = {    
    //登录    
    login (params) {        
        return axios.post(`${base.dev}/login`,qs.stringify(params));    
    },    
    //用户信息    
    user (id) {        
        return axios.get(`${base.dev}/user/${id}`);    
    },
    //注册     
    register (params) {        
        return axios.post(`${base.dev}/register`, qs.stringify(params));    
    },
    //上传    
    upload (params) {      
        return axios.post(`${base.dev}/upload`, params);    
    },
    //上传    
    update (id,params) {        
        return axios.post(`${base.dev}/update/${id}`, qs.stringify(params));    
    },
   
   
}

export default allloginApi;