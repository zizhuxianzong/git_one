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
    //更新    
    update (id,params) {        
        return axios.post(`${base.dev}/update/${id}`, qs.stringify(params));    
    },
    //栏目信息
    category () {        
        return axios.get(`${base.dev}/category`);    
    },
     //栏目信息
     detail (id,params) {        
        return axios.get(`${base.dev}/detail/${id}`,params);    
    },
    //每个视屏的详细信息    
    article (id) {        
        return axios.get(`${base.dev}/article/${id}`);    
    },
    //获取推荐文章 
    commend () {        
        return axios.get(`${base.dev}/commend`);    
    },
    //点击收藏 collection
    collection (id,params) {        
        return axios.post(`${base.dev}/collection/${id}`, qs.stringify(params));    
    },
    //查询收藏 
    collectionCheck (id,params) {        
        return axios.get(`${base.dev}/collection/${id}`, params);    
    },
    //关注当前用户 
    sub_scription (id,params) {        
        return axios.post(`${base.dev}/sub_scription/${id}`, qs.stringify(params));    
    },
    //查询是否关注
    sub_scriptionCheck (id,params) {        
        return axios.get(`${base.dev}/sub_scription/${id}`, qs.stringify(params));    
    },
    //发表评论
    comment_post (id,params) {        
        return axios.post(`${base.dev}/comment_post/${id}`, qs.stringify(params));    
    },
    //回复评论
    comment (id) {        
        return axios.get(`${base.dev}/comment/${id}`);    
    },
}

export default allloginApi;